import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

const ItemSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().max(100),
  photo_url: z.string().url(),
})

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = ItemSchema.parse(body)

    const item = await prisma.item.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        price: validatedData.price,
        category: validatedData.category,
        photoUrl: validatedData.photo_url,
        userId: parseInt(session.user.id),
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}
