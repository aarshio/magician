import axios from "axios";

const API = "https://pioneer-mt65dayzsa-uc.a.run.app/";
// const API = "http://localhost:5000/";

const tradeHistoryAll = () => {
  return axios.get(`${API}trades/history/all`);
};

const universeAll = () => {
  return axios.get(`${API}universe/all`);
};

const getSymbol = (symbol) => {
  return axios.get(`${API}universe/${symbol}`);
};

const addPost = (data) => {
  return axios.post(`${API}post`, data, {
    headers: {
      crossDomain: true,
      "Content-Type": "application/json",
    },
  });
};

const getPostsBySymbol = (symbol) => {
  return axios.get(`${API}posts/${symbol}`);
};

export { tradeHistoryAll, universeAll, getSymbol, addPost, getPostsBySymbol };
