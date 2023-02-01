import React from "react";
import "./Dashboard.css";
import Posts from "./Posts";
import { useState } from "react";
import { getPosts } from "../services/posts.service";
import ChangeNameForm from "./ChangeNameForm";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [titleConfirmed, setTitleConfirmed] = useState();

  const posts = getPosts(titleConfirmed);

  const handleSubmit = (e) => {
    setTitleConfirmed(title);
    e.preventDefault();
  };

  return (
    <>
      <Posts posts={posts} titleConfirmed={titleConfirmed} />
      <ChangeNameForm handleTitle={setTitle} handleSubmit={handleSubmit} />
        <br />
        <button style={{ margin: "0.2rem 3.6rem" }} type="submit">
          Change Name
        </button>
    </>
  );
};

export default Dashboard;
