// lib/auth.tsx

import { GetServerSideProps } from "next";
import Cookies from "js-cookie";

export const auth= async (context: { req: any; res: any; }) =>{
    const { req, res } = context;

    const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/auth/validate_token`, {
      headers: {
        "Content-Type": "application/json",
        uid: Cookies.get("uid"),
        client: Cookies.get("client"),
        "access-token": Cookies.get("access-token"),
      },
    });
    if (!response.ok && response.status === 401) {
      return new Promise<Boolean>((resolve) => {
        resolve(false);
      });
      };
    
    if (response.status === 500) {
      return new Promise<Boolean>((resolve) => {
        resolve(false);
      });
    }
    else{
      return new Promise<Boolean>((resolve) => {
        resolve(true);
      });
    }
  };

  export const signout=async(context: { req: any; res: any; }) =>{
    const { req, res } = context;
    const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/auth/sign_out`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
   })
  }