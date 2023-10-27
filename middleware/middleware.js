const {ResponseTemplate} = require("../helper/template.helper");

function PrintSuccess(req, res, next) {
  const {} = req.params.id;
  console.log(`Berhasil akses`);
  next();
}

function PrintSuccessRoute(req, res, next) {
  console.log(`Berhasil akses lewat route level`);
  next();
}

function CheckPostReq(req, res, next) {
  if (req.body.name == undefined || req.body.address == undefined) {
    let respErr = ResponseTemplate(
      null,
      "Invalid request",
      new Error("invalid request"),
      400
    );
    res.json(respErr);
  }
  next();
}

module.exports = {
  PrintSuccess,
  PrintSuccessRoute,
  CheckPostReq,
};
