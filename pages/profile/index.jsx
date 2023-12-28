import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
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
            <h2 className='mb-2 text-2xl'>
              プロフィール画像
              <span className='ml-8'>
                <Link className='text-xl' href={'/profile/updateUserPicture'}>
                  <Button variant='outlined'>変更</Button>
                </Link>
              </span>
            </h2>
            <Image
              src={user.picture}
              alt='user-pic'
              className='rounded-lg'
              width={200}
              height={200}
              unoptimized
            />
          </div>
          <div className='mb-10'>
            <h2 className='mb-2 text-2xl'>
              ユーザーネーム
              <span className='ml-8'>
                <Link className='text-xl' href={'/profile/updateUserName'}>
                  <Button variant='outlined'>変更</Button>
                </Link>
              </span>
            </h2>
            <p>{user.nickname}</p>
          </div>
          <div className='mb-10'>
            <h2 className='mb-2 text-2xl'>
              メールアドレス
              <span className='ml-8'>
                <Link className='text-xl' href={'/profile/updateUserEmail'}>
                  <Button variant='outlined'>変更</Button>
                </Link>
              </span>
            </h2>
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
