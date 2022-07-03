import {
  Box,
  Container,
  HStack,
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

export default function App(): JSX.Element {
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
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
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
