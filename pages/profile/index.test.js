import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'


import Profile from '.'

jest.mock('@auth0/auth0-react')

describe('Search result page', () => {
  test("should render logged in user's nickname, email and picture", async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      user: {
        email: 'apple@example.com',
        picture: 'https://example.com/user.jpg',
        nickname: 'apple',
      },
    })

    render(<Profile />)

    expect(await screen.findByText('apple')).toBeInTheDocument()
    expect(await screen.findByText('apple@example.com')).toBeInTheDocument()
    expect(await screen.findByAltText('user-pic')).toBeInTheDocument()
  })
})
