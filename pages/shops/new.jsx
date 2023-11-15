import { useAuth0 } from '@auth0/auth0-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import api from '@/components/api'
import CustomizedLoadingButton from '@/components/customizedLoadingButton'

export default function NewShop() {
  const schema = yup.object({
    name: yup.string().required('店舗名は入力必須項目です。'),
  })

  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const router = useRouter()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

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
  }, [getAccessTokenSilently])

  async function onSubmit(data) {
    try {
      setLoading(true)
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await api.post('/shops', data, headers)
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
          <CustomizedLoadingButton loading={loading} />
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
