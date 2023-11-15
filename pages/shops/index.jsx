import { Box } from '@mui/material'
import Link from 'next/link'

import api from '../../components/api'

export async function getServerSideProps() {
  const res = await api.get('/shops')
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
