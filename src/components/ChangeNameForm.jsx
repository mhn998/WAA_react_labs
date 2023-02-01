const ChangeNameForm = ({setTitle, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem" , padding:"2rem" }}>
      <label htmlFor="title">Title</label>
      <input
        style={{ marginLeft: "0.8rem" }}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        type="text"
        id="title"
      ></input>
    </form>
  );
};


export default ChangeNameForm;