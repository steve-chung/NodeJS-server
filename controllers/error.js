exports.get404 = (req, res, next) => {
  res.sendStaus(404)
};

// exports.get500 = (req, res, next) => {
//   res.sendStaus(500)
// }

// exports.errorHandle = (res, errorCode) => {
//   switch (errorCode) {
//     case 400:
//       return res.sendStaus(400)
//     case 500:
//       return res.sendStaus(500)
//     de
//   }
// }