import Layout from '@/components/Layout';
import SearchForm from '@/components/search';
import PostCard from '@/components/PostCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Pagination, CircularProgress } from '@mui/material';

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
  const [loading, setLoading] = useState(true);

  const handlePageChange = (event: any, newPage: number) => {
    const searchParams = { ...props.query };
    searchParams.page = newPage;
    searchParams.per = props.pagination.limit_value;
    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/?${queryString}`);
  };

  useEffect(() => {
    setLoading(false); // 仮に、この例では即座にデータが取得されたものとする
  }, []);

  return (
    <Layout>
      <SearchForm />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {props.posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination
              count={props.pagination.total_pages} // 総ページ数
              color="primary" // ページネーションの色
              onChange={handlePageChange}
              page={props.pagination.current_page} // 現在のページ番号
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;