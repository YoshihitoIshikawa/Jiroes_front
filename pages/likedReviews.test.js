import { useAuth0 } from '@auth0/auth0-react'
import { screen, render, waitFor } from '@testing-library/react'

import LikedReviews from './likedReviews'
import api from '../components/api'

jest.mock('@auth0/auth0-react')

describe('LikedReviews Component', () => {
  const likedReviews = [
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
    await jest.spyOn(api, 'get').mockResolvedValue({ data: likedReviews })

    await waitFor(() => {
      render(<LikedReviews />)
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/liked_reviews/index', expect.any(Object))
    })

    await waitFor(() => {
      likedReviews.forEach((review) => {
        expect(screen.getByText(review.title)).toBeInTheDocument()
      })
    })
  })
})
