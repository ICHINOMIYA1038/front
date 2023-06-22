import Head from "next/head";
import styles from '../styles/Home.module.css'

export const appName = "Sample App"

function Layout({ children } :any ) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{appName}</h1>
        <p>ここにはLayout.jsの内容が表示されています。</p>
      </header>
      <main className={styles.main}>
        { children }
      </main>
    </div>
  );
}

export default Layout;