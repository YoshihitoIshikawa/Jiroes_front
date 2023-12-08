import { useAuth0 } from '@auth0/auth0-react'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Image from 'next/image'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import api from '../../../../../components/api'

export async function getServerSideProps({ params }) {
  const res = await api.get(`/shops/${params.shopId}/reviews/${params.reviewId}`)
  const review = res.data
  return {
    props: { review: review },
  }
}

export default function ReviewPage({ review }) {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } =
    useAuth0()
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

  const [liked, setLiked] = useState(false)
  const [numberOfLikes, setNumberOfLikes] = useState(review.number_of_likes)

  const handleLikeClick = async () => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      if (liked) {
        const likesData = await api.get(`/shops/${shopId}/reviews/${reviewId}/likes`)
        const likes = await likesData.data
        const currentUserLike = await likes.find((like) => like.sub === user.sub)

        const response = await api.delete(
          `/shops/${shopId}/reviews/${reviewId}/likes/${currentUserLike.id}`,
          headers,
        )
        const data = response.data

        setLiked(!liked)
        setNumberOfLikes(data[1].number_of_likes)
      } else {
        const response = await api.post(
          `/shops/${shopId}/reviews/${reviewId}/likes`,
          { sub: user.sub },
          headers,
        )
        const data = response.data

        setLiked(!liked)
        setNumberOfLikes(data[1].number_of_likes)
      }
    } catch (error) {
      console.error('いいね処理中にエラーが発生しました:', error)
    }
  }

  const confirmDelete = async () => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await api.delete(`/shops/${shopId}/reviews/${reviewId}`, headers)
      router.push(`/shops/${shopId}`)
      handleClose()
    } catch (error) {
      console.error('削除中にエラーが発生しました:', error)
    }
  }

  const checkCurrentUserLiked = async () => {
    try {
      const response = await api.get(`/shops/${shopId}/reviews/${reviewId}/likes`)

      const subList = response.data.map((item) => item.sub)

      if (subList.includes(user.sub)) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    } catch (error) {
      console.error('いいねの検証中にエラーが発生しました:', error)
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

    if (user) {
      checkCurrentUserLiked()
    }
  }, [getAccessTokenSilently, user])

  const myTheme = createTheme({
    palette: {
      primary: {
        main: '#f06292',
      },
    },
  })

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
              <div className='flex'>
                {liked ? (
                  <ThemeProvider theme={myTheme}>
                    <Button variant='outlined' onClick={handleLikeClick}>
                      <FavoriteIcon /> {numberOfLikes}
                    </Button>
                  </ThemeProvider>
                ) : (
                  <ThemeProvider theme={myTheme}>
                    <Button variant='outlined' onClick={handleLikeClick}>
                      <FavoriteBorderIcon /> {numberOfLikes}
                    </Button>
                  </ThemeProvider>
                )}
                {user.sub == review.sub ? (
                  <div>
                    <Link
                      className='mx-4'
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
              <ThemeProvider theme={myTheme}>
                <Button variant='outlined' onClick={loginWithRedirect}>
                  <FavoriteBorderIcon /> {numberOfLikes}
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
