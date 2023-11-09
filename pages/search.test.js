import { render, screen } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import SearchResults from './search'

jest.mock('next/router')

describe('Search result page', () => {
  test("should render search results with the shop's name and access", async () => {
    const mockSearchResults = [
      { id: 1, name: 'Shop 1', access: 'Access 1' },
      { id: 2, name: 'Shop 2', access: 'Access 2' },
    ]

    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockSearchResults })

    useRouter.mockReturnValue({
      query: { keyword: 'Shop' },
    })

    render(<SearchResults />)

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/shops/search?search=Shop',
    )

    expect(await screen.findByText('Shop 1')).toBeInTheDocument()
    expect(await screen.findByText('Shop 2')).toBeInTheDocument()
    expect(await screen.findByText('Access 1')).toBeInTheDocument()
    expect(await screen.findByText('Access 2')).toBeInTheDocument()
  })

  test('should not render search results when no matching shops are found', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: [] })

    useRouter.mockReturnValue({
      query: { keyword: 'Shop' },
    })

    render(<SearchResults />)

    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/shops/search?search=Shop',
    )

    expect(await screen.queryByText('Shop 1')).not.toBeInTheDocument()
    expect(await screen.queryByText('Access 1')).not.toBeInTheDocument()
  })
})
