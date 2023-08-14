import React from "react";
import FooterBtn from "./FooterBtn";



const Footer :React.FC = ()=>{


    return (
<footer className="footer">
  <div className="md-flex md-justify-between">
    <a href="/" className="footer__logo">
      <img src="/footer.png" />
    </a>
    <div className="grid">
      <div>
        <p className="footer__navi-heading">このサイトについて</p>
        <ul className="footer__navi">
          <li><a href="/support/aboutus">運営者概要</a></li>
          <li><a href="/support/press-release">プレスリリース</a></li>
          <li><a href="#"></a></li>
        </ul>
      </div>
      <div>
        <p className="footer__navi-heading">ヘルプ</p>
        <ul className="footer__navi">
          <li><a href="/support/contact">お問い合わせ</a></li>
          <li><a href="/support/privacy-policy">プライバシーポリシー</a></li>
        </ul>
      </div>
      <div>
        <p className="footer__navi-heading">利用規約等</p>
        <ul className="footer__navi">
          <li><a href="/support/tos">利用規約</a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
      </div>
    </div>
  </div>
  <p className="copyright">© 2023 <a href="">戯曲の森</a> All Rights Reserved.
  </p>
  <FooterBtn/>
</footer>
    );
}
export default Footer;