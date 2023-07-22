import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";

export const authUser = async (url: string, context: GetServerSidePropsContext) => {
  const { req } = context;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("uid", Cookies.get("uid") || "");
  headers.append("client", Cookies.get("client") || "");
  headers.append("access-token", Cookies.get("access-token") || "");

  try {
    const response = await fetch(`http://localhost:3000/${url}`, {
      headers: headers,
    });

    console.log(response)

    if (!response.ok) {
      // ログインに失敗した場合
      return {
        redirect: { 
          destination: "/Login",
          permanent: false,
        },
      };
    }

    // ログインに成功した場合
    const data = await response.json();
    const result = JSON.stringify(data)

    
    return result;
  } catch (error) {
    // エラーが発生した場合
    return null;
  }
};