import { AxiosResponse } from "axios";
import axios from "../../axios";

export const getRank = async (param) => {
  console.log("aaaa");
  const res: AxiosResponse<any, any> | any = await axios
    .get(`/api/proxy/${param}`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("error message", e);
      return e;
    });
  return res.data;
};
