import React, { useState } from 'react';
import Card from '../../components/Card'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
import { withAuthServerSideProps } from "@/components/auth";
import { GetServerSideProps } from "next";
import { authUser } from '@/components/authUsers';
import { useRouter } from 'next/router';
import {useEffect} from 'react'

interface User {
  user_id: string;
  name: string;
  email: string;
}

interface HomeProps {
  users: User[];
  redirectDestination?: string;
}

function Home({ users, redirectDestination }: HomeProps) {
  
  return (
    <Layout>
    <div className='userscontainer'>
      <div className='mainContainer'>
        <h1>Users</h1>
        <ul>
        <div className="grid-container">
            {users.map(user => (
              <Card key={user.user_id} user={user} />
            ))}
          </div>
        </ul>
      </div>
      <div className='side'>
      <Sidebar/> 
      </div>
    </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log(`ログ}`)
  const response = await authUser("users", context);
  function isRedirect(response: any): response is { redirect: { destination: string; permanent: boolean } } {
    return response && typeof response === "object" && "redirect" in response;
  }

  if(isRedirect(response)){

    return {
      redirect: {
        permanent: false, // 永続的なリダイレクトかどうか
        destination: '/Login', // リダイレクト先
        // destination: 'https://example.com/' // 別サイトでも指定可能
      },
  }
  }

  const users = JSON.parse(response as string) as User[];
  console.log(`ログ${users}`)
  return {
    props: {
      users:users,
      redirectDestination: null
    },
  };
};


export default Home;