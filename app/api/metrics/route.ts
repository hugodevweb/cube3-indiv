import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const itemCount = await prisma.item.count()
    const userCount = await prisma.user.count()

    return NextResponse.json({
      items: itemCount,
      users: userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}
