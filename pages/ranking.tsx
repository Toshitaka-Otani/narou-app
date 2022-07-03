import { Badge, Box, Container, HStack, Link, VStack } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { readBuilderProgram } from "typescript";
import axios from "../axios";
import { getBookList } from "../repository/api/rank";
import useSWRImmutable from "swr/immutable";

export default function App(): JSX.Element {
  const [monthRank, setMonthRank] = useState<string>("");
  const [rankingDataList, setRankingDataList] = useState<
    (NarouBook | string)[]
  >([]);

  const RankingList = () => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error } = useSWRImmutable(
      `/api/proxy/novelapi/api?out=json&order=monthlypoint&lim=15`,
      fetcher
    );
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return data.map((rd: NarouBook, i: number) => {
      if (i === 0) return <div key={i}></div>;
      return (
        <Box key={i} borderWidth="1px" borderRadius="lg" padding="2">
          <HStack>
            <Box display="flex" alignSelf="flex-start" whiteSpace="nowrap">
              {i}位
            </Box>
            <Box>
              <HStack py={1} mb={1}>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={nobelType(rd.end, rd.novel_type).color}
                >
                  {nobelType(rd.end, rd.novel_type).type}
                  (全{rd.general_all_no}話)
                </Badge>
                {rd.isstop === 1 ? "<長期連載停止中>" : ""}
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme={nGenreColor(rd.genre)}
                >
                  {nGenre[rd.genre]}
                </Badge>
              </HStack>
              <Link
                href={`https://ncode.syosetu.com/${rd.ncode}`}
                isExternal
                color={"blue.500"}
                fontWeight="semibold"
              >
                {rd.title}
              </Link>

              <HStack spacing={8} py={3}>
                <Box fontSize={"sm"} noOfLines={10}>
                  {rd.story}
                </Box>
              </HStack>

              <Box fontSize={"smaller"} fontFamily="-moz-initial">
                最終投稿日：{rd.general_lastup}
              </Box>
              <Box fontSize={"smaller"} fontFamily="-moz-initial">
                最終更新日：{rd.novelupdated_at}
              </Box>
            </Box>
          </HStack>
        </Box>
      );
    });
  };

  const nobelType = (end: number, novel_type: number) => {
    if (end) {
      return { type: "連載中", color: "teal" };
    } else {
      return novel_type === 2
        ? { type: "短編", color: "yellow" }
        : { type: "完結済", color: "blackAlpha" };
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

  return (
    <>
      <Container>
        <VStack>
          <RankingList />
        </VStack>
      </Container>
    </>
  );
}
