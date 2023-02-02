import Post from "./Post";
import PostDetails from "./PostDetails";
import { useState } from "react";
import { deletePost } from "../../services/posts.service";
import AddPost from "./AddPost";

const Posts = ({ posts }) => {
  const [isShowPostDetails, setIsShowPostDetails] = useState(false);
  const [postDetails, setPostDetails] = useState();
  const [renderdPosts, setRenderedPosts] = useState(posts);
  const [isAddPostShown, setIsAddPostShown] = useState(true);

  const handleShowDetails = (id) => {
    setPostDetails(posts[id]);
    setIsShowPostDetails(!isShowPostDetails);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setRenderedPosts(renderdPosts.filter(post => post.id !== id));
    }catch (e) {
        console.log("error deleting post")
    }
  
  }

  return (
    <>
      <div id="container">
        {renderdPosts?.map(({ id, title, author }, index) => {
          // if (index == 0) title= titleConfirmed || "default"
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
        {isShowPostDetails && <PostDetails handleDelete={handleDelete} postDetails={postDetails} />}
      </div>

      {isAddPostShown ? <button onClick={() => setIsAddPostShown(false)} type="button">Add post</button> : <AddPost handleClose={() => setIsAddPostShown(true)}/> }
    
    </>
  );
};

export default Posts;
