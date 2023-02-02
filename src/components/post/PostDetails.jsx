const PostDetails = ({postDetails, handleDelete}) => {

  const {title, author, content, id} = postDetails;

  return (
    <div style={{ width: "8rem", margin: "0 auto" }}>
      <div>
        <h2>{title}</h2>
        <h2>{author}</h2>
        <p>{content}</p>
      </div>
      <button type="button" >edit</button>
      <button onClick={() => handleDelete(id)} type="click">delete</button>
    </div>
  );
};

export default PostDetails;
