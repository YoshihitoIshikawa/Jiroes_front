import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import ShopPage from '.'

jest.mock('next/router')

const shopData = {
  id: 1,
  name: 'Shop 1',
  address: '〒108-0073 東京都港区三田2-16-4',
  latitude: 35.6480611,
  longitude: 139.7416267,
}

const reviewsData = [
  {
    id: 1,
    title: 'Review 1',
    score: 5,
    image: {
      url: 'https://example.com/review1_thumb.jpg',
    },
  },
  {
    id: 2,
    title: 'Review 2',
    score: 4,
    image: {
      url: 'https://example.com/review2_thumb.jpg',
    },
  },
]

let component

beforeEach(() => {
  useRouter.mockReturnValue({
    query: {
      shopId: 1,
    },
  })
  component = render(<ShopPage shop={shopData} reviews={reviewsData} />)
})

afterEach(() => {
  component.unmount()
})

test("should render the shop's name and reviews", () => {
  const shopName = screen.getByText('Shop 1')
  expect(shopName).toBeInTheDocument()

  const reviewTitle = screen.getByText('Review 1')
  const reviewScore = screen.getByText('評価：5 / 5')
  expect(reviewTitle).toBeInTheDocument()
  expect(reviewScore).toBeInTheDocument()
})

test('should render the shop info when the shop info tab is clicked', async () => {
  const shopInfoTab = screen.getByText('店舗情報')
  await userEvent.click(shopInfoTab)

  const shopAddress = screen.getByText('所在地')
  const shopAccess = screen.getByText('アクセス')
  expect(shopAddress).toBeInTheDocument()
  expect(shopAccess).toBeInTheDocument()
})

test('should render the google map dialog when the map button is clicked', async () => {
  const shopInfoTab = screen.getByText('店舗情報')
  await userEvent.click(shopInfoTab)

  const mapButton = screen.getByText('MAP')
  await userEvent.click(mapButton)

  const mapDialog = screen.getByRole('dialog')
  await expect(mapDialog).toBeInTheDocument()
})
