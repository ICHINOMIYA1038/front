import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TextField,Grid, Button,Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInquiryTypeChange = (e) => {
    setInquiryType(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = '名前は必須です';
    }

    if (!email.trim()) {
      errors.email = 'メールアドレスは必須です';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '有効なメールアドレスを入力してください';
    }

    if (!inquiryType) {
      errors.inquiryType = '問い合わせ種別を選択してください';
    }

    if (!message.trim()) {
      errors.message = '問い合わせ内容は必須です';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        name: name,
        email: email,
        inquiryType: inquiryType,
        message: message,
      };

      axios
        .post('http://localhost:3000/contacts', payload)
        .then((response) => {
          // 送信成功時の処理
          setSubmitSuccess(true);
          setName('');
          setEmail('');
          setInquiryType('');
          setMessage('');
          router.reload();
        })
        .catch((error) => {
          // 送信失敗時の処理
          console.log(error);
          setSubmitError(true);
        });
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };
  return (
    <Layout>
        
        <div className='contactForm'>
        <h2>お問い合わせ</h2>
        <br />
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="名前"
              value={name}
              onChange={handleNameChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl error={Boolean(errors.inquiryType)} required fullWidth>
              <InputLabel id="inquiryType-label">問い合わせ種別</InputLabel>
              <Select
                labelId="inquiryType-label"
                id="inquiryType"
                value={inquiryType}
                onChange={handleInquiryTypeChange}
                fullWidth
              >
                <MenuItem value="0">著作権侵害報告</MenuItem>
                <MenuItem value="1">不具合報告</MenuItem>
                <MenuItem value="2">悪質なユーザーの報告</MenuItem>
                <MenuItem value="3">その他</MenuItem>
              </Select>
              {errors.inquiryType && <div>{errors.inquiryType}</div>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="問い合わせ内容"
              multiline
              rows={4}
              value={message}
              onChange={handleMessageChange}
              error={Boolean(errors.message)}
              helperText={errors.message}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">送信</Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={submitSuccess} autoHideDuration={5000} onClose={handleCloseSnackbar} message="送信が完了しました。" />
      <Snackbar open={submitError} autoHideDuration={5000} onClose={handleCloseSnackbar} message="送信に失敗しました。" />
      </div>
    </Layout>
  );
}

export default Home;
