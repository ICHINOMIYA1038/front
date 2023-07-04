import React, { useState } from 'react';
import Card from '../../components/Card'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
import { withAuthServerSideProps } from "@/components/auth";
import { GetServerSideProps } from "next";
import { authUser } from '@/components/authUsers';
import { useRouter } from 'next/router';
import {useEffect} from 'react'


function Home({ result, redirectDestination }: any) {
  
  return (
    <Layout>
    <div className='userscontainer'>
      <div className='mainContainer'>
        <h1>Users</h1>
        <div className="grid-container">
          </div>
      </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {

  const response = await authUser("favo", context);
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

  const result = JSON.parse(response as string)
  console.log(result)
  return {
    props: {
        result:result
    },
  };
};


export default Home;