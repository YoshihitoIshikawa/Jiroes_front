import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewShop from './new'
import api from '../../components/api'

const formData = {
  access: '',
  address: '',
  call_timing: '',
  closed_days: '',
  menu: '',
  name: 'Shop 1',
  number_of_seats: '',
  open_time: '',
  parking: '',
  phone_number: '',
  prohibited_matters: '',
  remarks: '',
  when_to_buy_tickets: '',
}

jest.mock('@auth0/auth0-react')
jest.spyOn(api, 'post').mockResolvedValue({ data: formData })
jest.spyOn(window, 'alert').mockImplementation((message) => {
  console.error('Alert:', message)
})

describe('NewShop', () => {
  let component

  beforeEach(() => {
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

    component = render(<NewShop />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render the form when authenticated', () => {
    const inputForm = screen.getAllByText('店舗名(必須)')
    inputForm.map((inputForm) => {
      expect(inputForm).toBeInTheDocument()
    })
  })

  test('should render a validation error message when the name input area is empty', async () => {
    const submitButton = screen.getByText('送信')
    userEvent.click(submitButton)

    expect(await screen.findByText('店舗名は入力必須項目です。')).toBeInTheDocument()
  })

  test('should submit the form', async () => {
    const token = 'dummyToken'
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const nameInput = screen.getByLabelText('店舗名(必須)')
    const submitButton = screen.getByText('送信')

    await userEvent.type(nameInput, 'Shop 1')
    await userEvent.click(submitButton)

    expect(await api.post).toHaveBeenCalledWith('/shops', formData, { headers: headers })
  })
})
