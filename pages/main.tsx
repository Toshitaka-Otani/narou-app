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

  const bookType = (end: number, novel_type: number) => {
    if (end) {
      return "連載中";
    } else {
      return novel_type === 2 ? "短編" : "完結済";
    }
  };

  const nGenre = (genre: number) => {
    return genre === 101
      ? "異世界〔恋愛〕"
      : genre === 102
      ? "現実世界〔恋愛〕"
      : genre === 201
      ? "ハイファンタジー〔ファンタジー〕"
      : genre === 202
      ? "ローファンタジー〔ファンタジー〕"
      : genre === 301
      ? "純文学〔文芸〕"
      : genre === 302
      ? "ヒューマンドラマ〔文芸〕"
      : genre === 303
      ? "歴史〔文芸〕"
      : genre === 304
      ? "推理〔文芸〕"
      : genre === 305
      ? "ホラー〔文芸〕"
      : genre === 306
      ? "アクション〔文芸〕"
      : genre === 307
      ? "コメディー〔文芸〕"
      : genre === 401
      ? "VRゲーム〔SF〕"
      : genre === 402
      ? "宇宙〔SF〕"
      : genre === 403
      ? "空想科学〔SF〕"
      : genre === 404
      ? "パニック〔SF〕"
      : genre === 9901
      ? "童話〔その他〕"
      : genre === 9902
      ? "詩〔その他〕"
      : genre === 9903
      ? "エッセイ〔その他〕"
      : genre === 9904
      ? "リプレイ〔その他〕"
      : genre === 9999
      ? "その他〔その他〕"
      : "ノンジャンル〔ノンジャンル〕";
  };

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
                      borderRadius={"lg"}
                      padding={"2"}
                    >
                      {Array.isArray(rd) ? (
                        <>
                          <HStack>
                            <Box>{i + 1}位</Box>
                            <Box>
                              <Badge
                                borderRadius="full"
                                px="2"
                                colorScheme="teal"
                              >
                                {bookType(rd[1].end, rd[1].novel_type)}
                              </Badge>
                              {rd[1].isstop === 1 ? "<長期連載停止中>" : ""}
                            </Box>
                          </HStack>

                          <Link
                            href={`https://ncode.syosetu.com/${rd[1].ncode}`}
                            isExternal
                            color={"blue.500"}
                            fontWeight="semibold"
                          >
                            {rd[1].title}
                          </Link>

                          <HStack spacing={8}>
                            <Box>全{rd[1].general_all_no}話</Box>
                            <Box fontSize={"sm"} noOfLines={10}>
                              {rd[1].story}
                            </Box>
                          </HStack>
                          <Box>{nGenre(rd[1].genre)}</Box>
                          <Box fontSize={"smaller"} fontFamily="-moz-initial">
                            最終投稿日：{rd[1].general_lastup}
                          </Box>
                          <Box fontSize={"smaller"} fontFamily="-moz-initial">
                            最終更新日：{rd[1].novelupdated_at}
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box>ランキング：{i + 1}</Box>
                          <Box>タイトルを取得できませんでした</Box>
                        </>
                      )}
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
    </>
  );
}
