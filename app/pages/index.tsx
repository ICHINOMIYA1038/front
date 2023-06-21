import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
}


//Homeコンポーネント
const Home: React.FC<HomeProps> = (props) => {
  return (
    <div>
      <h2>POSTの一覧</h2>
      <table>
      <tbody>
        {props.posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}.</td>
            <td>{post.content}</td>
            <td>これはテスト</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await fetch('http://api:3000/posts', { method: 'GET' });
    const json = await response.json();

    return {
      props: {
        posts: json,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Home;