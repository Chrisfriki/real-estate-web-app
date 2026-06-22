import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { leadActivities, leadFollowUps, leads } from '@/lib/db/schema'

const VALID_TYPES = ['call', 'whatsapp', 'email', 'visit'] as const
const TYPE_LABEL: Record<string, string> = {
  call: 'Llamada',
  whatsapp: 'WhatsApp',
  email: 'Email',
  visit: 'Visita',
}

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ? session : null
}

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await db
      .select({
        id: leadFollowUps.id,
        leadId: leadFollowUps.leadId,
        scheduledAt: leadFollowUps.scheduledAt,
        type: leadFollowUps.type,
        status: leadFollowUps.status,
        note: leadFollowUps.note,
        completedAt: leadFollowUps.completedAt,
        resultNote: leadFollowUps.resultNote,
        createdAt: leadFollowUps.createdAt,
        leadNombre: leads.nombre,
        leadTelefono: leads.telefono,
        leadMunicipio: leads.municipio,
        leadProvincia: leads.provincia,
      })
      .from(leadFollowUps)
      .innerJoin(leads, eq(leadFollowUps.leadId, leads.id))
      .orderBy(leadFollowUps.scheduledAt)

    return NextResponse.json({ followUps: rows })
  } catch (error) {
    console.error('[v0] Follow-ups list error:', error)
    return NextResponse.json({ error: 'Error fetching follow-ups' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { leadId, scheduledAt, type, note } = await request.json()

    if (!leadId || !scheduledAt || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const [created] = await db
      .insert(leadFollowUps)
      .values({ leadId, scheduledAt: new Date(scheduledAt), type, note: note || null })
      .returning()

    // Primer seguimiento de un lead que seguía "pendiente" → pasa a "en seguimiento" automáticamente.
    const [lead] = await db.select().from(leads).where(eq(leads.id, leadId))
    if (lead?.pipelineStatus === 'pending') {
      await db.update(leads).set({ pipelineStatus: 'in_follow_up' }).where(eq(leads.id, leadId))
    }

    await db.insert(leadActivities).values({
      leadId,
      type: 'follow_up_scheduled',
      notes: `Seguimiento programado: ${TYPE_LABEL[type]} el ${new Date(scheduledAt).toLocaleString('es-ES')}`,
      nextNotes: note || null,
      metadata: { followUpId: created.id, scheduledAt, type },
    })

    return NextResponse.json({ ok: true, followUp: created })
  } catch (error) {
    console.error('[v0] Follow-up create error:', error)
    return NextResponse.json({ error: 'Error al programar el seguimiento' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, resultNote } = await request.json()

    const [followUp] = await db.select().from(leadFollowUps).where(eq(leadFollowUps.id, id))
    if (!followUp) {
      return NextResponse.json({ error: 'Seguimiento no encontrado' }, { status: 404 })
    }

    const now = new Date()
    await db
      .update(leadFollowUps)
      .set({ status: 'completed', completedAt: now, resultNote: resultNote || null })
      .where(eq(leadFollowUps.id, id))

    await db.insert(leadActivities).values({
      leadId: followUp.leadId,
      type: 'follow_up_completed',
      notes: resultNote || 'Seguimiento marcado como completado.',
      metadata: { followUpId: id },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] Follow-up complete error:', error)
    return NextResponse.json({ error: 'Error al completar el seguimiento' }, { status: 500 })
  }
}
