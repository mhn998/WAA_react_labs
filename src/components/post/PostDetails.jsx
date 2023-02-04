import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../services/posts.service";

const PostDetails = ({ handleDelete, setIsShowPostDetails }) => {
  const { id } = useParams();
  const [post, setPost] = useState();

  const fetchPost = useCallback(async () => {
    const post = await getPost(id);
    setPost(post);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [id, fetchPost]);

  return (
    <div style={{ width: "8rem", margin: "0 auto" }}>
      <div>
        <h2>{post?.title}</h2>
        <h2>{post?.author}</h2>
        <p>{post?.content}</p>
      </div>
      <button type="button">edit</button>
      <button
        onClick={() => {
          // handleDelete(id);
          setIsShowPostDetails(false);
        }}
        type="click"
      >
        delete
      </button>
    </div>
  );
};

export default PostDetails;
