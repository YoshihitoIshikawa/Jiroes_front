import { Box } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'

export async function getStaticProps() {
  const res = await axios.get('http://localhost:3000/api/v1/shops')
  const shops = res.data
  return {
    props: { shops: shops },
  }
}

export default function IndexShops({ shops }) {
  return (
    <div className='flex flex-col sm:w-1/2'>
      {shops.map((shop) => (
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
