import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { getRank } from "../repository/api/rank";

export default function Main(): JSX.Element {
  const [monthRank, setMonthRank] = useState<string>("");
  const [res, setRes] = useState([""]);

  useEffect(() => {
    const d = new Date();
    const strYear = String(d.getFullYear());
    const strMonth = () => {
      const month = d.getMonth() + 1;
      return d.getMonth() + 1 < 10 ? "0" + String(month) : String(month);
    };
    setMonthRank(strYear + strMonth() + "01-m");
  }, []);

  const getRankList = async () => {
    try {
      const response = await getRank(
        `rank/rankget/?out=json&rtype=${monthRank}`
      );
      console.log(
        "front",
        response.filter((r) => r.rank <= 50)
      );
      setRes(response.filter((r) => r.rank <= 50));
    } catch (e) {
      console.log(e);
    }
  };

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
            {res.map((r) => {
              return <>{r.ncode}</>;
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
