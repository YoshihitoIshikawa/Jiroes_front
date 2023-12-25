import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import UpdateUserPicture from './updateUserPicture'
import api from '../../components/api'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: { sub: 'test_user_sub' },
    isAuthenticated: true,
    isLoading: false,
    getAccessTokenSilently: jest.fn().mockResolvedValue('test_access_token'),
  }),
}))

jest.spyOn(api, 'patch')

describe('UpdateUserName', () => {
  test('renders the form and submits the data', async () => {
    render(<UpdateUserPicture />)

    const pictureInput = screen.getByTestId('fileInput')
    const submitButton = screen.getByText('送信')

    const imageFile = new File(['image contents'], 'test.jpg', { type: 'image/jpg' })
    await userEvent.upload(pictureInput, imageFile)

    const formData = new FormData()
    formData.append('picture', imageFile)

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/users/test_user_sub', formData, {
        headers: {
          Authorization: 'Bearer test_access_token',
          'Content-Type': 'multipart/form-data',
        },
      })
    })
  })
})
