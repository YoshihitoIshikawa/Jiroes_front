import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

import api from '../components/api'

export default function SearchResults() {
  const router = useRouter()
  const searchTerm = router.query.keyword

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await api.get(`/shops/search?search=${searchTerm}`)
        setSearchResults(response.data)
      } catch (e) {
        console.log(e.message)
      }
    }
    getSearchResults()
  }, [searchTerm])

  return (
    <div className='flex flex-col sm:w-1/2'>
      {searchResults.map((shop) => (
        <Box className='m-4' key={shop.id}>
          <Link className='text-xl' href={`/shops/${shop.id}`}>
            {shop.name}
          </Link>
          <p>{shop.access}</p>
        </Box>
      ))}
    </div>
  )
}
