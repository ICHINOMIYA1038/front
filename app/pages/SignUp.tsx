import UsersForm from "@/components/UsersForm";
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import SignUpForm from "@/components/SignUpForm";


function Home() {
  const router = useRouter();
  
    return (
      <Layout>
      <div>
        <SignUpForm />
      </div>
      </Layout>
    );
  }


export default Home;