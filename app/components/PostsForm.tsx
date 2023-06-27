import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

async function sendPageContent(content: any, router:any): Promise<void> {
  
  try {
    const URL = "http://localhost:3000/posts";
    await axios.post(URL, content, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
  const [pdfFile, setPdfFile] = useState<File | null>(null); // PDFファイルを管理するステート
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    const formData = new FormData();
    formData.append('post[content]', article);
    formData.append('post[user_id]', '3');
    formData.append('post[mainfile]', pdfFile); // PDFファイルをフォームデータに追加
    sendPageContent(formData,router)
    
    // フォーム送信後にフォーム  をリセットする
    setArticle('');
    setPdfFile(null);

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

      <label>
        PDFファイル:
        <input type="file" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
      </label>

      <button type="submit">Register</button>
    </form>
  );
};

export default PostsForm;