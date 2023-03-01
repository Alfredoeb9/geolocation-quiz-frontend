import axios from "axios";

export async function getResultData(url, username) {
  console.log(username);
  const data = await axios.post(url, username);
  return data.data;
}

export async function postResultData(url, result) {
  const data = await axios.post(url, result);
  return data.data;
}
