const axios = require("axios");

exports.getPracticeStatus = async (req, res, next) => {
  try {
    let response = await axios.get("https://tkuipcedu.tku.edu.tw/TKU_iLife");

    if (response.status === 200) {
      let infos = response.data
        .split("<span")[1]
        .split("</span>")[0]
        .split('id="Label1">')[1]
        .split("<br>");

      let data = [];
      for (let i = 0; i < infos.length - 1; i++) {
        let info = infos[i].split(",");
        data.push({
          room: info[0],
          total: Number(info[1]),
          available: Number(info[2]),
          msg: info[3],
        });
      }
      res.status(200).json({
        code: 0,
        msg: "成功",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      msg: "伺服器發生錯誤",
    });
  }
};
