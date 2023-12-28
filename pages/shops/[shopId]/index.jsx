import { useAuth0 } from '@auth0/auth0-react'
import CreateIcon from '@mui/icons-material/Create'
import RoomIcon from '@mui/icons-material/Room'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useState } from 'react'
import * as React from 'react'

import api from '../../../components/api'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export async function getServerSideProps({ params }) {
  const resShop = await api.get(`/shops/${params.shopId}`)
  const shop = resShop.data
  const resReviews = await api.get(`/shops/${params.shopId}/reviews`)
  const reviews = resReviews.data
  return {
    props: { shop: shop, reviews: reviews },
  }
}

export default function ShopPage({ shop, reviews }) {
  const [value, setValue] = React.useState(0)

  const { user, isAuthenticated } = useAuth0()

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const router = useRouter()
  const { shopId } = router.query

  if (!shop) {
    return (
      <div className='flex flex-col sm:w-1/2'>
        <h2 className='text-4xl'>Loading...</h2>
      </div>
    )
  }

  return (
    <div className='flex flex-col sm:w-2/3'>
      <div>
        <h1 className='mb-10 flex justify-center text-xl md:text-3xl'>{shop.name}</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='レビュー' {...a11yProps(0)} />
            <Tab label='店舗情報' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {reviews.length != 0 ? (
            <div className='flex flex-col'>
              <Link className='text-xl' href={`/shops/${shopId}/reviews/new`}>
                <Button variant='outlined'>
                  <CreateIcon />
                  レビュー投稿
                </Button>
              </Link>
              {reviews.map((review) => (
                <Box className='m-4 flex' key={review.id}>
                  <div className='mr-10'>
                    <Image
                      src={review.image.url}
                      alt='reviewImage'
                      className='rounded-lg'
                      width={200}
                      height={150}
                      priority
                      unoptimized
                    />
                  </div>
                  <div>
                    <Link
                      className='text-xl'
                      href={`/shops/${shopId}/reviews/${review.id}`}
                    >
                      {review.title}
                    </Link>
                    <p className='mt-4 text-lg'>評価：{review.score} / 5</p>
                    <p className='mt-4 text-lg'>
                      投稿日：{moment(review.created_at).format('YYYY-MM-DD')}
                    </p>
                  </div>
                </Box>
              ))}
            </div>
          ) : (
            <div className='flex flex-col'>
              <p className='mb-8 text-2xl'>まだレビューがありません。</p>
              <Link className='text-xl' href={`/shops/${shopId}/reviews/new`}>
                ⇨最初のレビューを投稿する。
              </Link>
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='mb-20 overflow-hidden'>
                <table className='mb-4 min-w-full text-left font-light md:text-lg'>
                  <tbody>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>所在地</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.address}</td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>地図</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        <Button variant='outlined' onClick={handleClickOpen}>
                          <RoomIcon />
                          MAP
                        </Button>
                        <Dialog open={open} onClose={handleClose} maxWidth='xl'>
                          <DialogContent>
                            <div style={{ height: '60vh', width: '60vw' }}>
                              <LoadScript
                                googleMapsApiKey={
                                  process.env['NEXT_PUBLIC_GOOGLE_MAP_API_KEY']
                                }
                              >
                                <GoogleMap
                                  mapContainerStyle={{ width: '100%', height: '100%' }}
                                  center={{
                                    lat: shop.latitude,
                                    lng: shop.longitude,
                                  }}
                                  zoom={16}
                                >
                                  <Marker
                                    position={{
                                      lat: shop.latitude,
                                      lng: shop.longitude,
                                    }}
                                  />
                                </GoogleMap>
                              </LoadScript>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>アクセス</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.access}</td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>営業時間</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.open_time}</td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>定休日</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        {shop.closed_days}
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>電話番号</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        {shop.phone_number}
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>座席数</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        {shop.number_of_seats}
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>駐車場</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.parking}</td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>メニュー</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.menu}</td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>食券購入</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        {shop.when_to_buy_tickets}
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>コール</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        {shop.call_timing}
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>禁止事項</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>
                        {shop.prohibited_matters}
                      </td>
                    </tr>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>備考</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.remarks}</td>
                    </tr>
                  </tbody>
                </table>
                {isAuthenticated && user.sub == shop.sub ? (
                  <Link href={`/shops/${shopId}/edit`}>
                    <Button variant='outlined'>
                      <CreateIcon />
                      編集
                    </Button>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  )
}
