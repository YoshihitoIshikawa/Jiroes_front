import { useAuth0 } from '@auth0/auth0-react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import api from '@/components/api'

export async function getStaticProps({ params }) {
  const res = await api.get(`/shops/${params.shopId}/reviews/${params.reviewId}`)
  const review = res.data
  return {
    props: { review: review },
  }
}

export async function getStaticPaths() {
  const shopRes = await api.get(`/shops`)
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

export default function EditReview({ review }) {
  const schema = yup.object({
    title: yup.string().required('入力必須項目です。'),
    score: yup.string().required('入力必須項目です。'),
    caption: yup.string().required('入力必須項目です。'),
    image: yup.string().required('画像を選択して下さい。'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) })
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

  async function onSubmit(data) {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
      const formData = new FormData()
      const fileInput = document.getElementById('fileInput')
      formData.append('title', data.title)
      formData.append('caption', data.caption)
      formData.append('score', data.score)
      formData.append('image', fileInput.files[0])
      formData.append('sub', user.sub)

      await api.patch(`/shops/${shopId}/reviews/${reviewId}`, formData, headers)
      router.push('/')
    } catch (err) {
      alert('登録に失敗しました。')
      console.log(data)
    }
  }

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
        <h1 className='mb-8 text-4xl'>レビュー編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <Box mb={2}>
            <TextField
              {...register('title')}
              defaultValue={review.title}
              label='商品名'
              variant='outlined'
              fullWidth
              multiline
              error={errors.title ? true : false}
            />
            <div className='mt-2 text-xs text-red-600'>{errors.title?.message}</div>
          </Box>
          <Box mb={2}>
            <TextField
              {...register('caption')}
              defaultValue={review.caption}
              label='内容'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              error={errors.caption ? true : false}
            />
            <div className='mt-2 text-xs text-red-600'>{errors.caption?.message}</div>
          </Box>
          <Box mb={2}>
            <Controller
              control={control}
              name='score'
              defaultValue={review.score}
              render={({ field }) => (
                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <InputLabel id='score'>評価</InputLabel>
                  <Select
                    {...field}
                    labelId='score'
                    id='demo-select-small'
                    data-testid='scoreInput'
                    label='score'
                    error={errors.score ? true : false}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <div className='mt-2 text-xs text-red-600'>{errors.score?.message}</div>
          </Box>
          <Box mb={2}>
            <Controller
              control={control}
              name='image'
              defaultValue=''
              render={({ field }) => (
                <input
                  {...field}
                  error={errors.image ? true : false}
                  type='file'
                  accept='image/*'
                  id='fileInput'
                  data-testid='fileInput'
                />
              )}
            />
            <div className='mt-2 text-xs text-red-600'>{errors.image?.message}</div>
          </Box>
          <input type='hidden' name='sub' value={user.sub} />
          <Button sx={{ width: 100, marginBottom: 10 }} variant='outlined' type='submit'>
            送信
          </Button>
        </form>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <div className='mb-8 text-2xl'>レビュー編集をするにはログインが必要です。</div>
      </div>
    )
  }
}
