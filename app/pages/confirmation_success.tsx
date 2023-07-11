import UsersForm from "@/components/UsersForm";
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";


function Home() {
  const router = useRouter();
  
    return (
      <Layout>
      <div>
        <p>認証が完了しました。</p>
      </div>
      </Layout>
    );
  }


export default Home;