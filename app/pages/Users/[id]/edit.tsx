import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface User {
    user_id: string;
    name: string;
    email: string;
    // 他のユーザーの属性を追加
  }
  
  interface UserDetailProps {
    user: User;
  }

async function sendPageContent(content: any, router:any,id:any): Promise<void> {
  
  try {
    const URL = `http://localhost:3000/users/${id}`;
    console.log(content)
    await axios.patch(URL, content, {
      headers: {
        'Content-Type': 'application/json'
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

  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    return <p>ユーザーが見つかりません。</p>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    const content = {
      user: {
        name: name,
        email: email
      }
    };


    
    sendPageContent(content,router,id)
    
    // フォーム送信後にフォーム  をリセットする
    setName('');
    setEmail('');
    setPassword('');

    // ユーザー登録後にリダイレクトする例
    //router.push('/success'); // ユーザー登録が成功した場合の遷移先を指定
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New User Registration</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>


      <button type="submit">Register</button>
    </form>
  );
};

export async function getServerSideProps(context: { params: any; }) {
    const id=context.params.id
    console.log("aa")
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