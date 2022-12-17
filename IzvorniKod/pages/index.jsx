import { useEffect } from 'react';
import Layout from '../components/layout'
import { useAuth } from '../lib/context';

import PlacanjeForm from '../components/forms/PlacanjeForm';

// home page
export default function Home() {
  const {authUser, loading, firebaseSignOut } = useAuth();

  console.log("index: ", authUser);
  return (
    <Layout>
      <h1>hello</h1>
      <p>{authUser ? authUser.uid : "no user"}</p>
      <p>{authUser ? "verified: " + authUser.verified : "no user"}</p>
      <a href="/register">register</a>
      <br/>
      <a href="/login">login</a>
      <br/>
      <a href="/userInfo">user info</a>
      <br/>
      {authUser && !loading && <button onClick={firebaseSignOut}>sign out</button>}

      <br/>
      <PlacanjeForm/>
    </Layout>
  )
}
