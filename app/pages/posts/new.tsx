import Layout from "@/components/Layout/Layout";
import PostsForm from "@/components/Form/PostsForm";
import Cookies from "js-cookie";
import { useEffect } from "react";
import router from "next/router";

function Home() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (Cookies.get("uid")) {
    headers["uid"] = Cookies.get("uid") || "";
  }

  if (Cookies.get("client")) {
    headers["client"] = Cookies.get("client") || "";
  }

  if (Cookies.get("access-token")) {
    headers["access-token"] = Cookies.get("access-token") || "";
  }
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_RAILS_API}/current_user`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ng") {
          //Loginにリダイレクト
          router.push("/Login");
        } else {
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Layout>
      <div>
        <PostsForm />
      </div>
    </Layout>
  );
}

export default Home;
