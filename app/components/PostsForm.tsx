import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material/";
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
    throw error; // エラー発生後に関数を中断する
  }
  
}

const PostsForm: React.FC = () => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [title, setTitle] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [duration, setDuration] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    
    const { error } = router.query; // クエリパラメータからエラーメッセージを取得

    if (error) {
      setIsError(true);
      setErrorMessage(decodeURIComponent(error as string)); // URLエンコードされたエラーメッセージをデコードして設定
    }
  }, []);


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
    .then(() => {
      setIsError(true);
      setErrorMessage("完了しました。");
    })
    .catch((error) => {
      setIsError(true);
      setErrorMessage("投稿に失敗しました。");
    });

    
    
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
    <div>
    <form className="post-form-container" onSubmit={handleSubmit}>
      <h1>脚本登録</h1>
      <label className="post-form-label">
        タイトル:
        <input className="post-form-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="post-form-char-count">
          <span >{catchphrase.length}/30</span>
        </div>
      </label>

      <label className="post-form-label">
        キャッチフレーズ:
        <textarea className="post-form-input"  rows={5} value={catchphrase} onChange={(e) => setCatchphrase(e.target.value)} />
        <div className="post-form-char-count">
          <span >{catchphrase.length}/60</span>
        </div>
      </label>
    <div className="post-form-number">
      <label className="post-form-label">
        男:
        <input className="post-form-input" type="number" value={maleCount} onChange={(e) => setMaleCount(Number(e.target.value))} />
      </label>

      <label className="post-form-label">
        女:
        <input className="post-form-input" type="number" value={femaleCount} onChange={(e) => setFemaleCount(Number(e.target.value))} />
      </label>

      <label className="post-form-label">
        総人数:
        <input className="post-form-input" type="number" value={totalParticipants} onChange={(e) => setTotalParticipants(Number(e.target.value))} />
      </label>
    </div>
        <label className="post-form-label">
        上演時間:
      <select className="post-form-input" value={duration} onChange={(e) => setDuration(e.target.value)}>
        <option value="">選択してください</option>
        <option value="30">30分未満</option>
        <option value="60">30分以上〜60分未満</option>
        <option value="90">60分以上〜90分未満</option>
        <option value="120">90分以上〜120分未満</option>
        <option value="121">120分以上</option>
      </select>
    </label>

      <label className="post-form-label">
        PDFファイル:
        <input className="post-form-input" type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
      </label>

      <label className="post-form-label">
        イメージ画像:
        <input className="post-form-input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </label>

      <button className="post-form-submit-button" type="submit">Register</button>
    </form>
    {isError && (
            <Alert
              style={{width:"70%",display:"box",margin:"0 auto"}}
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          )}
    </div>
    
  );
};

export default PostsForm;