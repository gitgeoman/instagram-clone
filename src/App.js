import { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";

import db from "./firebase";
import { collection, getDoc, onSnapshot, setDoc } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/240px-Instagram_logo.svg.png"
          alt="instagram_logo"
        />
      </div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default App;
