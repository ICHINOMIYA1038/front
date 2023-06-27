
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';

interface Post {
post_id: number;
  content: string;
  user_id: string;
}

interface HomeProps {
  posts: Post[];
}


// 仮想的なデータを使用してユーザーIDリストを生成する関数
async function fetchUserIds() {
    // 仮想的なデータソースからユーザーIDリストを取得する
    const response = await fetch('http://api:3000/users'); // データを取得するエンドポイントを適切に変更する
    if (!response.ok) {
      throw new Error('Failed to fetch user IDs');
    }
  
    const data = await response.json();
  
    // レスポンスデータからユーザーIDリストを抽出して返す
    return data.map((user:any) => user.user_id);
  }
  
export async function getStaticPaths() {
    // データソースからユーザーのIDリストを取得する（例：APIリクエスト、データベースクエリなど）
    const userIds = await fetchUserIds(); // ユーザーIDのリストを取得する関数を仮定
  
    const paths = userIds.map((id) => ({
      params: { id: id.toString() },
    }));
  
    return {
      paths,
      fallback: false, // or 'blocking' or 'true' depending on your requirements
    };
  }


//Homeコンポーネント
const Home: React.FC<HomeProps> = (props:any) => {
  return (
    <Layout>
      <h2>{props.user_id}</h2>
      <table>
      <tbody>
        {props.posts.map((post) => (
          <tr key={post.post_id}>
            <td>{post.post_id}</td>
            <td>{post.content}</td>
            <td>{post.user_id}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  );
};

export const getStaticProps = async (context: { params: any; }) => {
  try {
    const id = context.params.id
    const response = await fetch(`http://api:3000/users/${id}/posts`, { method: 'GET' });
    const json = await response.json();

    return {
      props: {
        posts: json,
        user_id:id
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