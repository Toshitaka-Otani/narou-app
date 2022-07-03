import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

export default function App(): JSX.Element {
  return (
    <>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>更新された作品</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>登録された作品の更新日をここにいれるよ</p>
            <p>※未実装</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
