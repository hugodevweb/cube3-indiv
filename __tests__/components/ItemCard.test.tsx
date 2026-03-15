import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ItemCard from '@/components/ItemCard'

describe('ItemCard Component', () => {
  const mockItem = {
    id: 1,
    title: 'Air Jordan 1 Chicago',
    description: 'Classic sneaker in excellent condition',
    price: 450,
    category: 'Baskets',
    photoUrl: 'https://example.com/jordan.jpg',
    status: 'En attente de contrôle',
    createdAt: new Date().toISOString(),
  }

  it('renders item title', () => {
    render(<ItemCard item={mockItem} />)
    expect(screen.getByText('Air Jordan 1 Chicago')).toBeInTheDocument()
  })

  it('displays formatted price', () => {
    render(<ItemCard item={mockItem} />)
    // Price should be formatted as currency
    const priceElement = screen.getByText(/450/)
    expect(priceElement).toBeInTheDocument()
  })

  it('shows category badge', () => {
    render(<ItemCard item={mockItem} />)
    expect(screen.getByText('Baskets')).toBeInTheDocument()
  })

  it('displays status tag', () => {
    render(<ItemCard item={mockItem} />)
    expect(screen.getByText('En attente de contrôle')).toBeInTheDocument()
  })

  it('has favorite button', () => {
    render(<ItemCard item={mockItem} />)
    const favoriteButton = screen.getByRole('button', { name: /favorite/i })
    expect(favoriteButton).toBeInTheDocument()
  })
})
