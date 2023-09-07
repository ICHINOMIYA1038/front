import Layout from "@/components/Layout/Layout";
import SearchForm from "@/components/search";
import PostCard from "@/components/Post/PostCard";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import NewsList from "@/components/NewsList";
import TopImage from "@/components/Layout/TopImage";
import Guide from "@/components/Guide";
import { useState } from "react";
import SortComponent from "@/components/SortComponent";

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
  const [sort_by, setSortBy] = useState(0);
  const [sortDirection, setSortDirection] = useState(0);

  const handlePageChange = (event: any, newPage: any) => {
    const searchParams = props.query; // 既存のクエリパラメータをコピー

    searchParams.page = newPage; // ページを更新
    searchParams.per = props.pagination.limit_value; // 1ページあたりの件数を維持（もしくは新しい値に更新）

    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/?${queryString}`);
  };

  const handleSortChange = (sortByValue: any, sortDirectionValue: any) => {
    setSortBy(sortByValue);
    setSortDirection(sortDirectionValue);
  };

  return (
    <Layout>
      <TopImage />
      <NewsList news={props.news} />
      <div className="lg:flex">
        <div className="mx-10 mt-28 lg:sticky lg:top-24 lg:w-1/2 lg:h-192">
          <SearchForm sort_by={sort_by} sortDirection={sortDirection} />
          <SortComponent
            sort_by={sort_by}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mx-10 mt-5">
          <div className="hidden lg:block">
          <SortComponent
            sort_by={sort_by}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
          </div>
          {props.posts.map((post: { post_id: any }) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      </div>


      <div className="justify-center my-10 flex">
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
        posts: json.posts || [],
        pagination: json.pagination || [],
        query: query || [],
        news: news as NewsItemProps[] || [],
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
