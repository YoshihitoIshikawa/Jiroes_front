import { useAuth0 } from '@auth0/auth0-react'
import { screen, render, waitFor } from '@testing-library/react'

import RegisteredShops from './registeredShops'
import api from '../components/api'

jest.mock('@auth0/auth0-react')

describe('RegisteredShops Component', () => {
  const registeredShops = [
    {
      id: 1,
      name: 'test 1',
      access: 'access 1',
    },
    {
      id: 2,
      name: 'test 2',
      access: 'access 2',
    },
  ]

  test('calls backend API to fetch data and renders that data.', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn().mockResolvedValue('dummyToken'),
      isLoading: false,
    })
    await jest.spyOn(api, 'get').mockResolvedValue({ data: registeredShops })

    await waitFor(() => {
      render(<RegisteredShops />)
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/registered_shops/index', expect.any(Object))
    })

    await waitFor(() => {
      registeredShops.forEach((shop) => {
        expect(screen.getByText(shop.name)).toBeInTheDocument()
        expect(screen.getByText(shop.access)).toBeInTheDocument()
      })
    })
  })
})
