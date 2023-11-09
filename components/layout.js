import Footer from './footer'
import PrimarySearchAppBar from './header'

export default function Layout({ children }) {
  return (
    <>
      <PrimarySearchAppBar />
      <div className='-z-50 min-h-screen bg-yellow-200'>
        <main className='flex justify-center py-20'>{children}</main>
      </div>
      <Footer />
    </>
  )
}
