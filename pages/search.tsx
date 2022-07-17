import { Box, Input, Stack, Text, Button, useToast } from "@chakra-ui/react";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { BookData } from "../components/BookData";

export default function Search(): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const [books, setBooks] = useState<NarouBookData[]>([]);
  const [errorToastMessage, setErrorToastMessage] = useState(undefined);
  const toast = useToast();

  const handleChange = (event: { target: { value: string } }) =>
    setSearchText(event.target.value);

  const handleClick = () => {
    if (!searchText) {
      setErrorToastMessage("条件を入力してください。");
    } else {
      axios
        .get(
          `/api/proxy/novelapi/api?out=json&lim=20&of=t-n-u-w-s-bg-g-gl-nt-ga-e-i-iti-mp-nu&word=${searchText}`
        )
        .then((r) => {
          setBooks(r.data);
        })
        .catch(() => {
          setErrorToastMessage("データの取得に失敗しました。");
        });
    }
  };

  const handleKeyPress = () => {
    handleClick();
  };

  useEffect(() => {
    if (errorToastMessage) {
      toast({
        title: errorToastMessage,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [errorToastMessage, toast]);

  const rankingList = (): JSX.Element[] | JSX.Element => {
    if (!books.length) return <Box>検索結果はこちらに表示されます。</Box>;
    if (!books[0].allcount) return <Box>該当の作品がありません</Box>;
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
              <Input
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleKeyPress();
                  }
                }}
                placeholder="転生　勇者"
              />
              <Text fontSize="xs">
                複数条件で検索する場合はスペースで区切ってください。
              </Text>
            </Box>
            <Button onClick={handleClick}>検索</Button>
          </Stack>
        </Box>
        <Box
          justifyContent={{ md: "center" }}
          w={{ base: "full", md: "container.sm" }}
        >
          {rankingList()}
        </Box>
      </Box>
    </>
  );
}
