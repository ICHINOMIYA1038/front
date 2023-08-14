import Layout from "@/components/Layout";
import SearchForm from "@/components/search";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
}

//Homeコンポーネント
const Home: React.FC<HomeProps> = (props: any) => {
  const router = useRouter();

  const handlePageChange = (event: any, newPage: any) => {
    const searchParams = props.query; // 既存のクエリパラメータをコピー

    searchParams.page = newPage; // ページを更新
    searchParams.per = props.pagination.limit_value; // 1ページあたりの件数を維持（もしくは新しい値に更新）

    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/?${queryString}`);
  };

  return (
    <Layout>
      <SearchForm />
      {props.posts.map((post: { post_id: any }) => (
        <PostCard key={post.post_id} post={post} />
      ))}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={props.pagination.total_pages} //総ページ数
          color="primary" //ページネーションの色
          onChange={handlePageChange}
          page={props.pagination.current_page} //現在のページ番号
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  try {
    const page = query.page || 1;
    const per = query.per || 8;
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/search?${queryString}&paged=${page}&per=${per}`,
      { method: "GET" }
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
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Home;
