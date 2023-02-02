import axios from "axios";

export const  getPosts = async (titleConfirmed) => {
  return axios
    .get("http://localhost:8080/api/v1/posts", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    })
    .then((res) => res.data);
}

export const deletePost = async id => {
  return axios
    .delete(`http://localhost:8080/api/v1/posts/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    })
    .then((res) => res.data);
}

export const addPost = async (data) => {
  return axios
    .post(`http://localhost:8080/api/v1/posts`, data)
    .then((res) => res.data);
}
