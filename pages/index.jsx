import { useEffect } from 'react';
import Layout from '../components/layout'
import { useAuth } from '../lib/context';

export default function Home() {
  const {authUser, loading, firebaseSignOut } = useAuth();

  console.log("index: ", authUser);
  return (
    <Layout>
      <h1>hello</h1>
      <p>{authUser ? authUser.uid : "no user"}</p>
      <a href="/register">register</a>
      <br/>
      <a href="/login">login</a>
      <br/>
      <a href="/user">user</a>
      <br/>
      {authUser && !loading && <button onClick={firebaseSignOut}>sign out</button>}
    </Layout>
  )
}
