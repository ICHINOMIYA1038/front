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
  const [pdfFile, setPdfFile] = useState<null | File>(null);
  const [image, setImage] = useState<null | File>(null);
  const [selectedTag, setSelectedTags] = useState<string[]>([]);
  const [pdfFileSizeLimit] = useState(50 * 1024 * 1024);
  const [imageFileSizeLimit] = useState(10 * 1024 * 1024);

  useEffect(() => {
    const { error } = router.query;
    if (error) {
      setIsError(true);
      setErrorMessage(decodeURIComponent(error as string));
    }
  }, []);

  useEffect(() => {
    setTotalParticipants(maleCount + femaleCount);
  }, [maleCount, femaleCount]);

  async function sendPageContent(content: any, router: any): Promise<void> {
    try {
      const URL = "http://localhost:3000/posts";
      const response = await axios.post(URL, content, {
        headers: {
          'Content-Type': 'multipart/form-data',
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          "access-token": Cookies.get("access-token"),
        }
      });
      router.push("/");
    } catch (error) {
      console.error('Error while sending page content:', error);
      setIsError(true);
      setErrorMessage(error.response.data.error);
      throw error;
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (title.trim() === '') {
      setIsError(true);
      setErrorMessage("タイトルを入力してください。");
      return;
    }

    if (catchphrase.trim() === '') {
      setIsError(true);
      setErrorMessage("キャッチフレーズを入力してください。");
      return;
    }

    if (maleCount < 0 || femaleCount < 0) {
      setIsError(true);
      setErrorMessage("人数は0以上で入力してください。");
      return;
    }

    if (duration === '') {
      setIsError(true);
      setErrorMessage("上演時間を選択してください。");
      return;
    }

    if (!pdfFile) {
      setIsError(true);
      setErrorMessage("PDFファイルを選択してください。");
      return;
    }

    if (pdfFile.size > pdfFileSizeLimit) {
      setIsError(true);
      setErrorMessage(`PDFファイルのサイズは${formatFileSize(pdfFileSizeLimit)}以下にしてください。`);
      return;
    }

    if (image && image.size > imageFileSizeLimit) {
      setIsError(true);
      setErrorMessage(`画像のサイズは${formatFileSize(imageFileSizeLimit)}以下にしてください。`);
      return;
    }

    const formData = new FormData();
    formData.append('post[title]', title.trim());
    formData.append('post[mainfile]', pdfFile);
    if (image) {
      formData.append('post[postImage]', image);
    }
    formData.append('post[catchphrase]', catchphrase.trim());
    formData.append('post[number_of_men]', maleCount.toString());
    formData.append('post[number_of_women]', femaleCount.toString());
    formData.append('post[total_number_of_people]', totalParticipants.toString());
    formData.append('post[playtime]', duration);
    formData.append('tags', selectedTag.join(','));

    sendPageContent(formData, router)
      .then(() => {
        setIsError(true);
        setErrorMessage("完了しました。");
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage("エラーが発生しました。");
      });

    setTitle('');
    setCatchphrase('');
    setMaleCount(0);
    setFemaleCount(0);
    setTotalParticipants(0);
    setDuration('');
    setPdfFile(null);
    setImage(null);
  };

  const handleChildStateChange = (value: string[]) => {
    setSelectedTags(value);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size}B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)}KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)}MB`;
    }
  };

  return (
    <div>
      <form className="post-form-container" onSubmit={handleSubmit}>
        <h1>脚本登録</h1>
        <label className="post-form-label">
          タイトル * :
          <input
            className="post-form-input"
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setCatchphrase(e.target.value);
              }
            }}
            required
          />
          <div className="post-form-char-count">
            <span>{title.length}/30</span>
          </div>
        </label>

        <label className="post-form-label">
          キャッチフレーズ:
          <textarea
            className="post-form-input"
            rows={5}
            value={catchphrase}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setCatchphrase(e.target.value);
              }
            }}
            required
          />
          <div className="post-form-char-count">
            <span>{catchphrase.length}/60</span>
          </div>
        </label>

        <div className="post-form-number">
          <label className="post-form-label">
            男:
            <input
              className="post-form-input"
              type="number"
              value={maleCount}
              min={0}
              max={21}
              onChange={(e) => setMaleCount(Number(e.target.value))}
              required
            />
          </label>

          <label className="post-form-label">
            女:
            <input
              className="post-form-input"
              type="number"
              value={femaleCount}
              min={0}
              max={21}
              onChange={(e) => setFemaleCount(Number(e.target.value))}
              required
            />
          </label>

          <label className="post-form-label">
            総人数:
            <input
              className="post-form-input"
              type="number"
              value={totalParticipants}
              disabled
            />
          </label>
        </div>

        <label className="post-form-label">
          上演時間:
          <select
            className="post-form-input"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
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
          <input
            className="post-form-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                if (file.size > pdfFileSizeLimit) {
                  setIsError(true);
                  setErrorMessage(`PDFファイルのサイズは${formatFileSize(pdfFileSizeLimit)}以下にしてください。`);
                } else {
                  setIsError(false);
                  setErrorMessage("");
                  setPdfFile(file);
                }
              }
            }}
            required
          />
        </label>

        <label className="post-form-label">
          イメージ画像:
          <input
            className="post-form-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                if (file.size > imageFileSizeLimit) {
                  setIsError(true);
                  setErrorMessage(`画像のサイズは${formatFileSize(imageFileSizeLimit)}以下にしてください。`);
                } else {
                  setIsError(false);
                  setErrorMessage("");
                  setImage(file);
                }
              }
            }}
          />
        </label>

        <TagSelecter onChildStateChange={handleChildStateChange} />

        <button className="post-form-submit-button" type="submit">Register</button>
      </form>

      {isError && (
        <Alert
          style={{ width: "70%", display: "box", margin: "0 auto" }}
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

