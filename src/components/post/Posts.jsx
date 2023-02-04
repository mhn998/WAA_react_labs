import Post from "./Post";
// import PostDetails from "./PostDetails";
import { useContext, useEffect, useState } from "react";
import { deletePost } from "../../services/posts.service";
import AddPost from "./AddPost";
// import postContext from "../../postContext";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts.service";
import userContext from "../../authContext";

const Posts = () => {
  // const [postDetails, setPostDetails] = useState();
  // const [renderdPosts, setRenderedPosts] = useState([]);
  const [isAddPostShown, setIsAddPostShown] = useState(true);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.log("error deleting post");
    }
  };

  const handleRerenderPosts = (post) => {
    const allPosts = posts;
    allPosts.push(post);
    console.log(allPosts, "all")
    setPosts(allPosts);
  };

  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <>
      <div id="container">
        {posts?.map((post) => {
          // if (index == 0) title= titleConfirmed || "default"
          return <Post handleDelete={handleDelete} post={post} key={post.id} />;
        })}
      </div>

      {isAddPostShown ? (
        <button
          style={{ margin: "2rem" }}
          onClick={() => {
            setIsAddPostShown(false);
            navigate("/posts/add");
          }}
          type="button"
        >
          Add post
        </button>
      ) : (
        <AddPost
          handleClose={() => {
            setIsAddPostShown(true);
          }}
          handleAdd={handleRerenderPosts}
        />
      )}
    </>
  );
};

export default Posts;
