import { useAuth0 } from '@auth0/auth0-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import api from '../../components/api'
import CustomizedLoadingButton from '../../components/customizedLoadingButton'

const UpdateUserPicture = () => {
  const schema = yup.object({
    picture: yup.string().required('新しいプロフィール画像を選択して下さい。'),
  })

  const {
    control,
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
  }, [getAccessTokenSilently])

  async function onSubmit() {
    try {
      setLoading(true)

      const formData = new FormData()
      const fileInput = document.getElementById('fileInput')
      formData.append('picture', fileInput.files[0])

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
      await api.patch(`/users/${user.sub}`, formData, headers)
      router.push('/')
    } catch (err) {
      alert('変更に失敗しました。')
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
        <h1 className='mb-8 text-4xl'>プロフィール画像変更</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Controller
              control={control}
              name='picture'
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

export default UpdateUserPicture
