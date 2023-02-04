import "./App.css";
import Dashboard from "./views/Dashboard";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import LandingPage from "./views/LandingPage";
import Header from "./components/Header";
import userContext from "./authContext";
import { useEffect, useMemo, useState } from "react";
import AddPost from "./components/post/AddPost";
import PostDetails from "./components/post/PostDetails";
import Posts from "./components/post/Posts";
import Cookies from "universal-cookie";
import jwt from 'jsonwebtoken'
import axios from "axios";
import moment from "moment";
import { refreshTokenApi } from "./services/auth.service";

function App() {
  const [user, setUser] = useState();
  const cookie = useMemo(() => new Cookies(), []);
  // const location = useLocation();

  useEffect(() => {
    const { accessToken, refreshToken, timer, id, email } =
      cookie.get("at-auth") || "";
    const decode = jwt.decode(accessToken);

    console.log(accessToken);

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
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      // window.scrollTo(0, 0);
    } else window.location.href = `/`;

    if (moment().isAfter(timer)) {
      refreshTokenApi(refreshToken, accessToken, setUser);
    }
  }, [user?.loggedIn, cookie, setUser]);

  const handleLogOut = () => {
    cookie.remove("at-auth", {
      path: "/",
      // domain: config.domain,
      secure: true,
    });
    window.location.href = "/login";
  };

  // useEffect(() => {
  //   axios.defaults.headers.common.Authorization = `Bearer ${user.userData.accessToken}`;
  //   window.scrollTo(0, 0);
  // }, [location, user.userData.accessToken]);

  const value = {
    user,
    setUser,
  };

  return (
    <userContext.Provider value={value}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/add" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
