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
import Cookies from 'js-cookie';
import TagSelecter from '@/components/TagSelecter';

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
  const [pdfFile, setPdfFile] = useState<null|File>(null);
  const [image, setImage] = useState<null|File>(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag,setSelectedTags] = useState([]);
  

  useEffect(() => {
    
    const { error } = router.query; // クエリパラメータからエラーメッセージを取得

    if (error) {
      setIsError(true);
      setErrorMessage(decodeURIComponent(error as string)); // URLエンコードされたエラーメッセージをデコードして設定
    }
  }, []);

  //人数の合計を計算
  useEffect(() => {
    
   setTotalParticipants(maleCount+femaleCount)
  }, [maleCount,femaleCount]);


  async function sendPageContent(content: any, router:any): Promise<void> {
  
    try {
      const URL = "http://localhost:3000/posts";
      const response=  await axios.post(URL, content, {
        headers: {
          'Content-Type': 'multipart/form-data',
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          "access-token": Cookies.get("access-token"),
        }
      }); // POST先のURLを適切なものに置き換える
      router.push("/")
  
    } catch (error) {
      console.error('Error while sending page content:', error);
      setIsError(true)
      setErrorMessage(error.response.data.error)
      throw error; // エラー発生後に関数を中断する
    }
  }


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // フォームの送信処理を実装する
    const formData = new FormData();
    formData.append('post[title]', title);
    if(pdfFile!=null){
      formData.append('post[mainfile]', pdfFile);
    }
    if(image!=null){
      formData.append('post[postImage]', image);
    }
     // PDFファイルをフォームデータに追加
    formData.append('post[catchphrase]', catchphrase);
    formData.append('post[number_of_men]', maleCount); // PDFファイルをフォームデータに追加
    formData.append('post[number_of_women]', femaleCount);
    formData.append('post[total_number_of_people]', totalParticipants);
    formData.append('post[playtime]', duration); // PDFファイルをフォームデータに追加
    formData.append('tags', selectedTag)
    for (let value of formData.entries()) { 
      console.log(value); 
  }

    sendPageContent(formData,router)
    .then(() => {  
      setIsError(true);
      setErrorMessage("完了しました。");
    })
    .catch((error) => {

    });

    
    // フォーム送信後にフォーム  をリセットする
    setTitle('');
    setCatchphrase("")
    setMaleCount(0)
    setFemaleCount(0)
    setTotalParticipants(0)
    setDuration("")
    setPdfFile(null);
    setImage(null);

    // ユーザー登録後にリダイレクトする例
    //router.push('/success'); // ユーザー登録が成功した場合の遷移先を指定
  };

  function setSumNumber() {
    setTotalParticipants(maleCount+femaleCount)
  }

  const handleChildStateChange = (value) => {

    setSelectedTags(value);
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
        <input className="post-form-input" type="number" value={maleCount}  min={0}
  max={21} onChange={(e) => {setMaleCount(Number(e.target.value));}} />
      </label>

      <label className="post-form-label">
        女:
        <input className="post-form-input" type="number" value={femaleCount}   min={0}
  max={21} onChange={(e) => setFemaleCount(Number(e.target.value))} />
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
        <option value="0">30分未満</option>
        <option value="1">30分以上〜60分未満</option>
        <option value="2">60分以上〜90分未満</option>
        <option value="3">90分以上〜120分未満</option>
        <option value="4">120分以上</option>
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

      <TagSelecter onChildStateChange={handleChildStateChange}/>
      
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