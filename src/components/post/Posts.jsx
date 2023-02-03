import Post from "./Post";
// import PostDetails from "./PostDetails";
import { useState } from "react";
import { deletePost } from "../../services/posts.service";
import AddPost from "./AddPost";
// import postContext from "../../postContext";

const Posts = ({ posts }) => {
  // const [postDetails, setPostDetails] = useState();
  const [renderdPosts, setRenderedPosts] = useState(posts);
  const [isAddPostShown, setIsAddPostShown] = useState(true);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setRenderedPosts(renderdPosts.filter((post) => post.id !== id));
    } catch (e) {
      console.log("error deleting post");
    }
  };

  return (
    <>
      <div id="container">
        {renderdPosts?.map((post) => {
          // if (index == 0) title= titleConfirmed || "default"
          return (
            <Post
              handleDelete={handleDelete}
              post={post}
              key={post.id}
            />
          );
        })}
      </div>

      {isAddPostShown ? (
        <button
          style={{ margin: "2rem" }}
          onClick={() => setIsAddPostShown(false)}
          type="button"
        >
          Add post
        </button>
      ) : (
        <AddPost handleClose={() => setIsAddPostShown(true)} />
      )}
    </>
  );
};

export default Posts;
