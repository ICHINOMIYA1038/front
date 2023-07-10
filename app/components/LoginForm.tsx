import React, { useState, FormEvent,useEffect } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next';


const LoginForm: React.FC = (props:any) => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    const data = new FormData(event.currentTarget);
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    
    (async () => {
      setIsError(false);
      setErrorMessage("");
      try {
        const response = await axiosInstance.post("auth/sign_in", {
          email: data.get("email"),
          password: data.get("password"),
        });
        Cookies.set("user_id",response.data.data.user_id , { expires: 7 });
        Cookies.set("uid", response.headers["uid"] , { expires: 7 });
        Cookies.set("client", response.headers["client"] , { expires: 7 });
        Cookies.set("access-token", response.headers["access-token"], { expires: 7 }) ;
        

        const usersAxiosInstance = axios.create({
          baseURL: `http://localhost:3000/`,
          headers: {
            "content-type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        });
        const userResponse = await usersAxiosInstance.get(`users/${response.data.data.user_id}`);
        const userImage = userResponse.data.image_url; 
        Cookies.set("user_image", userImage);
        
        router.push(`/users/profile/${response.data.data.user_id}`);
      } catch (error) {
        Cookies.remove("user_id");
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        setIsError(true);
        if (error) {
          console.log(error);
          setErrorMessage(error.message);
        }
      }
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box style={{margin:"50px"}}>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit} style={{textAlign:"center"}}>
          <TextField
            style={{width:"70%" ,margin:"5px"}}
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            style={{width:"70%" ,margin:"5px auto"}}
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" sx={{ display:"block",margin:"15px auto"}}>
            ログイン
          </Button>
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
        </Box>
      </Box>
    </Container>
  );
};


export default LoginForm;



