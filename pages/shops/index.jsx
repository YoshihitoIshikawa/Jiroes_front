import { Box, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import api from '../../components/api'

export default function IndexShops() {
  const [loading, setLoading] = useState(true)
  const [shops, setShops] = useState(null)

  const fetchShops = async () => {
    try {
      const response = await api.get('/shops')
      return response.data
    } catch (error) {
      console.error('Error fetching shops:', error)
      return null
    }
  }

  useEffect(() => {
    const getShops = async () => {
      const shopsData = await fetchShops()
      setShops(shopsData)
      setLoading(false)
    }
    getShops()
  }, [])

  return (
    <div>
      {loading ? (
        <div className='flex items-center'>
          <h2 className='text-4xl'>
            Loading
            <span className='ml-4'>
              <CircularProgress />
            </span>
          </h2>
        </div>
      ) : (
        <div className='flex flex-col'>
          {shops.map((shop) => (
            <Box className='m-4' key={shop.id}>
              <Link className='text-xl' href={`/shops/${shop.id}`}>
                {shop.name}
              </Link>
              <p>{shop.access}</p>
            </Box>
          ))}
        </div>
      )}
    </div>
  )
}
