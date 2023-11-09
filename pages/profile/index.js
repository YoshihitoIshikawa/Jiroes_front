import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import React from 'react'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

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
        <div>
          <h2 className='mb-16 text-4xl'>プロフィール</h2>
          <div className='mb-10'>
            <h2 className='mb-3 text-2xl'>プロフィール画像</h2>
            <Image
              src={user.picture}
              alt='user-pic'
              className='rounded-lg'
              width={100}
              height={100}
            />
          </div>
          <div className='mb-10'>
            <h2 className='mb-2 text-2xl'>ユーザーネーム</h2>
            <p>{user.nickname}</p>
          </div>
          <div className='mb-10'>
            <h2 className='mb-2 text-2xl'>メールアドレス</h2>
            <p>{user.email}</p>
          </div>
        </div>
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
