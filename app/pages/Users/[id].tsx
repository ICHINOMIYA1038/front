import Layout from '@/components/Layout';
import React from 'react';


interface User {
    user_id: string;
    name: string;
    email: string;
    avatar: string; // 追加
    // 他のユーザーの属性を追加
  }
  
  interface UserDetailProps {
    user: User;
  }
  
  const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
    
    if (!user) {
        return <p>該当はありません</p>;
      }
    return (
      <Layout>
        <h1>User Details</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {user.image_url && <img src={user.image_url} alt="Avatar" style={{ width: '100px', height: '100px' }} />}{/* 画像を表示 */}
        {/* 他のユーザーの属性を表示するためのコードを追加 */}
      </Layout>  
    );
  };
export async function getServerSideProps(context: { params: any; }) {
  const id=context.params.id
  // APIを使用してユーザーのデータを取得する処理
  const response = await fetch(`http://api:3000/users/${id}`, { method: 'GET' });
  const data = await response.json();
  const user = data;

  return {
    props: {
      user,
    },
  };
}

export default UserDetail;