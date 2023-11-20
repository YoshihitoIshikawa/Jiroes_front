import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import EditShop from './edit'
import api from '../../../components/api'

jest.mock('next/router')
jest.mock('@auth0/auth0-react')
jest.spyOn(window, 'alert').mockImplementation((message) => {
  console.error('Alert:', message)
})

describe('EditShop', () => {
  let component

  const shopData = {
    id: 1,
    name: 'Shop 1',
    address: '123 Main St',
    access: 'Near the station',
  }

  const updatedShopData = {
    access: 'Near the station',
    address: '123 Main St',
    call_timing: '',
    closed_days: '',
    menu: '',
    name: 'Updated Shop 1',
    number_of_seats: '',
    open_time: '',
    parking: '',
    phone_number: '',
    prohibited_matters: '',
    remarks: '',
    when_to_buy_tickets: '',
  }

  beforeEach(async () => {
    useRouter.mockReturnValue({
      query: {
        shopId: 1,
      },
    })

    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockResolvedValue('dummyToken'),
    })

    component = render(<EditShop shop={shopData} />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('should render the edit review form', async () => {
    expect(screen.getByText('店舗情報編集')).toBeInTheDocument()
    expect(screen.getByLabelText('店舗名(必須)')).toBeInTheDocument()
    expect(screen.getByText('送信')).toBeInTheDocument()
  })

  test('should render the default values on the name, the address and the access input areas', () => {
    expect(screen.getByLabelText('店舗名(必須)')).toHaveValue('Shop 1')
    expect(screen.getByLabelText('所在地')).toHaveValue('123 Main St')
    expect(screen.getByLabelText('アクセス')).toHaveValue('Near the station')
  })

  test('should render the validation messages', async () => {
    const nameInput = screen.getByLabelText('店舗名(必須)')
    await userEvent.clear(nameInput)

    const submitButton = screen.getByText('送信')
    await userEvent.click(submitButton)

    expect(await screen.getByText('店舗名は入力必須項目です。')).toBeInTheDocument()
  })

  test('should submit the form for an authenticated user', async () => {
    const nameInput = screen.getByLabelText('店舗名(必須)')
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'Updated Shop 1')

    jest.spyOn(api, 'patch').mockResolvedValue({ name: updatedShopData })

    const token = 'dummyToken'
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const router = useRouter()

    const submitButton = screen.getByText('送信')
    await userEvent.click(submitButton)

    expect(await api.patch).toHaveBeenCalledWith(
      `/shops/${router.query.shopId}`,
      updatedShopData,
      { headers: headers },
    )
  })
})
