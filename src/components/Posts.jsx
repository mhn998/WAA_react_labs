import Post from "./Post";
import PostDetails from "./PostDetails";
import { useState } from "react";

const Posts = ({ posts }) => {
  const [isShowPostDetails, setIsShowPostDetails] = useState(false);
  const [postDetails, setPostDetails] = useState();

  const handleShowDetails = (id) => {
    setPostDetails(posts[id]);
    setIsShowPostDetails(!isShowPostDetails);
  };

  return (
    <>
      <div id="container">
        {posts.map(({ id, title, author }, index) => {
          return (
            <Post
              handle={handleShowDetails}
              key={id}
              id={id}
              title={title}
              author={author}
              index={index}
            />
          );
        })}
      </div>
      <div>
        {isShowPostDetails && <PostDetails postDetails={postDetails} />}
      </div>
    </>
  );
};

export default Posts;
