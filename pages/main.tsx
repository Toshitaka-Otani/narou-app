import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { getRank } from "../repository/api/rank";

export default function Main(): JSX.Element {
  const [res, setRes] = useState<AxiosResponse<any, any> | any>("");
  const getRankList = async () => {
    try {
      const response = await getRank();
      console.log("front", response);
      setRes(response);
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
            {res}
          </TabPanel>
          <TabPanel>
            <p>作品の検索をするよ</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
