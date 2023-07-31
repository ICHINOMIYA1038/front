import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchForm from '@/components/search';
import PostCard from '@/components/PostCard';
import { useRouter } from 'next/router';
import { Pagination } from '@mui/material';

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
  pagination: {
    total_pages: number;
    current_page: number;
    limit_value: number;
  };
}

const Home: React.FC<HomeProps> = (props: any) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [per, setPer] = useState(1);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<any>({});

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
    const searchParams = { ...props.query };
    searchParams.page = newPage;
    searchParams.per = props.pagination.limit_value;
    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/?${queryString}`);
  };

  return (
    <Layout>
      <SearchForm />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination
              count={pagination.total_pages} // 総ページ数
              color="primary" // ページネーションの色
              onChange={handlePageChange}
              page={pagination.current_page} // 現在のページ番号
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  try {
    const page = query.page || 1;
    const per = query.per || 8;
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAILS_API}/search`,
      { method: 'GET' }
    );
    const json = await response.json();

    return {
      props: {
        posts: json.posts,
        pagination: json.pagination,
        query: query,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
        pagination: { total_pages: 0, current_page: 0, limit_value: 0 },
      },
    };
  }
};

export default Home;
