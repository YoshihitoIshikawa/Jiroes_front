import { useAuth0 } from '@auth0/auth0-react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import api from '../components/api'

const RegisteredShops = () => {
  const [token, setToken] = useState('')
  const [registeredShops, setRegisteredShops] = useState(null)

  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const fetchRegisteredShops = async () => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await api.get('/registered_shops/index', headers)
      return response.data
    } catch (error) {
      console.error('Error fetching registered shops:', error)
      return null
    }
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `${process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']}`,
            scope: 'read:current_user',
          },
        })
        setToken(accessToken)
      } catch (e) {
        console.log(e.message)
      }
    }
    getToken()

    const getRegisteredShops = async () => {
      const shops = await fetchRegisteredShops()
      setRegisteredShops(shops)
    }
    getRegisteredShops()
  }, [token])

  if (isLoading) {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <h2 className='text-4xl'>Loading...</h2>
      </div>
    )
  }

  if (isAuthenticated) {
    if (registeredShops != null) {
      return (
        <div>
          <h2 className='mb-8 text-4xl'>登録済店舗</h2>
          {registeredShops.length != 0 ? (
            <div className='flex flex-col'>
              {registeredShops.map((shop) => (
                <Box className='m-4' key={shop.id}>
                  <Link className='text-xl' href={`/shops/${shop.id}`}>
                    {shop.name}
                  </Link>
                  <p>{shop.access}</p>
                </Box>
              ))}
            </div>
          ) : (
            <div className='flex flex-col'>
              <p className='mb-8 text-2xl'>ご自身で登録済の店舗がありません。</p>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className='flex flex-col sm:w-1/2'>
          <h2 className='text-4xl'>Loading...</h2>
        </div>
      )
    }
  } else {
    return (
      <div className='flex flex-col'>
        <div className='mb-8 text-2xl'>
          ご自身で登録済の店舗を表示するにはログインが必要です。
        </div>
      </div>
    )
  }
}

export default RegisteredShops
