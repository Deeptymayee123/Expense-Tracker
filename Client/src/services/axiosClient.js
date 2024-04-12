import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user')) || null;

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user ? user?.token : null}`,
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    console.error(`Looks like there was a problem. Status Code: ${res.status}`);
    return Promise.reject(error);
  }
);
