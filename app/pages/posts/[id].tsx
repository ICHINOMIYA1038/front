import Layout from '@/components/Layout';
import React from 'react';
import Pdf from '@/components/Pdf';
import PostCard from '@/components/PostCard';
import PostCardDetail from '@/components/PostCardDetail';
import CommentCard from '@/components/CommentCard';


interface Post {
    post_id: string;
    user_id: string;
    content: string;
  }
  
  interface UserDetailProps {
    post: Post;
  }
  
  const UserDetail: React.FC<UserDetailProps> = ({ post ,comments }) => {
    
    if (!post) {
        return <p>該当はありません</p>;
      }
    return (
      <Layout>
        <PostCardDetail post={post}/>
        {comments && comments.map(comment => (
          <CommentCard key={post.post_id} comment={comment} />
        ))}
      </Layout>  
    );
  };
export async function getServerSideProps(context: { params: any; }) {
    const id=context.params.id
  // APIを使用してユーザーのデータを取得する処理
  const response = await fetch(`http://api:3000/posts/${id}`, { method: 'GET' });
  const data = await response.json();
  const post = data;

  const commentResponse = await fetch(`http://api:3000/posts/${id}/comments/parent`, { method: 'GET' });
  const commentData = await commentResponse.json();
  const comments = commentData;

  return {
    props: {
      post,
      comments,
    },
  };
}

export default UserDetail;