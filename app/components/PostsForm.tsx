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
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [duration, setDuration] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [image, setImage] = useState(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[user_id]', '3');
    formData.append('post[mainfile]', pdfFile); // PDFファイルをフォームデータに追加
    formData.append('post[postImage]', image);
    formData.append('post[catchphrase]', catchphrase);
    formData.append('post[number_of_men]', maleCount); // PDFファイルをフォームデータに追加
    formData.append('post[number_of_women]', femaleCount);
    formData.append('post[total_number_of_people]', totalParticipants);
    formData.append('post[playtime]', duration); // PDFファイルをフォームデータに追加
    sendPageContent(formData,router)
    
    // フォーム送信後にフォーム  をリセットする
    setTitle('');
    setCatchphrase("")
    setMaleCount(0)
    setFemaleCount(0)
    setTotalParticipants(0)
    setDuration("")
    setPdfFile(null);
    setImage(null)

    // ユーザー登録後にリダイレクトする例
    //router.push('/success'); // ユーザー登録が成功した場合の遷移先を指定
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New User Registration</h1>
      <label>
  タイトル:
  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
</label>

<label>
  キャッチフレーズ:
  <input type="text" value={catchphrase} onChange={(e) => setCatchphrase(e.target.value)} />
</label>

<label>
  男:
  <input type="number" value={maleCount} onChange={(e) => setMaleCount(Number(e.target.value))} />
</label>

<label>
  女:
  <input type="number" value={femaleCount} onChange={(e) => setFemaleCount(Number(e.target.value))} />
</label>

<label>
  総人数:
  <input type="number" value={totalParticipants} onChange={(e) => setTotalParticipants(Number(e.target.value))} />
</label>

<label>
  上演時間:
  <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
</label>

<label>
  PDFファイル:
  <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
</label>

<label>
  画像ファイル:
  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
</label>

      <button type="submit">Register</button>
    </form>
  );
};

export default PostsForm;