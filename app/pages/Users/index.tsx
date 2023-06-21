import React from 'react';

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
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>
            <p>id:{user.user_id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
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