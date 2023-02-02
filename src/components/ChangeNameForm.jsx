const ChangeNameForm = ({handleTitle, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem" , padding:"2rem" }}>
      <label htmlFor="title">Title</label>
      <input
        style={{ marginLeft: "0.8rem" }}
        onChange={(e) => handleTitle(e.target.value)}
        name="title"
        type="text"
        id="title"
      ></input>
      <button style={{ margin: "0.2rem 3.6rem" }} type="submit">
        Change Name
      </button>
    </form>
  );
};


export default ChangeNameForm;