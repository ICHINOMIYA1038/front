import React, { useState, FormEvent } from "react";
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

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });

    setIsError(false);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post("auth/sign_in", {
        email: data.get("email"),
        password: data.get("password"),
      });

      // Set tokens in cookies
      Cookies.set("uid", response.headers["uid"]);
      Cookies.set("client", response.headers["client"]);
      Cookies.set("access-token", response.headers["access-token"]);
      console.log(response.headers)
      console.log(response.headers["access-token"])
      router.push("/");
    } catch (error) {
      // Remove tokens from cookies
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");

      setIsError(true);
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
          </Button>
          {isError && (
            <Alert
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

