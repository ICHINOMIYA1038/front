import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import {useEffect} from "react"
import {signout} from '@/components/auth'
import router from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import SearchLinkButton from './button/SearchLinkButton';
import PostLinkButton from './button/PostLinkButton';
import { createTheme, Snackbar, ThemeProvider } from "@mui/material";
import SigninButton from './button/SignInButton';


//primaryとsecondaryで、色を指定します
const myTheme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#FABFBF",
    },
    accent: {
      main: "#FF9800",
    },
  },
});




export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [image_url,setImageUrl] = React.useState<string>("")


  useEffect(() => {
    if(Cookies.get("user_id")!==undefined){
      setAuth(true)
    }else{
      setAuth(false)
    }

    if(Cookies.get("user_image")!==undefined){
      const url = Cookies.get("user_image")
      setImageUrl(url)
    }
    // クッキーから必要な値を取得するための処理を記述
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }; 

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setAuth(false)
    Cookies.remove("user_id");
    Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
  };

  const linkToSignin = () => {
    router.push('/Login');
  };

  const getCookieValue = (cookieName:string) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
  
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }else{
        return null
      }
    }
  }

return (

<Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={myTheme}>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex',userSelect:'none' }}>
              <img
                src="header.png"
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
                    <Typography>ユーザーID:1</Typography>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        router.push(`/users/profile/${Cookies.get('user_id')}`);
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
      </ThemeProvider>
    </Box>
  );
}