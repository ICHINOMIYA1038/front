import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    name: string
  }

  interface User {
    name: string;
    email: string;
  }
  
  interface HomeProps {
    users: User[];
  }


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    if (req.method === 'POST') {
        console.log("postが実行されました。")
        console.log(req.body)
        const url = 'http://api:3000/users'; // 実際のURLに置き換える
        const userData:HomeProps = req.body.content
        
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(response => response.json()).then(data => {
        
          console.log(data); // レスポンスのデータを表示
        })
        .catch(error => {
          console.error(error);
        });
        res.status(200).json(req.body)
      } else {
          console.log("getです")
          res.status(200).json({ name: 'Get' })
      }
   

      return {
        redirect: {
          destination: '../users/index', // リダイレクト先のパスを指定
          permanent: false, // trueに設定すると永久的なリダイレクトになります
        },
      };
  }
  