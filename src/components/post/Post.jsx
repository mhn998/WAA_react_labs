import { useContext, useState } from "react";
import postContext from "../../postContext";
import PostDetails from "./PostDetails";

const Post = ({ post, handleDelete }) => {

  const { id, title, author} = post;

  const { shownPost, setShownPost } = useContext(postContext);
  const [isShowPostDetails, setIsShowPostDetails] = useState(false);

  return (
    <>
      <div className="sub_container">
        <h3>{id}</h3>
        <h3>{title}</h3>
        <h3>{author}</h3>
        <button onClick={() => {
          setShownPost(post);
          setIsShowPostDetails(!isShowPostDetails);
        } } type="button">
          show details
        </button>
      </div>
      <div>
        {isShowPostDetails && (
          <PostDetails setIsShowPostDetails={setIsShowPostDetails} handleDelete={handleDelete} postDetails={shownPost} />
        )}
      </div>
    </>
  );
};

export default Post;
