import axios from "../../axios";

export const getRank = async (param) => {
  console.log("aaaa");
  const res: [] | string = await axios
    .get(`/api/proxy/${param}`)
    .then((res) => {
      return res.data;
    })
    .catch((e: string) => {
      console.log("error message", e);
      return e;
    });
  return res;
};

export const getBookData = async (param) => {
  const r = await axios.get(`/api/proxy/${param}`);
  console.log(r.data);
};
