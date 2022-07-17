import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  HStack,
  Spinner,
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
import { BookData } from "../components/BookData";
import { apiUrl } from "../const";

export default function Ranking(): JSX.Element {
  const tabCategoryParam = [
    { category: "総合", param: "" },
    { category: "異世界転移・転生", param: "&istt=1" },
    { category: "ファンタジー", param: "&biggenre=2" },
    { category: "恋愛", param: "&biggenre=1" },
    { category: "その他", param: "&biggenre=3-4-99-98" },
  ];

  type props = {
    param: string;
  };

  const RankingList = ({ param }: props): JSX.Element => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error } = useSWRImmutable(
      `${apiUrl}&order=monthlypoint${param}`,
      fetcher
    );
    if (error)
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>データの取得に失敗しました。</AlertTitle>
          <AlertDescription>ページを更新してください。</AlertDescription>
        </Alert>
      );
    if (!data)
      return (
        <Center>
          <Spinner
            thickness="4px"
            speed="1s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <div>loading...</div>
        </Center>
      );
    return data.map((narouData: NarouBookData, i: number) => {
      if (i === 0) return <div key={i}></div>;
      return (
        <Box key={i} borderWidth="1px" borderRadius="lg" p="2">
          <HStack>
            <Box display="flex" alignSelf="flex-start" whiteSpace="nowrap">
              {i}位
            </Box>
            <BookData narouData={narouData} />
          </HStack>
        </Box>
      );
    });
  };

  return (
    <Center>
      <Box maxW={{ base: "full", md: "container.sm" }}>
        <Tabs isFitted variant="enclosed">
          <TabList>
            {tabCategoryParam.map((cp, i) => {
              return (
                <Box key={i}>
                  <Tab>{cp.category}</Tab>
                </Box>
              );
            })}
          </TabList>
          <TabPanels>
            {tabCategoryParam.map((cp, i) => {
              return (
                <TabPanel key={i}>
                  <VStack>
                    <RankingList param={cp.param} />
                  </VStack>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
