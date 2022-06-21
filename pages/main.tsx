import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getBookData, getRank } from "../repository/api/rank";

export default function Main(): JSX.Element {
  const [monthRank, setMonthRank] = useState<string>("");
  const [res, setRes] = useState<r[]>([]);
  const [boolList, setBookList] = useState<[]>([])

  useEffect(() => {
    const d = new Date();
    const strYear = String(d.getFullYear());
    const month = d.getMonth() + 1;
    const strMonth = month < 10 ? "0" + String(month) : String(month);
    setMonthRank(strYear + strMonth + "01-m");
  }, []);

  type r = {
    ncode: string;
    pt: number;
    rank: number;
  };

  const apiUrl = {
    rankApi: 'rank/rankget/?out=json&rtype=',
    bookApi: 'novelapi/api?out=json&ncode='
  }

  const getRankList = async () => {
    try {
      const response = await getRank(apiUrl.rankApi + monthRank);
      typeof response === "string"
        ? console.error("main.tsx:29", response)
        : setRes(response.flatMap((r: r) => (r.rank <= 2 ? r : [])));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Todo: 型指定
    try {
      setBookList(res.map((r) => {
        getBookData(apiUrl.bookApi + r.ncode);
      }))

    } finally {
      console.log("finally");
    }
  }, [res]);

  return (
    <>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>更新された作品</Tab>
          <Tab onClick={() => getRankList()}>なろうランキング</Tab>
          <Tab>作品検索</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>登録された作品の更新日をここにいれるよ</p>
          </TabPanel>
          <TabPanel>
            <p>なろうのランキングをここにだして面白そうなものを読むよ</p>
            {res.map((r: r, i) => {
              return <Box key={i}>{r.ncode}</Box>;
            })}
          </TabPanel>
          <TabPanel>
            <p>作品の検索をするよ</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
