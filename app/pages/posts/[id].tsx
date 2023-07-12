import Layout from '@/components/Layout';
import React from 'react';
import Pdf from '@/components/Pdf';
import PostCard from '@/components/PostCard';
import PostCardDetail from '@/components/PostCardDetail';


interface Post {
    post_id: string;
    user_id: string;
    content: string;
  }
  
  interface UserDetailProps {
    post: Post;
  }
  
  const UserDetail: React.FC<UserDetailProps> = ({ post }) => {
    
    if (!post) {
        return <p>該当はありません</p>;
      }
    return (
      <Layout>
        <PostCardDetail post={post}/>
      </Layout>  
    );
  };
export async function getServerSideProps(context: { params: any; }) {
    const id=context.params.id
  // APIを使用してユーザーのデータを取得する処理
  const response = await fetch(`http://api:3000/posts/${id}`, { method: 'GET' });
  const data = await response.json();
  const post = data;
  console.log(data);

  return {
    props: {
      post,
    },
  };
}

export default UserDetail;