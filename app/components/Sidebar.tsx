import React from 'react';
import { useRouter } from 'next/router';

function Sidebar() {
  const router = useRouter();

  const handleMenuClick = (path:any) => {
    router.push(path);
  };

  return (
    <div className="sidebar">
      <ul className="menu">
        <li onClick={() => handleMenuClick('/')} className={router.pathname === '/' ? 'active' : ''}>
          Home
        </li>
        <li onClick={() => handleMenuClick('/users')} className={router.pathname === '/about' ? 'active' : ''}>
          users
        </li>
        <li onClick={() => handleMenuClick('/users/new')} className={router.pathname === '/products' ? 'active' : ''}>
          new
        </li>
        {/* 追加のメニューアイテムをここに追加 */}
      </ul>
    </div>
  );
}

export default Sidebar;
