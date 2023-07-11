import UsersForm from "@/components/UsersForm";
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import ResendToken from "@/components/resendToken";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import PasswordRemakeForm from "@/components/PasswordRemakeForm";


function Home() {
  const router = useRouter();
  
    return (
      <Layout>
      <div>
        <PasswordRemakeForm />
      </div>
      </Layout>
    );
  }


export default Home;