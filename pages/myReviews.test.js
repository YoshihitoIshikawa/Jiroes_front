import { useAuth0 } from '@auth0/auth0-react'
import { screen, render, waitFor } from '@testing-library/react'

import MyReviews from './myReviews'
import api from '../components/api'

jest.mock('@auth0/auth0-react')

describe('MyReviews Component', () => {
  const postedReviews = [
    {
      id: 1,
      title: 'Review 1',
      score: 5,
      image: {
        url: 'https://example.com/review1_thumb.jpg',
      },
      shop: {
        name: 'Shop 1',
      },
    },
    {
      id: 2,
      title: 'Review 2',
      score: 4,
      image: {
        url: 'https://example.com/review2_thumb.jpg',
      },
      shop: {
        name: 'Shop 2',
      },
    },
  ]

  test('calls backend API to fetch data and renders that data.', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockResolvedValue('dummyToken'),
      isLoading: false,
    })
    await jest.spyOn(api, 'get').mockResolvedValue({ data: postedReviews })

    await waitFor(() => {
      render(<MyReviews />)
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/my_reviews/index', expect.any(Object))
    })

    await waitFor(() => {
      postedReviews.forEach((review) => {
        expect(screen.getByText(review.title)).toBeInTheDocument()
      })
    })
  })
})
