import Layout from '../components/layout'
import { useAuth } from '../lib/context';

import Header from '../components/Header';

// home page
export default function Home() {
  const {authUser, loading, firebaseSignOut } = useAuth();

  console.log("index: ", authUser);
  return (
    <Layout>
      <Header />
    </Layout>
  )
}
