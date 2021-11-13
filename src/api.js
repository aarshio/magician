import axios from "axios";

const API = "https://pioneer-mt65dayzsa-uc.a.run.app/";
// const API = "http://localhost:5000/";

const tradeHistoryAll = () => {
  return axios.get(`${API}trades/history/all`);
};

export { tradeHistoryAll };
