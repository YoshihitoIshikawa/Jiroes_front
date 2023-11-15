import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import EditReview from './edit'
import api from '../../../../../components/api'

jest.mock('next/router')
jest.mock('@auth0/auth0-react')
jest.spyOn(window, 'alert').mockImplementation((message) => {
  console.error('Alert:', message)
})

describe('EditReview', () => {
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

  beforeEach(async () => {
    useRouter.mockReturnValue({
      query: {
        shopId: 1,
        reviewId: 1,
      },
    })

    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockResolvedValue('dummyToken'),
      getAccessTokenWithPopup: jest.fn(),
      user: { sub: '1234' },
    })

    component = render(<EditReview review={reviewData} />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render the edit review form', async () => {
    expect(screen.getByText('レビュー編集')).toBeInTheDocument()
    expect(screen.getByLabelText('商品名')).toBeInTheDocument()
    expect(screen.getByLabelText('内容')).toBeInTheDocument()
    expect(screen.getByLabelText('評価')).toBeInTheDocument()
    expect(screen.getByTestId('fileInput')).toBeInTheDocument()
    expect(screen.getByText('送信')).toBeInTheDocument()
  })

  test('should render the default values on the title, the caption and the score input areas', () => {
    expect(screen.getByText('Review 1')).toBeInTheDocument()
    expect(screen.getByText('Test caption')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  test('should render the validation messages', async () => {
    const titleInput = screen.getByLabelText('商品名')
    const captionInput = screen.getByLabelText('内容')

    await userEvent.clear(titleInput)
    await userEvent.clear(captionInput)

    const submitButton = screen.getByText('送信')
    await userEvent.click(submitButton)

    const errs = await screen.findAllByText('入力必須項目です。')
    errs.map((err) => {
      expect(err).toBeInTheDocument()
    })
    expect(await screen.findByText('画像を選択して下さい。')).toBeInTheDocument()
  })

  test('should submit the form for an authenticated user', async () => {
    const titleInput = screen.getByLabelText('商品名')
    const captionInput = screen.getByLabelText('内容')
    const imageInput = screen.getByTestId('fileInput')
    const scoreInput = screen.getByTestId('scoreInput')
    const scoreButton = within(scoreInput).getByRole('button')

    await userEvent.click(scoreButton)

    const listBox = within(screen.getByRole('presentation')).getByRole('listbox')
    const options = within(listBox).getAllByRole('option')
    const selectedScore = options[1]

    await userEvent.click(selectedScore)

    await userEvent.type(titleInput, 'New Title')
    await userEvent.type(captionInput, 'New Caption')

    const imageFile = new File(['image contents'], 'test.jpg', { type: 'image/jpg' })
    await userEvent.upload(imageInput, imageFile)

    const formData = new FormData()
    const fileInput = imageFile
    formData.append('title', titleInput)
    formData.append('caption', captionInput)
    formData.append('score', selectedScore)
    formData.append('image', fileInput)

    jest.spyOn(api, 'patch').mockResolvedValue({ data: formData })

    const token = 'dummyToken'
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
    const router = useRouter()

    const submitButton = screen.getByText('送信')
    await userEvent.click(submitButton)

    expect(await api.patch).toHaveBeenCalledWith(
      `/shops/${router.query.shopId}/reviews/${router.query.reviewId}`,
      expect.any(FormData),
      { headers: headers },
    )
  })
})
