import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGNjZTA1ZDc3NDE1NzZmMGNlODljNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDU5NDIyMywiZXhwIjoxNjcwODUzNDIzfQ.XVtymeycniKvWiWP0XL8huepxb3C0KzIOGS_Qetkh2Q'

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