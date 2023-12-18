import { useAuth0 } from '@auth0/auth0-react'
import { render, waitFor } from '@testing-library/react'

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
    },
    {
      id: 2,
      title: 'Review 2',
      score: 4,
      image: {
        url: 'https://example.com/review2_thumb.jpg',
      },
    },
  ]

  test('fetches posted reviews data.', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockResolvedValue('dummyToken'),
      isLoading: jest.fn(),
    })
    await jest.spyOn(api, 'get').mockResolvedValue({ data: postedReviews })

    await waitFor(() => {
      render(<MyReviews />)
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/my_reviews/index', expect.any(Object))
    })
  })
})
