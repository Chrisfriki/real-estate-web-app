import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  // Require authenticated session
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))

    return NextResponse.json({ leads: rows })
  } catch (error) {
    console.error('[v0] Leads list error:', error)
    return NextResponse.json({ error: 'Error fetching leads' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const { eq } = await import('drizzle-orm')
    await db.delete(leads).where(eq(leads.id, id))
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] Lead delete error:', error)
    return NextResponse.json({ error: 'Error deleting lead' }, { status: 500 })
  }
}
