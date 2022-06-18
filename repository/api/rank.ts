import { AxiosResponse } from "axios";
import axios from "../../axios";

export const getRank = async () => {
  console.log("aaaa");
  const res: AxiosResponse<any, any> | any = await axios
    .get(`/api/proxy/[...all]`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("error message", e);
      return e;
    });
  return res.data;
};
