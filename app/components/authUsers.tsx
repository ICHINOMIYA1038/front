import { GetServerSidePropsContext } from "next";

export const authUser = async (url: string, context: GetServerSidePropsContext) => {
  const { req } = context;

  try {
    const response = await fetch(`http://api:3000/${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
    });

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