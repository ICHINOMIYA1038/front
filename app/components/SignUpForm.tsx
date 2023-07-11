import React, { useState, FormEvent,useEffect } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CheckIcon
} from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next';
import Link from 'next/link'



const SignUpForm: React.FC = (props:any) => {
  const router = useRouter();
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user_id, setUserId] = useState('');
  useEffect(() => {
    
    const { error } = router.query; // クエリパラメータからエラーメッセージを取得

    if (error) {
      if(decodeURIComponent(error as string)=="NeedtoLogin"){
        setErrorMessage("ログインが必要です");
        setIsError(true);
      }
       // URLエンコードされたエラーメッセージをデコードして設定
    }
  }, [router.query]);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);
    setSuccessMessage("");
    setIsEmailError(false);
    setIsPasswordError(false);
        // バリデーションチェック
        if (!email && !password) {
            setIsError(true);
            setIsEmailError(true);
            setIsPasswordError(true);
            setErrorMessage( "メールアドレスとパスワードを入力してください。");
            return
        }

        if (!email) {
            setIsError(true);
            setIsEmailError(true);
            setErrorMessage( "メールアドレスを入力してください。");
            return
        }

        if (!password) {
            setIsError(true);
            setIsPasswordError(true);
            setErrorMessage("パスワードを入力してください。");
            return
          }
      
          // メールアドレスのバリデーションチェック
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setIsError(true);
            setIsEmailError(true);
            setErrorMessage("正しいメールアドレスの形式で入力してください。");
            return;
          }
      
          // パスワードのバリデーションチェック
          if (password.length < 6) {
            setIsError(true);
            setIsPasswordError(true);
            setErrorMessage("パスワードは6文字以上で入力してください。");
            return;
          }





    const data = new FormData(event.currentTarget);
    if (password !== confirmPassword) {
        setIsError(true);
        setErrorMessage("パスワードが一致しません");
        return;
      }
  
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    
    (async () => {

      try {
        const response = await axiosInstance.post("auth", {
          "email": data.get("email"),
          "password": data.get("password"),
          "confirm_success_url":"http://localhost:8000/confirmation_success"
        });
        console.log(response)
        if(response.statusText=='OK'){
          setIsSuccess(true)
          setSuccessMessage("メールアドレスに認証URLをお送りしました。")
        }
      } catch (error) {
        Cookies.remove("user_id");
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        setIsError(true);
        console.log(error);
        if (error.response) {
          
            console.log(error.response.data.errors.full_messages)
          setErrorMessage(error.response.data.errors.full_messages[0]);
        }else{
          setErrorMessage("不明なエラーが発生しました")
        }
      }
    })();
  };

  return (
<Container component="main" maxWidth="xs">
  <Box style={{ margin: "10px" }}>
    <Typography component="h1" variant="h5">
      新規ユーザー登録
    </Typography>
    <Box component="form" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <TextField
        style={{ width: "70%", margin: "5px" }}
        id="email"
        label="メールアドレス"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
        error={isEmailError}
      />
      <TextField
        style={{ width: "70%", margin: "5px auto" }}
        name="password"
        label="パスワード"
        type="password"
        id="password"
        value={password}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        error={isPasswordError}
      />
      <TextField
        style={{ width: "70%", margin: "5px auto" }}
        name="confirmPassword"
        label="パスワードの再入力"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        autoComplete="new-password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={isPasswordError}
      />
      <Button type="submit" variant="contained" sx={{ display: "block", margin: "15px auto" }}>
        ユーザー登録
      </Button>
      <Typography variant="body2" color="textSecondary" align="center">
            アカウントをお持ちの場合は、
            <Link href="/Login" variant="body2">
              ログイン
            </Link>
            してください。
          </Typography>
      {isError && (
        <Alert
          style={{  display: "box", margin: "0 auto",whiteSpace: "normal"  }}
          onClose={() => {
            setIsError(false);
            setErrorMessage("");
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      {(isSuccess && !isError) && (
        <Alert
          
          style={{  display: "box", margin: "0 auto",whiteSpace: "normal"  }}
          onClose={() => {
            setIsSuccess(false);
            setSuccessMessage("");
          }}
          severity="success"
        >
          {successMessage}
        </Alert>
      )}
    </Box>
  </Box>
</Container>
  );
};


export default SignUpForm;



