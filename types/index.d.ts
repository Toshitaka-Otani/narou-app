type NarouBook = [
  { all_count: number },
  {
    all_hyoka_cnt: number;
    all_point: number;
    biggenre: number;
    daily_point: number;
    end: number;
    fav_novel_cnt: number;
    general_all_no: number;
    general_firstup: string;
    general_lastup: string;
    genre: number;
    gensaku: string;
    global_point: number;
    impression_cnt: number;
    isbl: number;
    isgl: number;
    isr15: number;
    isstop: number;
    istenni: number;
    istensei: number;
    iszankoku: number;
    kaiwaritu: number;
    keyword: string;
    length: number;
    monthly_point: number;
    ncode: string;
    novel_type: number;
    novelupdated_at: string;
    pc_or_k: number;
    quarter_point: number;
    review_cnt: number;
    sasie_cnt: number;
    story: string;
    time: number;
    title: string;
    updated_at: string;
    userid: number;
    weekly_point: number;
    writer: string;
    yearly_point: number;
  }
];

type Ranking = {
  ncode: string;
  pt: number;
  rank: number;
};