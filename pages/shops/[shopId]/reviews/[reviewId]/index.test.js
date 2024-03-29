import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import React from 'react'

// import api from '../../../../../components/api'

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
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    })
    useRouter.mockReturnValue({
      query: {
        shopId: 1,
        reviewId: 1,
      },
    })
    component = render(<ReviewPage review={reviewData} />, {
      initialState: { loading: false },
    })
  })

  afterEach(() => {
    component.unmount()
  })

  test('renders loading until the data is loaded', async () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
  //   test('should render the review details, the like, edit and delete buttons', async () => {
  //     useAuth0.mockReturnValue({
  //       isAuthenticated: true,
  //       getAccessTokenSilently: jest.fn(),
  //       getAccessTokenWithPopup: jest.fn(),
  //       user: { sub: '1234' },
  //     })

  //     const loading = jest.fn()
  //     await jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, loading])
  //     await component.rerender(<ReviewPage review={reviewData} />)

  //     await waitFor(() => {
  //       expect(screen.getByText('Review 1')).toBeInTheDocument()
  //       expect(screen.getByText('Test caption')).toBeInTheDocument()
  //       expect(screen.getByText('5 / 5')).toBeInTheDocument()
  //       expect(screen.getByAltText('reviewImage')).toBeInTheDocument()

  //       expect(screen.getByTestId('likeButton')).toBeInTheDocument()
  //       expect(screen.getByText('編集')).toBeInTheDocument()
  //       expect(screen.getByText('削除')).toBeInTheDocument()
  //     })
  //   })

  //   test('should not render the edit and delete buttons when the current user is not who created the review', async () => {
  //     useAuth0.mockReturnValue({
  //       isAuthenticated: true,
  //       getAccessTokenSilently: jest.fn(),
  //       getAccessTokenWithPopup: jest.fn(),
  //       user: { sub: '5678' },
  //     })

  //     const loading = jest.fn()
  //     await jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, loading])
  //     await component.rerender(<ReviewPage review={reviewData} />)

  //     await waitFor(() => {
  //       expect(screen.queryByText('編集')).not.toBeInTheDocument()
  //       expect(screen.queryByText('削除')).not.toBeInTheDocument()
  //     })
  //   })

  //   test('verifies whether the current user has already liked and handles to create and delete likes', async () => {
  //     jest.spyOn(api, 'get').mockResolvedValue({
  //       data: [
  //         { id: 1, sub: '1234' },
  //         { id: 2, sub: '5678' },
  //       ],
  //     })

  //     const loading = jest.fn()
  //     await jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, loading])
  //     await component.rerender(<ReviewPage review={reviewData} />)

  //     jest.spyOn(api, 'delete').mockResolvedValue({
  //       data: { 0: { sub: '90', shopId: 1, reviewId: 1 }, 1: { number_of_likes: 2 } },
  //     })

  //     jest.spyOn(api, 'post').mockResolvedValue({
  //       data: { 0: { sub: '90', shopId: 1, reviewId: 1 }, 1: { number_of_likes: 3 } },
  //     })

  //     useAuth0.mockReturnValue({
  //       isAuthenticated: true,
  //       getAccessTokenSilently: jest.fn(),
  //       getAccessTokenWithPopup: jest.fn(),
  //       user: { sub: '90' },
  //     })

  //     await waitFor(() => {
  //       expect(api.get).toHaveBeenCalled()
  //     })

  //     // 未いいね時は中抜きのハートマークアイコン
  //     const favoriteBorder = screen.getByTestId('FavoriteBorderIcon')
  //     expect(favoriteBorder).toBeInTheDocument()

  //     // いいねボタンクリック
  //     const likeButton = screen.getByTestId('likeButton')
  //     await userEvent.click(likeButton)

  //     // いいね作成
  //     expect(await api.post).toHaveBeenCalled()
  //     expect(likeButton.textContent).toContain('3')

  //     // 作成したいいねをデータに追加
  //     await jest.spyOn(api, 'get').mockResolvedValue({
  //       data: [
  //         { id: 1, sub: '1234' },
  //         { id: 2, sub: '5678' },
  //         { id: 3, sub: '90' },
  //       ],
  //     })

  //     // いいねされたのでハートマークアイコンに変化
  //     const favorite = screen.getByTestId('FavoriteIcon')
  //     expect(favorite).toBeInTheDocument()

  //     // 再度クリック
  //     await userEvent.click(likeButton)

  //     // いいね済なのでdeleteアクション発火
  //     expect(await api.delete).toHaveBeenCalled()
  //     expect(likeButton.textContent).toContain('2')
  //   })
})
