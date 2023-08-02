import React ,{useState} from 'react';
import Layout from '@/components/Layout';
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem ,
  Select,
  Snackbar,
  Grid
} from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next';
import Link from 'next/link'

function Home() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };
  
    const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGroup(e.target.value);
    };
  
    const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setWebsite(e.target.value);
    };
  
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocation(e.target.value);
    };
  
    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBio(e.target.value);
    };
  
    const validateForm = () => {
      const errors:Record<string, string> = {};
  
      if (!name.trim()) {
        errors.name = '名前は必須です';
      }

      if (name.length>10) {
        errors.name = '名前は10文字以内にしてください。';
      }
  
      setErrors(errors);
  
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (validateForm()) {
        const payload = {
          name: name,
          group: group,
          website: website,
          location: location,
          bio: bio,
        };

        const headers= {
            "Content-Type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
        }
  
        axios
          .post(`${process.env.NEXT_PUBLIC_RAILS_API}/setting`, payload,{headers})
          .then((response:any) => {
            // 送信成功時の処理
            setSubmitSuccess(true);
            setName('');
            setGroup('');
            setWebsite('');
            setLocation('');
            setBio('');
            router.reload();
          })
          .catch((error:any) => {
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
          <h2>プロフィール編集</h2>
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
                  label="所属団体など"
                  value={group}
                  onChange={handleGroupChange}
                  error={Boolean(errors.group)}
                  helperText={errors.group}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="ウェブサイト"
                  value={website}
                  onChange={handleWebsiteChange}
                  error={Boolean(errors.website)}
                  helperText={errors.website}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="場所"
                  value={location}
                  onChange={handleLocationChange}
                  error={Boolean(errors.location)}
                  helperText={errors.location}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="紹介文"
                  multiline
                  rows={4}
                  value={bio}
                  onChange={handleBioChange}
                  error={Boolean(errors.bio)}
                  helperText={errors.bio}
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