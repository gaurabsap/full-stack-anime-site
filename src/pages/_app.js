import '@/styles/globals.css'
import Nav from '@/pages/components/Nav'
export default function App({ Component, pageProps }) {
  return (
    <>
    <Nav/>
    <Component {...pageProps} />
    </>
  )
}
