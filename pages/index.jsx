import Layout from '../components/layout'
import { useAuth } from '../lib/context';

export default function Home() {
  const {authUser} = useAuth();
  console.log("index: ", authUser);
  return (
    <Layout>
      <h1>hello</h1>
      <p>{authUser ? authUser.uid : "no user"}</p>
      <a href="/register">register</a>
    </Layout>
  )
}
