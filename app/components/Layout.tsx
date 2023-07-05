import Head from "next/head";
import styles from '../styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'
import Logo from './Logo'
import Navbar from './NavBar'
import NavLink from './NavLink'

export const appName = "Sample App"

function Layout({ children } :any ) {
  return (
    <div >
      <div className="sticky-header">
        <Header />
      </div>
      <div className="header-gap"></div>
      <div style={{padding:"20px 40px"}}>
        { children }
      </div>
      <Footer/>
    </div>
  );
}

export default Layout;