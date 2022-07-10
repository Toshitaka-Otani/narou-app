import { Box, HStack, Badge, Link, Text } from "@chakra-ui/react";
import React from "react";

const nGenre: { [key: number]: { genre: string; color: string } } = {
  101: { genre: "異世界〔恋愛〕", color: "pink" },
  102: { genre: "現実世界〔恋愛〕", color: "pink" },
  201: { genre: "ハイファンタジー〔ファンタジー〕", color: "cyan" },
  202: { genre: "ローファンタジー〔ファンタジー〕", color: "cyan" },
  301: { genre: "純文学〔文芸〕", color: "orange" },
  302: { genre: "ヒューマンドラマ〔文芸〕", color: "orange" },
  303: { genre: "歴史〔文芸〕", color: "orange" },
  304: { genre: "推理〔文芸〕", color: "orange" },
  305: { genre: "ホラー〔文芸〕", color: "orange" },
  306: { genre: "アクション〔文芸〕", color: "orange" },
  307: { genre: "コメディー〔文芸〕", color: "orange" },
  401: { genre: "VRゲーム〔SF〕", color: "purple" },
  402: { genre: "宇宙〔SF〕", color: "purple" },
  403: { genre: "空想科学〔SF〕", color: "purple" },
  404: { genre: "パニック〔SF〕", color: "purple" },
  9901: { genre: "童話〔その他〕", color: "gray" },
  9902: { genre: "詩〔その他〕", color: "gray" },
  9903: { genre: "エッセイ〔その他〕", color: "gray" },
  9904: { genre: "リプレイ〔その他〕", color: "gray" },
  9999: { genre: "その他〔その他〕", color: "blackAlpha" },
  9801: { genre: "ノンジャンル〔ノンジャンル〕", color: "blackAlpha" },
};

type props = {
  narouData: NarouBookData;
};

export const BookData = ({ narouData }: props): JSX.Element => {
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

  const { nobel_color, nobel_type } = nobelType(
    narouData.end,
    narouData.novel_type,
    narouData.isstop
  );

  return (
    <Box>
      <HStack py={1} mb={1}>
        <Badge borderRadius="full" px="2" colorScheme={nobel_color}>
          {nobel_type}
          (全{narouData.general_all_no}話)
        </Badge>
        <Badge
          borderRadius="full"
          px="2"
          colorScheme={nGenre[narouData.genre].color}
        >
          {nGenre[narouData.genre].genre}
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
      <Box pt="2" fontSize="smaller" fontWeight="semibold">
        作者：
        {
          <Link
            href={`https://mypage.syosetu.com/${narouData.userid}`}
            isExternal
            color={"blue.500"}
          >
            {narouData.writer}
          </Link>
        }
      </Box>
      <Box spacing={8} py={3}>
        <Text
          whiteSpace="unset"
          wordBreak="break-all"
          fontSize={"sm"}
          noOfLines={10}
        >
          {narouData.story}
        </Text>
      </Box>
      <Box fontSize={"smaller"} fontFamily="-moz-initial">
        最終投稿日：{narouData.general_lastup}
      </Box>
      <Box fontSize={"smaller"} fontFamily="-moz-initial">
        最終更新日：{narouData.novelupdated_at}
      </Box>
    </Box>
  );
};
