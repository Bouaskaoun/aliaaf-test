import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY2MGFiOWM3ZTMxN2MyYTFiN2FiZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDg5MjA4MiwiZXhwIjoxNjcxMTUxMjgyfQ.Z-8kIeJ8JJTeo9WR4Y2ux7rIC2GB2fyaWIakSpKDzF0'

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'token': `Bearer ${TOKEN}`
  }
});