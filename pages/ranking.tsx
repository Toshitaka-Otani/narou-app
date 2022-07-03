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
import React from "react";
import axios from "../axios";
import useSWRImmutable from "swr/immutable";

export default function App(): JSX.Element {
  const nobelType = (end: number, novel_type: number, is_stop: number) => {
    if (is_stop) {
      return { nobel_type: "長期連載停止中", nobel_color: "gray" };
    }
    if (end) {
      return { nobel_type: "連載中", nobel_color: "teal" };
    } else {
      return novel_type === 2
        ? { nobel_type: "短編", nobel_color: "yellow" }
        : { nobel_type: "完結済", nobel_color: "blackAlpha" };
    }
  };

  const nGenreColor = (genre: number) => {
    return genre === (101 || 102)
      ? "pink"
      : genre === (201 || 202)
      ? "cyan"
      : genre === (301 || 302 || 303 || 304 || 305 || 306 || 307)
      ? "orange"
      : genre === (401 || 402 || 403 || 404)
      ? "purple"
      : genre === (9901 || 9902 || 9903 || 9904)
      ? "gray"
      : "blackAlpha";
  };

  const nGenre: { [key: number]: string } = {
    101: "異世界〔恋愛〕",
    102: "現実世界〔恋愛〕",
    201: "ハイファンタジー〔ファンタジー〕",
    202: "ローファンタジー〔ファンタジー〕",
    301: "純文学〔文芸〕",
    302: "ヒューマンドラマ〔文芸〕",
    303: "歴史〔文芸〕",
    304: "推理〔文芸〕",
    305: "ホラー〔文芸〕",
    306: "アクション〔文芸〕",
    307: "コメディー〔文芸〕",
    401: "VRゲーム〔SF〕",
    402: "宇宙〔SF〕",
    403: "空想科学〔SF〕",
    404: "パニック〔SF〕",
    9901: "童話〔その他〕",
    9902: "詩〔その他〕",
    9903: "エッセイ〔その他〕",
    9904: "リプレイ〔その他〕",
    9999: "その他〔その他〕",
    9801: "ノンジャンル〔ノンジャンル〕",
  };

  const bigGenre = ["", "2", "1", "4", "3-99-98"];

  const RankingList = (props: { bg: string }): JSX.Element => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    console.log(props);
    const { data, error } = useSWRImmutable(
      `/api/proxy/novelapi/api?out=json&lim=100&order=monthlypoint&biggenre=${props.bg}`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return data.map((narouData: NarouBook, i: number) => {
      if (i === 0) return <div key={i}></div>;
      const { nobel_color, nobel_type } = nobelType(
        narouData.end,
        narouData.novel_type,
        narouData.isstop
      );
      return (
        <Box key={i} borderWidth="1px" borderRadius="lg" padding="2">
          <HStack>
            <Box display="flex" alignSelf="flex-start" whiteSpace="nowrap">
              {i}位
            </Box>
            <Box>
              <HStack py={1} mb={1}>
                <Badge borderRadius="full" px="2" colorScheme={nobel_color}>
                  {nobel_type}
                  (全{narouData.general_all_no}話)
                </Badge>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={nGenreColor(narouData.genre)}
                >
                  {nGenre[narouData.genre]}
                </Badge>
              </HStack>
              <Link
                href={`https://ncode.syosetu.com/${narouData.ncode}`}
                isExternal
                color={"blue.500"}
                fontWeight="semibold"
              >
                {narouData.title}
              </Link>
              <HStack spacing={8} py={3}>
                <Box fontSize={"sm"} noOfLines={10}>
                  {narouData.story}
                </Box>
              </HStack>
              <Box fontSize={"smaller"} fontFamily="-moz-initial">
                最終投稿日：{narouData.general_lastup}
              </Box>
              <Box fontSize={"smaller"} fontFamily="-moz-initial">
                最終更新日：{narouData.novelupdated_at}
              </Box>
            </Box>
          </HStack>
        </Box>
      );
    });
  };

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>総合</Tab>
          <Tab>ファンタジー</Tab>
          <Tab>恋愛</Tab>
          <Tab>SF</Tab>
          <Tab>その他</Tab>
        </TabList>
        <TabPanels>
          {bigGenre.map((bg, i) => {
            return (
              <TabPanel key={i}>
                <VStack>
                  <RankingList bg={bg} />
                </VStack>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
