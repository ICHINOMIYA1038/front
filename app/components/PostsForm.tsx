import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

async function sendPageContent(content: any, router:any): Promise<void> {
  
  try {
    const URL = "http://localhost:3000/posts";
    await axios.post(URL, content, {
      headers: {
        'Content-Type': 'application/json'
      }
    }); // POST先のURLを適切なものに置き換える
    
    router.push("/posts")
  } catch (error) {
    console.error('Error while sending page content:', error);
    throw error;
  }
  
}

const PostsForm: React.FC = () => {
  const [article, setArticle] = useState('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    const content = {
      post: {
        content: article,
        user_id: "3"
      }
    };
    sendPageContent(content,router)
    
    // フォーム送信後にフォーム  をリセットする
    setArticle('');

    // ユーザー登録後にリダイレクトする例
    //router.push('/success'); // ユーザー登録が成功した場合の遷移先を指定
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New User Registration</h1>
      <label>
        本文:
        <input type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
      </label>

      <button type="submit">Register</button>
    </form>
  );
};

export default PostsForm;