import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';

interface Post {
  post_id: number;
  content: string;
  user_id: string;
  title:string,
  synopsis:string,
  catchphrase:string,
  number_of_men:string,
  number_of_women:string,
  total_number_of_people:string,
  playtime:string,
  image_url:string,
  file_url:string,


}

interface HomeProps {
  posts: Post[];
}


//Homeコンポーネント
const Home: React.FC<HomeProps> = (props) => {
  return (
    <Layout>
      <h2>POSTの一覧</h2>
      <div className="grid-container">
        {props.posts.map(post => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
      

    </Layout>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await fetch('http://api:3000/posts', { method: 'GET' });
    const json = await response.json();

    return {
      props: {
        posts: json
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