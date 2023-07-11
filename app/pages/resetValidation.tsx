import UsersForm from "@/components/UsersForm";
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import ResendToken from "@/components/resendToken";


function Home() {
  const router = useRouter();
  
    return (
      <Layout>
      <div>
        <ResendToken />
      </div>
      </Layout>
    );
  }


export default Home;