import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import UpdateUserEmail from './updateUserEmail'
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

describe('UpdateUserEmail', () => {
  test('renders the form and submits the data', async () => {
    render(<UpdateUserEmail />)

    const emailInput = screen.getByLabelText('新しいメールアドレス')
    const submitButton = screen.getByText('送信')

    await userEvent.type(emailInput, 'test@example.com')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith(
        '/users/test_user_sub',
        { email: 'test@example.com' },
        { headers: { Authorization: 'Bearer test_access_token' } },
      )
    })
  })
})
