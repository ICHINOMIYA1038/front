import Layout from '@/components/Layout';
import React from 'react';
import {authUser} from '@/components/authUsers'
import PostCard from '@/components/PostCard';


interface User {
    user_id: string;
    name: string;
    email: string;
    avatar: string;
    image_url: string; // 追加
    // 他のユーザーの属性を追加
  }
  
  interface UserDetailProps {
    user: User;
  }
  
  const UserDetail: React.FC<UserDetailProps> = ({ user,posts }) => {
    
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

        {posts.map(post => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </Layout>  
    );
  };

  /*
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
*/

export default UserDetail;

function isRedirect(response: any): response is { redirect: { destination: string; permanent: boolean } } {
  return response && typeof response === "object" && "redirect" in response;
}

export async function getServerSideProps(context: { params: any; }) {

  /*ユーザーのデータの取得*/
  const id = context.params.id
  const response = await authUser(`users/${id}`, context);
  const user = JSON.parse(response as string) as User;

  if(isRedirect(response)){

    const errorMessage = "ログインが必要です"; // エラーメッセージを設定

    return {
      redirect: {
        permanent: false,
        destination: `/Login?error=${encodeURIComponent(errorMessage)}`, // リダイレクト先にエラーメッセージを渡す
      },
  }
  }

  /*ユーザーの投稿データの取得*/
  const postFetchResponse = await authUser(`users/${id}/posts`, context);
  const posts = JSON.parse(postFetchResponse as string);

  return {
    props: {
      user:user,
      posts:posts
    },
  };
};