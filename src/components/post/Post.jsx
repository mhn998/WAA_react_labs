const Post = ({ id, title, author, handle , index }) => {

  return (
    <div className="sub_container">
      <h3>{id}</h3>
      <h3>{title}</h3>
      <h3>{author}</h3>
      <button onClick={() => handle(index)} type="button">show details</button>
    </div>
  );
};

export default Post;
