import '@/styles/globals.css'
import '@/styles/card.css'
import '@/styles/PostCard.css'
import '@/styles/PostForm.css'
import '@/styles/searchForm.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
