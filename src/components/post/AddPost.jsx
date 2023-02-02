import { addPost } from "../../services/posts.service";
import { useState } from "react";

const AddPost = ({ handleClose }) => {
  const [post, setPost] = useState({});

  const handleAdd = (e) => {
    e.preventDefault();
    addPost(post);
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <label htmlFor="title">title</label>
        <input
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          name="title"
          id="title"
        />
        <br />
        <label htmlFor="title">author</label>
        <input
          onChange={(e) => setPost({ ...post, author: e.target.value })}
          type="text"
          name="author"
          id="author"
        />
        <br />
        <label htmlFor="title">content</label>
        <input
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          type="text"
          name="content"
          id="content"
        />
        <br />
        <button type="submit">submit</button>
      </form>
      <button onClick={handleClose} type="button">
        close
      </button>
    </div>
  );
};

export default AddPost;
