import UserRegistrationForm from "@/components/UserRegistrationForm";
import Layout from '../../components/Layout'

function Home() {
    return (
      <Layout>
      <div>
        <UserRegistrationForm/>
      </div>
      </Layout>
    );
  }

export default Home;