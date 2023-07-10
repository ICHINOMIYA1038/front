import '@/styles/globals.css'
import '@/styles/card.css'
import '@/styles/PostCard.css'
import '@/styles/PostForm.css'
import '@/styles/searchForm.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

const LoginPopup = () => {
  return (
    <div className="popup">
      <h2>Please Login</h2>
      <p>You need to be logged in to access this site.</p>
      {/* ログインフォームやログインボタンなど、適宜追加してください */}
    </div>
  );
};