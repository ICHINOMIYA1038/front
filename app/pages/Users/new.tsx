import UserRegistrationForm from "@/components/UserRegistrationForm";
import bodyParser from "body-parser";
import { promisify } from "util";


interface User {
    name: string;
    email: string;
  }
  
  interface HomeProps {
    users: User[];
  }

function Home({ users }: HomeProps) {
    return (
      <div>
        <UserRegistrationForm/>
      </div>
    );
  }

  const getBody = promisify(bodyParser.urlencoded());

  export async function getServerSideProps({ req, res }:any) {
    
    if (req.method === "POST") {
        await getBody(req, res);
      
    
    const url = 'http://api:3000/users'; // 実際のURLに置き換える
      const userData:HomeProps = req.body.user
      
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
  }
  return {
    props: {
      // ページコンポーネントに渡すデータ
    }
  };
}

export default Home;