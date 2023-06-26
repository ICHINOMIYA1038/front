import UsersForm from "@/components/UsersForm";
import Layout from '../../components/Layout'
import PostsForm from '@/components/PostsForm'

function Home() {
    return (
      <Layout>
      <div>
        <PostsForm/>
      </div>
      </Layout>
    );
  }

export default Home;