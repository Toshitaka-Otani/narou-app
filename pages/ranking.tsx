import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
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
      `/api/proxy/novelapi/api?out=json&lim=100&order=monthlypoint${param}&of=t-n-u-w-s-bg-g-gl-nt-ga-e-i-iti-mp-nu`,
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
        <div>
          <Spinner
            thickness="4px"
            speed="1s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <div>loading...</div>
        </div>
      );
    return data.map((narouData: NarouBookData, i: number) => {
      if (i === 0) return <div key={i}></div>;
      return (
        <Box key={i} borderWidth="1px" borderRadius="lg" padding="2">
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
    <Container>
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
    </Container>
  );
}
