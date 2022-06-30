import axios from "../../axios";

export const getBookList = async (
  param: string
): Promise<string | (string | NarouBook)[]> => {
  const res: [] | string = await axios
    .get(`/api/proxy/${param}`)
    .then((res) => {
      return res.data;
    })
    .catch((e: string) => {
      console.log("error message", e);
      return e;
    });
  if (Array.isArray(res)) {
    const list = res.flatMap((rankData: Ranking) =>
      rankData.rank <= 10 ? rankData : []
    );
    const response: (NarouBook | string)[] = await Promise.all(
      list.map(async (r) => {
        const t = await getBookData(r);
        return t;
      })
    );
    return response;
  } else {
    return res;
  }
};

export const getBookData = async (
  rankData: Ranking
): Promise<string | NarouBook> => {
  return await axios
    .get(`/api/proxy/novelapi/api?out=json&ncode=${rankData.ncode}`)
    .then((res) => {
      const narou: NarouBook = res.data;
      return narou;
    })
    .catch((e: string) => {
      console.log("returnApiError", e);
      return e;
    });
};
