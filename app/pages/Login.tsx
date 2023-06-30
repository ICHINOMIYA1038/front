import UsersForm from "@/components/UsersForm";
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'

function Home(referer) {
    return (
      <Layout>
      <div>
        <LoginForm referer={referer}/>
      </div>
      </Layout>
    );
  }

  export async function  getServerSideProps({req}){
    console.log(req.headers)
    // ctx の中に遷移元の情報がある
    const referer = req.headers.referer // https://ドメイン/...
    console.log(`ref:${referer}`)
    if(referer!=null)
    {
    return {
      props: {
          referer : referer
      },
    };
    }
    else 
    return {
      props: {
        referer : null
    }
    }
  };    
  

export default Home;