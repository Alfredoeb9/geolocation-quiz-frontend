import axios from "axios";

export async function getResultData(url) {
  const data = await axios.get(url);
  return data.data;
}

export async function postResultData(url, result) {
  const data = await axios.post(url, result);
  return data.data;
}
