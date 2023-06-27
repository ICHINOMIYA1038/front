import UsersForm from "@/components/UsersForm";
import Layout from '@/components/Layout'
import LoginForm from '@/components/LoginForm'

function Home() {
    return (
      <Layout>
      <div>
        <LoginForm/>
      </div>
      </Layout>
    );
  }

export default Home;