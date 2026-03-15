import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const seller = await prisma.user.upsert({
    where: { email: 'seller@demo.com' },
    update: {},
    create: {
      email: 'seller@demo.com',
      name: 'Demo Seller',
      passwordHash: await bcrypt.hash('demo123', 10)
    }
  })

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@demo.com' },
    update: {},
    create: {
      email: 'buyer@demo.com',
      name: 'Demo Buyer',
      passwordHash: await bcrypt.hash('demo123', 10)
    }
  })

  // Create 10 demo items
  const items = [
    { title: 'Air Jordan 1 Chicago', category: 'Baskets', price: 450, description: 'Iconic 1985 colorway, deadstock condition', photoUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500' },
    { title: 'Pokémon Charizard Holo 1st Ed', category: 'Trading Cards', price: 800, description: 'Base set, PSA 8 graded, mint condition', photoUrl: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=500' },
    { title: 'Rolex Submariner 1680', category: 'Watches', price: 12000, description: 'Vintage 1970s, red text, original papers', photoUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500' },
    { title: 'Supreme Box Logo Hoodie', category: 'Vintage', price: 650, description: '2016 Bogo, size L, never worn', photoUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
    { title: 'Batman #1 CGC 6.5', category: 'Comics', price: 15000, description: '1940 first appearance, certified authentic', photoUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=500' },
    { title: 'Nike Dunk Low Panda', category: 'Baskets', price: 180, description: 'Black/white colorway, DS with box', photoUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500' },
    { title: 'Magic: The Gathering Black Lotus', category: 'Trading Cards', price: 25000, description: 'Alpha edition, lightly played', photoUrl: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=500' },
    { title: 'Omega Speedmaster Professional', category: 'Watches', price: 5500, description: 'Moonwatch, 2020 model, full kit', photoUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500' },
    { title: 'Vintage Levis 501 Selvedge', category: 'Vintage', price: 320, description: '1960s big E, waist 32, incredible fade', photoUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500' },
    { title: 'Banksy Print "Girl with Balloon"', category: 'Art', price: 8000, description: 'Signed & numbered, 2006, framed', photoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500' },
  ]

  for (const item of items) {
    await prisma.item.create({
      data: {
        ...item,
        userId: seller.id
      }
    })
  }

  console.log('✅ Seeded 2 users and 10 items')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
