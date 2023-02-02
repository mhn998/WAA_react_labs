import React from "react";
import "./Dashboard.css";
import Posts from "../components/post/Posts";
import { useState, useEffect, useMemo } from "react";
import { getPosts } from "../services/posts.service";
// import ChangeNameForm from "./ChangeNameForm";
import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment/moment";
import jwt from "jsonwebtoken";
import { refreshTokenApi } from "../services/auth.service";

const Dashboard = () => {
  // const [title, setTitle] = useState("");
  // const [titleConfirmed, setTitleConfirmed] = useState();
  const [user, setUser] = useState({ loggedIn: false });
  // const [id, setId] = useState();
  const cookie = useMemo(() => new Cookies(), []);
  const [posts, setPosts] = useState([]);

  // const posts = getPosts(titleConfirmed);

  // const handleSubmit = (e) => {
  //   setTitleConfirmed(title);
  //   e.preventDefault();
  // };

  useEffect(() => {
    const { accessToken, refreshToken, timer, id, email } =
      cookie.get("at-auth") || "";
    const decode = jwt.decode(accessToken);

    console.log(accessToken)

    if (!decode) {
      // logout
      setUser({ loggedIn: false });
      cookie.remove("at-auth", {
        path: "/",
        // domain: config.domain,
        secure: true,
      });
      window.location.href = `/`;
    }

    if (accessToken) {
      setUser({
        loggedIn: true,
        userData: { ...decode, accessToken, id, email },
      });
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      });
    } else window.location.href = `/`;

    if (moment().isAfter(timer)) {
      refreshTokenApi(refreshToken, accessToken, setUser);
    }
  }, [user.loggedIn, cookie]);

  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleLogOut = () => {
    cookie.remove("at-auth", {
      path: "/",
      // domain: config.domain,
      secure: true,
    });
    window.location.href = "/login";
  };

  return (
    <>
      <button type="submit" onClick={handleLogOut}>
        Log out
      </button>
      {posts.length ? <Posts posts={posts} /> : ""}
      {/* <ChangeNameForm handleTitle={setTitle} handleSubmit={handleSubmit} /> */}
      <br />
      
    </>
  );
};

export default Dashboard;
