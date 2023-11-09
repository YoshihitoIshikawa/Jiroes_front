import { useAuth0 } from '@auth0/auth0-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import PrimarySearchAppBar from './header'

jest.mock('@auth0/auth0-react')

describe('Header Component', () => {
  let component

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      user: {
        email: 'apple@example.com',
        picture: 'https://example.com/user.jpg',
        nickname: 'apple',
      },
    })

    component = render(<PrimarySearchAppBar />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render the header component', () => {
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  test('should render a search input area', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('should be able to input a search term in the search input area', async () => {
    const searchInput = screen.getByRole('textbox')
    await userEvent.type(searchInput, '二郎')

    expect(searchInput).toHaveValue('二郎')
  })

  test('should contain the keywords in URL when you click the search button after typing keywords in the search input area', async () => {
    useRouter.mockReturnValue({
      push: (url) => {
        expect(url).toBe('/search?keyword=二郎')
      },
    })

    const searchInput = screen.getByRole('textbox')
    await userEvent.type(searchInput, '二郎')

    const searchButton = screen.getByTestId('SearchIcon')
    await userEvent.click(searchButton)
  })

  test('should render "login" when not authorized', () => {
    const login = screen.getByText('ログイン')
    expect(login).toBeInTheDocument()
  })
})

describe('when authorized', () => {
  let component

  beforeEach(() => {
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

    component = render(<PrimarySearchAppBar />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render an account icon when authorized', async () => {
    await waitFor(() => {
      const accountIcons = screen.getAllByTestId('AccountCircleIcon')
      accountIcons.map((accountIcon) => {
        expect(accountIcon).toBeInTheDocument()
      })
    })
  })

  test('should render an account menu when you click the account icon', () => {
    const accountIcons = screen.getAllByTestId('AccountCircleIcon')
    userEvent.click(accountIcons[0])

    const myPageLinks = screen.getAllByText('マイページ')
    myPageLinks.map((myPageLink) => {
      expect(myPageLink).toBeInTheDocument()
    })
  })
})
