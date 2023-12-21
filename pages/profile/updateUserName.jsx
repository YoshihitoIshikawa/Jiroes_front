import { useAuth0 } from '@auth0/auth0-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import CustomizedLoadingButton from '../../components/customizedLoadingButton'
import api from '../../components/api'

const Profile = () => {
  const schema = yup.object({
    nickname: yup.string().required('新しいユーザーネームを入力して下さい。'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const router = useRouter()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env['NEXT_PUBLIC_AUTH0_AUDIENCE'],
            scope: 'update:users',
          },
        })
        setToken(accessToken)
      } catch (e) {
        console.log(e.message)
      }
    }
    getToken()
  }, [])

  async function onSubmit(data) {
    try {
      setLoading(true)
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await api.patch(`/users/${user.sub}`, data, headers)
      router.push('/profile').then(() => {
        window.location.reload(true)
      })
    } catch (err) {
      alert('登録に失敗しました。')
      setLoading(false)
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
        <h1 className='mb-8 text-4xl'>ユーザーネーム変更</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              {...register('nickname')}
              label='ユーザーネーム'
              variant='outlined'
              fullWidth
              error={errors.nickname ? true : false}
              helperText={errors.nickname?.message}
            />
          </Box>
          <CustomizedLoadingButton loading={loading} />
        </form>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <p className='text-4xl'>ログインしてください。</p>
      </div>
    )
  }
}

export default Profile
