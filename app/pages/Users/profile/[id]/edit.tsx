import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';

interface User {
    user_id: string;
    name: string;
    email: string;
    // 他のユーザーの属性を追加
  }
  
  interface UserDetailProps {
    user: User;
  }

async function sendPageContent(formData: any, router:any,id:any): Promise<void> {
  
  try {
    const URL = `http://localhost:3000/users/${id}`;
    console.log(formData)
    await axios.patch(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }); // POST先のURLを適切なものに置き換える
    
    router.push("/users")
  } catch (error) {
    console.error('Error while sending page content:', error);
    throw error;
  }
  
}

const UserEditFrom: React.FC<UserDetailProps> = ({user}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);


  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    return <p>ユーザーが見つかりません。</p>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する

    const formData = new FormData();
    formData.append('user[name]', name);
    formData.append('user[email]', email);
    formData.append('user[avatar]', avatar);


    
    sendPageContent(formData,router,id)
    
    // フォーム送信後にフォーム  をリセットする
    setName('');
    setEmail('');
    setPassword('');

    // ユーザー登録後にリダイレクトする例
    //router.push('/success'); // ユーザー登録が成功した場合の遷移先を指定
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit}>
      <h1>プロフィールの編集</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="avatar">Avatar:</label>
      <input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files[0])}accept="image/*" />


      <button type="submit">Register</button>
    </form>
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

export default UserEditFrom;