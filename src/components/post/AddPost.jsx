import { addPost } from "../../services/posts.service";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = ({ handleClose , handleRerenderPosts}) => {
  const form = useRef();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    const currentForm = form.current;
    const addedPost = {};
    Object.keys(currentForm)
      .filter((field, idx) => idx < 3)
      .forEach((key) => {
        addedPost[currentForm[key]["name"]] = currentForm[key]["value"];
      });
    try {
      addPost(addedPost);
      handleRerenderPosts(addedPost);
    } catch(e) {
      console.log("Something went wrong")
    }
    navigate("/posts")
    
  };

  return (
    <div>
      <form ref={form} onSubmit={handleAdd}>
        <label htmlFor="title">title</label>
        <input value={form.title} type="text" name="title" id="title" />
        <br />
        <label htmlFor="title">author</label>
        <input type="text" name="author" id="author" />
        <br />
        <label htmlFor="title">content</label>
        <input type="text" name="content" id="content" />
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
