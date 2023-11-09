import { render, screen } from '@testing-library/react'
import axios from 'axios'

import IndexShops from '.'

describe('Shops page', () => {
  test("should render all shops with the shop's name and access", async () => {
    const mockShopsData = [
      { id: 1, name: 'Shop 1', access: 'Access 1' },
      { id: 2, name: 'Shop 2', access: 'Access 2' },
      { id: 2, name: 'Shop 3', access: 'Access 3' },
    ]

    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockShopsData })

    render(<IndexShops shops={mockShopsData} />)

    expect(await screen.findByText('Shop 1')).toBeInTheDocument()
    expect(await screen.findByText('Shop 2')).toBeInTheDocument()
    expect(await screen.findByText('Shop 3')).toBeInTheDocument()
    expect(await screen.findByText('Access 1')).toBeInTheDocument()
    expect(await screen.findByText('Access 2')).toBeInTheDocument()
    expect(await screen.findByText('Access 3')).toBeInTheDocument()
  })
})
