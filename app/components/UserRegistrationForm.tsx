import React, { useState } from 'react';
import { useRouter } from 'next/router';



const UserRegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    
    
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

export default UserRegistrationForm;