import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { getBookList } from "../repository/api/rank";

export default function Main(): JSX.Element {
  const [monthRank, setMonthRank] = useState<string>("");
  const [rankingDataList, setRankingDataList] = useState<
    (NarouBook | string)[]
  >([]);

  useEffect(() => {
    const d = new Date();
    const strYear = String(d.getFullYear());
    const month = d.getMonth() + 1;
    const strMonth = month < 10 ? "0" + String(month) : String(month);
    setMonthRank(strYear + strMonth + "01-m");
  }, []);

  const bookList = useMemo(async () => {
    try {
      const response: string | (NarouBook | string)[] = await getBookList(
        `rank/rankget/?out=json&rtype=${monthRank}`
      );
      if (Array.isArray(response)) {
        setRankingDataList(response);
      }
    } catch (e) {
      console.log(e);
    }
  }, [monthRank]);

  return (
    <>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>更新された作品</Tab>
          <Tab onClick={() => bookList}>なろうランキング</Tab>
          <Tab>作品検索</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>登録された作品の更新日をここにいれるよ</p>
          </TabPanel>
          <TabPanel>
            <p>なろうのランキングをここにだして面白そうなものを読むよ</p>
            {rankingDataList.map((rd, i) => {
              return (
                <div key={i}>
                  {Array.isArray(rd) ? (
                    <Box>{rd[1].title}</Box>
                  ) : (
                    <Box>タイトルを取得できませんでした</Box>
                  )}
                </div>
              );
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
