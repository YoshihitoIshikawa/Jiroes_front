import { useAuth0 } from '@auth0/auth0-react'
import CreateIcon from '@mui/icons-material/Create'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import * as React from 'react'

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

export async function getStaticProps({ params }) {
  const resShop = await axios.get(`http://localhost:3000/api/v1/shops/${params.shopId}`)
  const shop = resShop.data
  const resReviews = await axios.get(
    `http://localhost:3000/api/v1/shops/${params.shopId}/reviews`,
  )
  const reviews = resReviews.data
  return {
    props: { shop: shop, reviews: reviews },
  }
}

export async function getStaticPaths() {
  const res = await axios.get('http://localhost:3000/api/v1/shops')
  const shops = await res.data

  const paths = shops.map((shop) => ({
    params: { shopId: shop.id.toString() },
  }))
  return {
    paths,
    fallback: true,
  }
}

export default function ShopPage({ shop, reviews }) {
  const [value, setValue] = React.useState(0)

  const { isAuthenticated } = useAuth0()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const router = useRouter()
  const { shopId } = router.query

  return (
    <div className='sm:w-2/3 flex flex-col'>
      <div>
        <h1 className='text-xl md:text-3xl flex justify-center mb-10'>{shop.name}</h1>
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
                      src={review.image.thumb.url}
                      alt='reviewImage'
                      className='rounded-lg'
                      width={200}
                      height={200}
                      priority
                    />
                  </div>
                  <div>
                    <Link
                      className='text-xl'
                      href={`/shops/${shopId}/reviews/${review.id}`}
                    >
                      {review.title}
                    </Link>
                    <p className='text-lg mt-4'>評価：{review.score} / 5</p>
                    <p className='text-lg mt-4'>
                      投稿日：{moment(review.created_at).format('YYYY-MM-DD')}
                    </p>
                  </div>
                </Box>
              ))}
            </div>
          ) : (
            <div className='flex flex-col'>
              <p className='text-2xl mb-8'>まだレビューがありません。</p>
              <Link className='text-xl' href={`/shops/${shopId}/reviews/new`}>
                ⇨最初のレビューを投稿する。
              </Link>
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden mb-20'>
                <table className='min-w-full text-left md:text-lg font-light mb-4'>
                  <tbody>
                    <tr className='border-b dark:border-neutral-500'>
                      <th className='whitespace-nowrap px-6 py-4'>所在地</th>
                      <td className='whitespace-pre-wrap px-6 py-4'>{shop.address}</td>
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
                {isAuthenticated ? (
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
