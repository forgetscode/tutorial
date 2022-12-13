import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ActiveScrollContextProvider } from '../context/ScrollHeight'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ActiveScrollContextProvider>
      <Component {...pageProps} />
    </ActiveScrollContextProvider>
  )
}
