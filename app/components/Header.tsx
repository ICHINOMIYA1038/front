import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Cookies from "js-cookie";
import {useEffect} from "react"
import router from 'next/router';
import SearchLinkButton from './button/SearchLinkButton';
import PostLinkButton from './button/PostLinkButton';
import { createTheme, ThemeProvider } from "@mui/material";
import SigninButton from './button/SignInButton';

//primaryとsecondaryで、色を指定します

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [image_url,setImageUrl] = React.useState<string|undefined>("")
  const [user_id,setUserId] = React.useState<string|undefined>("")

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (Cookies.get("uid")) {
    headers["uid"] = Cookies.get("uid")|| "";
  }
  
  if (Cookies.get("client")) {
    headers["client"] = Cookies.get("client")|| "";
  }
  
  if (Cookies.get("access-token")) {
    headers["access-token"] = Cookies.get("access-token")|| "";
  }
  useEffect(() => {
    // Fetch the data from the API
    fetch(`${process.env.NEXT_PUBLIC_RAILS_API}/current_user`,{
      headers})
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Ok" && data.user) {
          // User data exists, update the state with image_url and user_id
          setImageUrl(data.user.image_url);
          setUserId(data.user.user_id);
          setAuth(true); // Set auth to true to show the authenticated user components
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);




  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }; 

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setAuth(false)
    Cookies.remove("user_image");
    Cookies.remove("user_id");
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
  };


return (

<Box sx={{ flexGrow: 1 }}>
      
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex',userSelect:'none' }}>
              <img
                src="/header.png"
                loading="eager"
                alt=""  
                height="50px"
                onClick={() => {
                  router.push('/');
                }}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none', // 選択不可に設定
                }}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <PostLinkButton  func={() => {
                  router.push(`/posts/new`);
                }}/>
              <SearchLinkButton func={() => {
                  router.push(`/`);
                }}/>

              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {image_url === '' && <AccountCircle />}
                    {image_url !== '' && <img src={image_url} width="35px" height="35px" />}
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Typography style={{textAlign:"center"}}>ユーザーID:{user_id}</Typography>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push(`/users/profile/${user_id}`);
                      }}
                    >
                      プロフィール
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push(`/users/favorites`);
                      }}
                    >
                      お気に入り
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push(`/posts/new`);
                      }}
                    >
                      投稿する
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push(`/users/setting`);
                      }}
                    >
                      設定
                    </MenuItem>
                    <MenuItem onClick={Logout}>ログアウト</MenuItem>
                  </Menu>
                </div>
              )}
              {!auth && (
                <SigninButton  func={() => {
                  router.push(`/Login`);
                }}/>
              )}
            </div>
          </Toolbar>
        </AppBar>
    </Box>
  );
}