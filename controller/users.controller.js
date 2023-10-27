const {ResponseTemplate} = require("../helper/template.helper");

function TestUser(req, res) {
  let resp = ResponseTemplate(null, "success", null, 200);
  res.json(resp);
}

function TestUserPost(req, res) {
  console.log(req.query.name);
  let objResp = {
    name: req.body.name,
    address: req.body.address,
  };
  let resp = ResponseTemplate(objResp, "success", null, 200);
  res.json(resp);
}

module.exports = {
  TestUser,
  TestUserPost,
};
