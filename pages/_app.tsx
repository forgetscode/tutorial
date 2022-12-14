import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ActiveScrollContextProvider } from '../context/ScrollHeight'
import { ColorModeContextProvider } from '../context/ColorModeContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeContextProvider>
      <ActiveScrollContextProvider>
        <Component {...pageProps} />
      </ActiveScrollContextProvider>
    </ColorModeContextProvider>
  )
}
