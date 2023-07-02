// lib/auth.tsx

import { GetServerSideProps } from "next";

export const auth= async (context) =>{
    const { req, res } = context;

    const response = await fetch(`http://api:3000/api/v1/auth/validate_token`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
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

  export const signout=async(context) =>{
    const { req, res } = context;
    const response = await fetch(`http://api:3000/api/v1/auth/sign_out`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
   })
  }