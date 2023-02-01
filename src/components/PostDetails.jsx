const PostDetails = ({postDetails}) => {

  const {title, author, description} = postDetails;

  return (
    <div style={{ width: "8rem", margin: "0 auto" }}>
      <div>
        <h2>{title}</h2>
        <h2>{author}</h2>
        <p>{description}</p>
      </div>
      <button type="click">edit</button>
      <button type="click">delete</button>
    </div>
  );
};

export default PostDetails;
