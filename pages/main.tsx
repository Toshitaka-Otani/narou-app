import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

export default function Main(): JSX.Element {
  return (
    <>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>更新された作品</Tab>
          <Tab>なろうランキング</Tab>
          <Tab>作品検索</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>登録された作品の更新日をここにいれるよ</p>
          </TabPanel>
          <TabPanel>
            <p>なろうのランキングをここにだして面白そうなものを読むよ</p>
          </TabPanel>
          <TabPanel>
            <p>作品の検索をするよ</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
