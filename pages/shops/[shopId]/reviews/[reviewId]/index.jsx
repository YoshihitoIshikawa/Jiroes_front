import { useAuth0 } from '@auth0/auth0-react'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import api from '@/components/api'

export async function getStaticProps({ params }) {
  const res = await api.get(`/shops/${params.shopId}/reviews/${params.reviewId}`)
  const review = res.data
  return {
    props: { review: review },
  }
}

export async function getStaticPaths() {
  const shopRes = await api.get('/shops')
  const shops = await shopRes.data

  const shopPaths = shops.map((shop) => ({
    params: { shopId: shop.id.toString() },
  }))

  const paths = []

  for (const shopPath of shopPaths) {
    const reviewRes = await api.get(`/shops/${shopPath.params.shopId}/reviews`)
    const reviews = await reviewRes.data

    const reviewPaths = reviews.map((review) => ({
      params: { shopId: shopPath.params.shopId, reviewId: review.id.toString() },
    }))

    paths.push(...reviewPaths)
  }
  return {
    paths,
    fallback: true,
  }
}

export default function ReviewPage({ review }) {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0()
  const router = useRouter()
  const { shopId, reviewId } = router.query
  const [token, setToken] = useState('')

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    handleClickOpen()
  }

  const confirmDelete = async () => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await api.delete(`/shops/${shopId}/reviews/${reviewId}`, headers)
      router.push(`/shops/${shopId}/reviews`)
      handleClose()
    } catch (error) {
      console.error('削除中にエラーが発生しました:', error)
    }
  }

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          domain: `${process.env['NEXT_PUBLIC_AUTH0_DOMAIN']}`,
          clientId: `${process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']}`,
          authorizationParams: {
            audience: `${process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']}`,
            redirect_uri: `${process.env['NEXT_PUBLIC_BASE_URL']}`,
            scope: 'read:current_user update:current_user_metadata',
          },
        })
        setToken(accessToken)
      } catch (e) {
        console.log(e.message)
        if (isAuthenticated) {
          const accessToken = await getAccessTokenWithPopup({
            domain: `${process.env['NEXT_PUBLIC_AUTH0_DOMAIN']}`,
            clientId: `${process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']}`,
            authorizationParams: {
              audience: `${process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']}`,
              redirect_uri: `${process.env['NEXT_PUBLIC_BASE_URL']}`,
              scope: 'read:current_user update:current_user_metadata',
            },
          })
          setToken(accessToken)
        }
      }
    }
    getToken()
  }, [getAccessTokenSilently, getAccessTokenWithPopup, isAuthenticated])

  if (isLoading) {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <h2 className='text-4xl'>Loading...</h2>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <div className='px-6 py-4 text-2xl md:text-4xl'>{review.title}</div>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='mb-20 overflow-hidden'>
              <table className='mb-4 min-w-full text-left font-light md:text-lg'>
                <tbody>
                  <tr className='border-b dark:border-neutral-500'>
                    <th className='whitespace-nowrap px-6 py-4'>画像</th>
                    <td className='whitespace-pre-wrap px-6 py-4'>
                      <Image
                        src={review.image.url}
                        alt='reviewImage'
                        className='rounded-lg'
                        width={500}
                        height={500}
                        priority
                      />
                    </td>
                  </tr>
                  <tr className='border-b dark:border-neutral-500'>
                    <th className='whitespace-nowrap px-6 py-4'>評価</th>
                    <td className='whitespace-pre-wrap px-6 py-4'>{review.score} / 5</td>
                  </tr>
                  <tr className='border-b dark:border-neutral-500'>
                    <th className='whitespace-nowrap px-6 py-4'>内容</th>
                    <td className='whitespace-pre-wrap px-6 py-4'>{review.caption}</td>
                  </tr>
                </tbody>
              </table>
              {user.sub == review.sub ? (
                <div>
                  <Link
                    className='mr-4'
                    href={`/shops/${shopId}/reviews/${reviewId}/edit`}
                  >
                    <Button variant='outlined'>
                      <CreateIcon />
                      編集
                    </Button>
                  </Link>
                  <Button variant='outlined' onClick={handleDelete}>
                    <DeleteIcon />
                    削除
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>確認</DialogTitle>
                    <DialogContent>
                      <DialogContentText>本当に削除しますか？</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color='primary'>
                        キャンセル
                      </Button>
                      <Button onClick={confirmDelete} color='primary'>
                        削除
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <div className='px-6 py-4 text-lg md:text-4xl'>{review.title}</div>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='mb-20 overflow-hidden'>
              <table className='mb-4 min-w-full text-left font-light md:text-lg'>
                <tbody>
                  <tr className='border-b dark:border-neutral-500'>
                    <th className='whitespace-nowrap px-6 py-4'>画像</th>
                    <td className='whitespace-pre-wrap px-6 py-4'>
                      <Image
                        src={review.image.url}
                        alt='reviewImage'
                        className='rounded-lg'
                        width={500}
                        height={500}
                        priority
                      />
                    </td>
                  </tr>
                  <tr className='border-b dark:border-neutral-500'>
                    <th className='whitespace-nowrap px-6 py-4'>評価</th>
                    <td className='whitespace-pre-wrap px-6 py-4'>{review.score} / 5</td>
                  </tr>
                  <tr className='border-b dark:border-neutral-500'>
                    <th className='whitespace-nowrap px-6 py-4'>内容</th>
                    <td className='whitespace-pre-wrap px-6 py-4'>{review.caption}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
