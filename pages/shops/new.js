import { useAuth0 } from '@auth0/auth0-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export default function NewShop() {
  const schema = yup.object({
    name: yup.string().required('店舗名は入力必須項目です。'),
  })

  const { isAuthenticated, isLoading, getAccessTokenSilently, getAccessTokenWithPopup } =
    useAuth0()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const router = useRouter()
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
    getToken()
  }, [getAccessTokenSilently, getAccessTokenWithPopup, isAuthenticated])

  async function onSubmit(data) {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.post('http://localhost:3000/api/v1/shops', data, headers)
      router.push('/')
    } catch (err) {
      alert('登録に失敗しました。')
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
        <h1 className='mb-8 text-4xl'>新規店舗登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              {...register('name')}
              label='店舗名(必須)'
              variant='outlined'
              fullWidth
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('address')}
              label='所在地'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('access')}
              label='アクセス'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('open_time')}
              label='営業時間'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('closed_days')}
              label='定休日'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('phone_number')}
              label='電話番号'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('number_of_seats')}
              label='座席数'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('parking')}
              label='駐車場(有・無・その他詳細)'
              variant='outlined'
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('menu')}
              label='メニュー'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('when_to_buy_tickets')}
              label='食券購入(列に並ぶ前・入店時等)'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('call_timing')}
              label='コール(タイミングや店舗独自の仕方等)'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('prohibited_matters')}
              label='禁止事項(マシマシ不可・麺固め不可・特定のルール等)'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box mb={2}>
            <TextField
              {...register('remarks')}
              label='備考(店舗特有のルール・留意ポイント等)'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <p className='mb-2 text-red-600'>{errors.user_id?.message}</p>
          <Button sx={{ width: 100 }} variant='outlined' type='submit'>
            送信
          </Button>
        </form>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <div className='mb-8 text-2xl'>店舗登録をするにはログインが必要です。</div>
      </div>
    )
  }
}
