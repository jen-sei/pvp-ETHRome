import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Layout from '../components/layout'
import localFont from 'next/font/local'
import Head from 'next/head'

const IBM_MDA = localFont({
  src: [
    {
      path: '../public/fonts/IBM_MDA.woff',
      weight: '400'
    },
  ],
  variable: '--font-ibm-mda'
})


function NoSSRApp({ Component, pageProps }: AppProps) {

  return( 
    <html 
   // onClick={ e => e.preventDefault()}
    onDrag={ e => e.preventDefault()}
    onDragStart={ e => e.preventDefault()}
    onDragEnd={ e => e.preventDefault()}
    onContextMenu={ e=> e.preventDefault()}
    lang="en" className={`${IBM_MDA.variable} font-ibm`}>

    <Head>
      <link rel="shortcut icon" href="/images/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/roundedspade.png" />
    </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>

    </html>
  )
}


const App = dynamic(() => Promise.resolve(NoSSRApp), {
  ssr: false,
})

export default App;