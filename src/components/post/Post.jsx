import { useContext, useState } from "react";
import postContext from "../../postContext";
import PostDetails from "./PostDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import userContext from "../../authContext";

const Post = ({ post, handleDelete }) => {
  const { id, title, author} = post;
  const navigate = useNavigate();
  const { setShownPost } = useContext(postContext);
  const [isShowPostDetails, setIsShowPostDetails] = useState(false);

  // const {user} = useContext(userContext);

  return (
    <>
      <div className="sub_container">
        <h3>{id}</h3>
        <h3>{title}</h3>
        <h3>{author}</h3>
        <button onClick={(e) => {
          e.preventDefault();
          setShownPost(post);
          setIsShowPostDetails(!isShowPostDetails);
          navigate(`/posts/${id}`);
        } } type="button">
          show details
        </button>
      </div>
      <div>
        {isShowPostDetails && (
          <PostDetails setIsShowPostDetails={setIsShowPostDetails} handleDelete={handleDelete} /*postDetails={shownPost}*/ />
        )}
      </div>
    </>
  );
};

export default Post;
