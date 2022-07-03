import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Box,
  HStack,
  Container,
  Input,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import axios from "../axios";
import React from "react";
import { BookData } from "../components/BookData";
import useSWRImmutable from "swr/immutable";

export default function Search(): JSX.Element {
  const handleChange = (event: { target: { value: string } }) =>
    console.log(event.target.value, "aaaa");
  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const RankingList = (): JSX.Element => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error } = useSWRImmutable(
      `/api/proxy/novelapi/api?out=json&lim=20&of=t-n-u-w-s-bg-g-gl-nt-ga-e-i-iti-mp-nu`,
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
            <BookData narouData={narouData} />
          </HStack>
        </Box>
      );
    });
  };

  return (
    <>
      <Input onChange={handleChange} placeholder="Basic usage" />
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
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          タイトル
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          あらすじ
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[2]}
          onChange={(e) => setCheckedItems([checkedItems[2], e.target.checked])}
        >
          キーワード
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[3]}
          onChange={(e) => setCheckedItems([checkedItems[3], e.target.checked])}
        >
          作者名
        </Checkbox>
      </Stack>
      <Container>
        <RankingList />
      </Container>
    </>
  );
}
