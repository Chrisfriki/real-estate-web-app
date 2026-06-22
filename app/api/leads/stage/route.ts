import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { leadActivities, leads } from '@/lib/db/schema'

const VALID_STAGES = ['pending', 'in_follow_up', 'captured', 'lost'] as const
const STAGE_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  in_follow_up: 'En seguimiento',
  captured: 'Captado',
  lost: 'Perdido',
}

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, stage, note } = await request.json()

    if (!VALID_STAGES.includes(stage)) {
      return NextResponse.json({ error: 'Fase inválida' }, { status: 400 })
    }

    const [lead] = await db.select().from(leads).where(eq(leads.id, id))
    if (!lead) {
      return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })
    }

    if (lead.pipelineStatus === stage) {
      return NextResponse.json({ ok: true })
    }

    await db.update(leads).set({ pipelineStatus: stage }).where(eq(leads.id, id))

    const activityType = stage === 'captured' ? 'captured' : stage === 'lost' ? 'lost' : 'status_change'
    const baseNote = `Lead marcado como ${STAGE_LABEL[stage]}`
    await db.insert(leadActivities).values({
      leadId: id,
      type: activityType,
      notes: note ? `${baseNote}. ${note}` : baseNote,
      metadata: { from: lead.pipelineStatus, to: stage },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] Lead stage update error:', error)
    return NextResponse.json({ error: 'Error al actualizar la fase' }, { status: 500 })
  }
}
