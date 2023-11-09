import { useAuth0 } from '@auth0/auth0-react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import RamenDiningIcon from '@mui/icons-material/RamenDining'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useState } from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function PrimarySearchAppBar() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  const [searchTerm, setSearchTerm] = useState('')

  const router = useRouter()

  const handleSearch = async () => {
    try {
      router.push(`/search?keyword=${searchTerm}`)
    } catch (error) {
      console.error('検索エラー:', error)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/profile'}>マイページ</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/shops'}>店舗一覧</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/shops/new'}>新規店舗登録</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <p onClick={() => logout()}>ログアウト</p>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/profile'}>マイページ</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/shops'}>店舗一覧</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/shops/new'}>新規店舗登録</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <p onClick={() => logout()}>ログアウト</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className='bg-zinc-800'>
        <Toolbar>
          <RamenDiningIcon className='mr-2' />
          <Typography
            variant='h6'
            className='mr-3 font-black'
            component='div'
            sx={{ display: { sm: 'block' } }}
          >
            <Link href='/'>JIROES</Link>
          </Typography>
          <Search>
            <StyledInputBase
              placeholder='店名・エリア検索'
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          <SearchIcon className='cursor-pointer' onClick={handleSearch} />
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated ? (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </>
          ) : (
            <div className='flex items-center'>
              <div>
                <p
                  className='cursor-pointer whitespace-nowrap text-xs md:text-base'
                  onClick={() => loginWithRedirect()}
                >
                  ログイン
                </p>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
