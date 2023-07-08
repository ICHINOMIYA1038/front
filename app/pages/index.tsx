import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';
import SearchForm from '@/components/search';
import PostCard from '@/components/PostCard';

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
    <Layout>
      <SearchForm/>
      {props.posts.slice(0, 10).map(post => (
   < PostCard key={post.post_id} post={post} />
    ))}
    </Layout>
  );
};

export const getServerSideProps = async ({query}) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`http://api:3000/search?${queryString}`, { method: 'GET' });
    const json = await response.json();
    
    console.log(json)
    return {
      props: {
        posts: json.data,
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