import { Box } from '@mui/system'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

export default function SearchResults() {
  const router = useRouter()
  const searchTerm = router.query.keyword

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/shops/search?search=${searchTerm}`,
        )
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
