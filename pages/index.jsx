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
      <a href="/login">login</a>
      <a href="/user">user</a>
      {authUser && !loading && <button onClick={firebaseSignOut}>sign out</button>}
    </Layout>
  )
}
