import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import NewReview from './new'
import api from '../../../../components/api'

jest.mock('next/router')
jest.mock('@auth0/auth0-react')
jest.spyOn(window, 'alert').mockImplementation((message) => {
  console.error('Alert:', message)
})

describe('NewReview', () => {
  let component

  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {
        shopId: 1,
      },
    })

    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn().mockResolvedValue('dummyToken'),
      getAccessTokenWithPopup: jest.fn(),
      user: {
        email: 'apple@example.com',
        picture: 'https://example.com/user.jpg',
        nickname: 'apple',
      },
    })

    component = render(<NewReview />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render the review form', async () => {
    const titleInput = screen.getByLabelText('商品名')
    const captionInput = screen.getByLabelText('内容')
    const scoreInput = screen.getByLabelText('評価')
    const imageInput = screen.getByTestId('fileInput')

    expect(titleInput).toBeInTheDocument()
    expect(captionInput).toBeInTheDocument()
    expect(scoreInput).toBeInTheDocument()
    expect(imageInput).toBeInTheDocument()
  })

  test('should validate the form', async () => {
    const submitButton = screen.getByText('送信')

    await userEvent.click(submitButton)

    const textErrorMessages = await screen.findAllByText('入力必須項目です。')
    textErrorMessages.map((textErrorMessage) => {
      expect(textErrorMessage).toBeInTheDocument()
    })
    const imageErrorMessage = await screen.findByText('画像を選択して下さい。')
    expect(imageErrorMessage).toBeInTheDocument()
  })

  // FormDataでの送信に伴い、モック化したaxiosでは送信データが{}と空になってしまう問題があり実装中止。23/10/31
  // フォーム送信時にexpect.any(FormData)を使用し、実際送信されている値は正確ではないが検証したい事は実装できているので仕様変更。23/11/01
  test('should submit the form', async () => {
    const titleInput = screen.getByLabelText('商品名')
    const captionInput = screen.getByLabelText('内容')
    const imageInput = screen.getByTestId('fileInput')
    const scoreInput = screen.getByTestId('scoreInput')
    const scoreButton = within(scoreInput).getByRole('button')

    await userEvent.click(scoreButton)

    const listBox = within(screen.getByRole('presentation')).getByRole('listbox')
    const options = within(listBox).getAllByRole('option')
    const selectedScore = options[0]

    await userEvent.click(selectedScore)

    await userEvent.type(titleInput, 'Test Title')
    await userEvent.type(captionInput, 'Test Caption')

    const imageFile = new File(['image contents'], 'test.jpg', { type: 'image/jpg' })
    await userEvent.upload(imageInput, imageFile)

    const formData = new FormData()
    const fileInput = imageFile
    formData.append('title', titleInput)
    formData.append('caption', captionInput)
    formData.append('score', selectedScore)
    formData.append('image', fileInput)

    jest.spyOn(api, 'post').mockResolvedValue({ data: formData })

    const token = 'dummyToken'
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
    const router = useRouter()

    const submitButton = screen.getByText('送信')
    await userEvent.click(submitButton)

    expect(await api.post).toHaveBeenCalledWith(
      `/shops/${router.query.shopId}/reviews`,
      expect.any(FormData),
      { headers: headers },
    )
  })
})
