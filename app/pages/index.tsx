import Layout from "@/components/Layout/Layout";
import SearchForm from "@/components/search";
import PostCard from "@/components/Post/PostCard";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import NewsList from "@/components/NewsList";
import TopImage from "@/components/Layout/TopImage";

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
}

interface NewsItemProps {
  date: string;
  category: string;
  title: string;
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
      <TopImage />
      <NewsList news={props.news} />
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
    const newsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/news_items`,
      { method: "GET" }
    );
    const news = await newsResponse.json();

    return {
      props: {
        posts: json.posts,
        pagination: json.pagination,
        query: query,
        news: news as NewsItemProps[],
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
