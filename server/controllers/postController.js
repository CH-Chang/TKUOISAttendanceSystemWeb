exports.getTop5Posts = async (req, res, next) => {
  // 這裡之後要改

  res.status(200).json({
    code: 0,
    msg: "成功",
    data: [
      { title: "實習室管制工讀生錄取名單", time: "2020-07-02", serialNum: 0 },
      {
        title: "電腦維修服務隊工讀生錄取名單",
        time: "2020-07-02",
        serialNum: 1,
      },
      { title: "E313電腦實習室暫停開放公告", time: "2020-03-31", serialNum: 2 },
      { title: "實習室管制工讀生錄取名單", time: "2020-07-02", serialNum: 3 },
      { title: "實習室管制工讀生錄取名單", time: "2020-07-02", serialNum: 4 },
    ],
  });
};
