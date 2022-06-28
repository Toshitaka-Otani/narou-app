import {
  Badge,
  Box,
  Container,
  HStack,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { SimpleSidebar } from "../components/Drawer";
import { getBookList } from "../repository/api/rank";

export default function App(): JSX.Element {
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

  const nobelType = (end: number, novel_type: number) => {
    if (end) {
      return { type: "連載中", color: "teal" };
    } else {
      return novel_type === 2
        ? { type: "短編", color: "yellow" }
        : { type: "完結済", color: "blackAlpha" };
    }
  };

  const nGenre = (genre: number) => {
    return genre === 101
      ? { type: "異世界〔恋愛〕", color: "pink" }
      : genre === 102
      ? { type: "現実世界〔恋愛〕", color: "pink" }
      : genre === 201
      ? { type: "ハイファンタジー〔ファンタジー〕", color: "cyan" }
      : genre === 202
      ? { type: "ローファンタジー〔ファンタジー〕", color: "cyan" }
      : genre === 301
      ? { type: "純文学〔文芸〕", color: "orange" }
      : genre === 302
      ? { type: "ヒューマンドラマ〔文芸〕", color: "orange" }
      : genre === 303
      ? { type: "歴史〔文芸〕", color: "orange" }
      : genre === 304
      ? { type: "推理〔文芸〕", color: "orange" }
      : genre === 305
      ? { type: "ホラー〔文芸〕", color: "orange" }
      : genre === 306
      ? { type: "アクション〔文芸〕", color: "orange" }
      : genre === 307
      ? { type: "コメディー〔文芸〕", color: "orange" }
      : genre === 401
      ? { type: "VRゲーム〔SF〕", color: "purple" }
      : genre === 402
      ? { type: "宇宙〔SF〕", color: "purple" }
      : genre === 403
      ? { type: "空想科学〔SF〕", color: "purple" }
      : genre === 404
      ? { type: "パニック〔SF〕", color: "purple" }
      : genre === 9901
      ? { type: "童話〔その他〕", color: "gray" }
      : genre === 9902
      ? { type: "詩〔その他〕", color: "gray" }
      : genre === 9903
      ? { type: "エッセイ〔その他〕", color: "gray" }
      : genre === 9904
      ? { type: "リプレイ〔その他〕", color: "gray" }
      : genre === 9999
      ? { type: "その他〔その他〕", color: "blackAlpha" }
      : { type: "ノンジャンル〔ノンジャンル〕", color: "blackAlpha" };
  };

  return (
    <>
    <SimpleSidebar>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>更新された作品</Tab>
          <Tab onClick={() => bookList}>なろうランキング</Tab>
          <Tab>作品検索</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>登録された作品の更新日をここにいれるよ</p>
            <p>※未実装</p>
            
          </TabPanel>
          <TabPanel>
            <Container>
              <VStack>
                {rankingDataList.map((rd, i) => {
                  return (
                    <Box
                      key={i}
                      borderWidth="1px"
                      borderRadius="lg"
                      padding="2"
                    >
                      <HStack>
                        <Box
                          display="flex"
                          alignSelf="flex-start"
                          whiteSpace="nowrap"
                        >
                          {i + 1}位
                        </Box>
                        {Array.isArray(rd) ? (
                          <Box>
                            <HStack py={1} mb={1}>
                              <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme={
                                  nobelType(rd[1].end, rd[1].novel_type).color
                                }
                              >
                                {nobelType(rd[1].end, rd[1].novel_type).type}
                                (全{rd[1].general_all_no}話)
                              </Badge>
                              {rd[1].isstop === 1 ? "<長期連載停止中>" : ""}
                              <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme={nGenre(rd[1].genre).color}
                              >
                                {nGenre(rd[1].genre).type}
                              </Badge>
                            </HStack>
                            <Link
                              href={`https://ncode.syosetu.com/${rd[1].ncode}`}
                              isExternal
                              color={"blue.500"}
                              fontWeight="semibold"
                            >
                              {rd[1].title}
                            </Link>

                            <HStack spacing={8} py={3}>
                              <Box fontSize={"sm"} noOfLines={10}>
                                {rd[1].story}
                              </Box>
                            </HStack>

                            <Box fontSize={"smaller"} fontFamily="-moz-initial">
                              最終投稿日：{rd[1].general_lastup}
                            </Box>
                            <Box fontSize={"smaller"} fontFamily="-moz-initial">
                              最終更新日：{rd[1].novelupdated_at}
                            </Box>
                          </Box>
                        ) : (
                          <>
                            <Box>タイトルを取得できませんでした</Box>
                          </>
                        )}
                      </HStack>
                    </Box>
                  );
                })}
              </VStack>
            </Container>
          </TabPanel>
          <TabPanel>
            <p>作品の検索をするよ</p>
            <p>※未実装</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </SimpleSidebar>
    </>
  );
}
