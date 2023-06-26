import React from "react";
import FooterBtn from "./FooterBtn";



const Footer :React.FC = ()=>{


    return (
<footer className="footer">
  <div className="md-flex md-justify-between">
    <a href="https://jajaaan.co.jp/" className="footer__logo">
      <img src="https://jajaaan.co.jp/wp-content/themes/jajaaan/assets/images/dist/svg/logo.svg" width="140" height="20" alt="JAJAAAN Logo" />
    </a>
    <div className="grid">
      <div>
        <p className="footer__navi-heading">SERVICE</p>
        <ul className="footer__navi">
          <li><a href="#">サービスA</a></li>
          <li><a href="#">サービスB</a></li>
          <li><a href="#">サービスC</a></li>
        </ul>
      </div>
      <div>
        <p className="footer__navi-heading">FOLLOW US</p>
        <ul className="footer__navi">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
      <div>
        <p className="footer__navi-heading">ABOUT</p>
        <ul className="footer__navi">
          <li><a href="#">会社概要</a></li>
          <li><a href="#">お問い合わせ</a></li>
          <li><a href="#">サイトマップ</a></li>
          <li><a href="#">プライバシーポリシー</a></li>
        </ul>
      </div>
    </div>
  </div>
  <hr />
  <p className="copyright">© 2023 <a href="https://jajaaan.co.jp/">JAJAAAN Inc.</a> All Rights Reserved.
  </p>
  <FooterBtn/>
</footer>
    );
}
export default Footer;