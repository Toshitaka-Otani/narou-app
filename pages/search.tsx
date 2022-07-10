import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Box,
  Input,
  Stack,
  Center,
  Text,
} from "@chakra-ui/react";
import axios from "../axios";
import React, { useState } from "react";
import { BookData } from "../components/BookData";
import useSWR from "swr";

export default function Search(): JSX.Element {
  // const [checkedItems, setCheckedItems] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  // const allChecked = checkedItems.every(Boolean);
  // const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  // const searchCategory = ["タイトル", "あらすじ", "キーワード", "作者名"];

  const handleChange = (event: { target: { value: string } }) =>
    setSearchText(event.target.value);

  const useSearch = () => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error } = useSWR(
      `/api/proxy/novelapi/api?out=json&lim=20&of=t-n-u-w-s-bg-g-gl-nt-ga-e-i-iti-mp-nu&word=${searchText}`,
      fetcher
    );
    return {
      books: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  // const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   let updateList = [...checkedItems];
  //   if (event.target.checked) {
  //     updateList = [...checkedItems, event.target.checked];
  //   } else {
  //     updateList.splice(checkedItems.indexOf(event.target.checked));
  //   }
  //   console.log(updateList);
  //   setCheckedItems(updateList);
  // };

  const RankingList = (): JSX.Element => {
    const { books, isLoading, isError } = useSearch();
    if (isError)
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>データの取得に失敗しました。</AlertTitle>
          <AlertDescription>ページを更新してください。</AlertDescription>
        </Alert>
      );
    if (isLoading)
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
    return books.map((narouData: NarouBookData, i: number) => {
      if (i === 0) return <div key={i}></div>;
      return (
        <Box key={i} borderWidth="1px" borderRadius="lg" p="2">
          <BookData narouData={narouData} />
        </Box>
      );
    });
  };

  return (
    <>
      <Box display={{ md: "flex" }}>
        <Box mb={{ base: 50 }}>
          <Stack direction="row" spacing={4} mb={5} mr={{ md: 8 }}>
            <Box>
              <Input onChange={handleChange} placeholder="転生　勇者" />
              <Text fontSize="xs">
                複数条件で検索する場合はスペースで区切ってください。
              </Text>
            </Box>
            {/* <Button
              onClick={() => {
                mutate(
                  `/api/proxy/novelapi/api?out=json&lim=20&of=t-n-u-w-s-bg-g-gl-nt-ga-e-i-iti-mp-nu&word=${searchText}`
                );
              }}
            >
              検索
            </Button> */}
          </Stack>
          {/* <Text>検索条件を選択してください</Text>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
              ])
            }
          >
            すべて選択
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {searchCategory.map((category, i) => {
              console.log("aaa");
              return (
                <Checkbox
                  key={i}
                  isChecked={checkedItems[i]}
                  onChange={handleCheck}
                >
                  {category}
                </Checkbox>
              );
            })}

            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) => {
                setCheckedItems([checkedItems[0], e.target.checked]);
              }}
            >
              タイトル
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[1], e.target.checked])
              }
            >
              あらすじ
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[2]}
              onChange={(e) =>
                setCheckedItems([checkedItems[2], e.target.checked])
              }
            >
              キーワード
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[3]}
              onChange={(e) =>
                setCheckedItems([checkedItems[3], e.target.checked])
              }
            >
              作者名
            </Checkbox>
          </Stack> */}
        </Box>
        <Box
          justifyContent={{ md: "center" }}
          w={{ base: "full", md: "container.sm" }}
        >
          <RankingList />
        </Box>
      </Box>
    </>
  );
}
