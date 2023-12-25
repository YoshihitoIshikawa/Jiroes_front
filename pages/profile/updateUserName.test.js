import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import UpdateUserName from './updateUserName'
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
    render(<UpdateUserName />)

    const nameInput = screen.getByLabelText('新しいユーザーネーム')
    const submitButton = screen.getByText('送信')

    await userEvent.type(nameInput, 'Taro')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith(
        '/users/test_user_sub',
        { nickname: 'Taro' },
        { headers: { Authorization: 'Bearer test_access_token' } },
      )
    })
  })
})
