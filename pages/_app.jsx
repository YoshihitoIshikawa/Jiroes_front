import '@/styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react'
import Head from 'next/head'
import Router from 'next/router'

import Layout from '@/components/layout'

export default function App({ Component, pageProps }) {
  const onRedirectCallback = (appState) => {
    Router.replace(appState?.returnTo || '/')
  }

  return (
    <Auth0Provider
      domain={process.env['NEXT_PUBLIC_AUTH0_DOMAIN']}
      clientId={process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']}
      audience={process.env['NEXT_PUBLIC_AUTH0_AUDIENCE']}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: process.env['NEXT_PUBLIC_BASE_URL'],
      }}
    >
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth0Provider>
  )
}
