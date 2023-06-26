import React from 'react';
import Card from '../../components/Card'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';

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
          {users.map(user => (
            <Card key={user.user_id} user={user}  />
          ))}
        </ul>
      </div>
      <div className='side'>
      <Sidebar/> 
      </div>
    </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('http://api:3000/users');
    const data = await response.json();
    const users: User[] = data || [];

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        users: [],
      },
    };
  }
}

export default Home;