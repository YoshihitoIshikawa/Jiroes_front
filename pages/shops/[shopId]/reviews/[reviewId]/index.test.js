import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import ReviewPage from '.'

jest.mock('next/router')
jest.mock('@auth0/auth0-react')

describe('Review Page', () => {
  let component

  const reviewData = {
    id: 1,
    title: 'Review 1',
    caption: 'Test caption',
    score: 5,
    image: {
      url: 'https://example.com/review1.jpg',
    },
    sub: '1234',
  }

  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {
        shopId: 1,
        reviewId: 1,
      },
    })
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render the review details, the edit and delete buttons', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn(),
      getAccessTokenWithPopup: jest.fn(),
      user: { sub: '1234' },
    })

    component = render(<ReviewPage review={reviewData} />)

    expect(screen.getByText('Review 1')).toBeInTheDocument()
    expect(screen.getByText('Test caption')).toBeInTheDocument()
    expect(screen.getByText('5 / 5')).toBeInTheDocument()
    expect(screen.getByAltText('reviewImage')).toBeInTheDocument()

    expect(screen.getByText('編集')).toBeInTheDocument()
    expect(screen.getByText('削除')).toBeInTheDocument()
  })

  test('should not render the edit and delete buttons when the current user is not who created the review', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn(),
      getAccessTokenWithPopup: jest.fn(),
      user: { sub: '5678' },
    })

    component = render(<ReviewPage review={reviewData} />)

    expect(screen.queryByText('編集')).not.toBeInTheDocument()
    expect(screen.queryByText('削除')).not.toBeInTheDocument()
  })
})
