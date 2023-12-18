import { useAuth0 } from '@auth0/auth0-react'
import Box from '@mui/material/Box'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import api from '../components/api'

const MyReviews = () => {
  const [token, setToken] = useState('')
  const [myReviews, setMyReviews] = useState([])

  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const fetchMyReviews = async () => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await api.get('/my_reviews/index', headers)
      return response.data
    } catch (error) {
      console.error('Error fetching posted reviews:', error)
      return []
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

    const getMyReviews = async () => {
      const reviews = await fetchMyReviews()
      setMyReviews(reviews)
    }
    getMyReviews()
  }, [token])

  if (isLoading) {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <h2 className='text-4xl'>Loading...</h2>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div>
        <h2 className='mb-8 text-4xl'>投稿済レビュー</h2>
        {myReviews.length != 0 ? (
          <div className='flex flex-col'>
            {myReviews.map((review) => (
              <Box className='m-4 flex' key={review.id}>
                <div className='mr-10'>
                  <Image
                    src={review.image.url}
                    alt='reviewImage'
                    className='rounded-lg'
                    width={200}
                    height={150}
                    priority
                  />
                </div>
                <div>
                  <Link
                    className='text-xl'
                    href={`/shops/${review.shop_id}/reviews/${review.id}`}
                  >
                    {review.title}
                  </Link>
                  <p className='mt-2 text-lg'>評価：{review.score} / 5</p>
                  <p className='mt-2 text-lg'>
                    投稿日：{moment(review.created_at).format('YYYY-MM-DD')}
                  </p>
                  <p className='mt-2 text-lg'>店舗名：{review.shop.name}</p>
                </div>
              </Box>
            ))}
          </div>
        ) : (
          <div className='flex flex-col'>
            <p className='mb-8 text-2xl'>投稿済レビューがありません。</p>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <div className='mb-8 text-2xl'>
          投稿済レビューを表示するにはログインが必要です。
        </div>
      </div>
    )
  }
}

export default MyReviews
