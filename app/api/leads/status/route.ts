import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { leadActivities, leads } from '@/lib/db/schema'

const VALID_STATUSES = ['cold', 'warm', 'hot'] as const
const STATUS_LABEL: Record<string, string> = { cold: 'Frío', warm: 'Templado', hot: 'Caliente' }

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, status } = await request.json()

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
    }

    const [lead] = await db.select().from(leads).where(eq(leads.id, id))
    if (!lead) {
      return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })
    }

    if (lead.status === status) {
      return NextResponse.json({ ok: true })
    }

    const now = new Date()
    await db.update(leads).set({ status, statusUpdatedAt: now }).where(eq(leads.id, id))

    await db.insert(leadActivities).values({
      leadId: id,
      type: 'status_change',
      notes: `Lead cambiado de ${STATUS_LABEL[lead.status] ?? lead.status} a ${STATUS_LABEL[status]}`,
      metadata: { from: lead.status, to: status },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] Lead status update error:', error)
    return NextResponse.json({ error: 'Error al actualizar el estado' }, { status: 500 })
  }
}
