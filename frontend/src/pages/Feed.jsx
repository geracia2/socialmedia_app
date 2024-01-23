import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [post, setPost] = useState([]);
  let [input, setInput] = useState("");

  function handleChange(event) {
    setInput(event.target.value);
  }

  // first connect,
  // Reuse in CRUD
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        console.log(response);
        setPost(response.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // C in CRUD
  async function addToList() {
    let post = { text: input };
    try {
      const response = await axios.post("/posts", post);

      setPost([...post, response.data]);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
    {post.map((post, i)=>(
      <Fragment key={post._id}>
      </Fragment>
    ))}
      <section>Feed</section>
    </>
  );
}

export default Feed;
