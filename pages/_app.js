import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TinyLink</title>
        <meta name="description" content="TinyLink - fast URL shortener" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Component {...pageProps} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}