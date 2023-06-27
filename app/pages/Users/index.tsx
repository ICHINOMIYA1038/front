import React from 'react';
import Card from '../../components/Card'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
import { withAuthServerSideProps } from "@/components/auth";
import { GetServerSideProps } from "next";


interface User {
  user_id: string;
  name: string;
  email: string;
}

interface HomeProps {
  users: User[];
}

function Home({ users }: HomeProps) {
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
export const getServerSideProps:GetServerSideProps  = withAuthServerSideProps("users");


export default Home;