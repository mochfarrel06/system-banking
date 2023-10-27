const {ResponseTemplate} = require("../helper/template.helper");
const Joi = require("joi");

// function PrintSuccess(req, res, next) {
//   const {} = req.params.id;
//   console.log(`Berhasil akses`);
//   next();
// }

// function PrintSuccessRoute(req, res, next) {
//   console.log(`Berhasil akses lewat route level`);
//   next();
// }

function CheckPostReq(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().max(255).required(),
    // address: Joi.string().alphanum().required(),
  });

  const {error} = schema.validate(req.body);
  if (error) {
    let respErr = ResponseTemplate(
      null,
      "Invalid request",
      error.details[0].message,
      400
    );
    res.json(respErr);
    return;
  }

  next();
}

function CheckUsersReq(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().max(255).required(),
    email: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
  });

  const {error} = schema.validate(req.body);
  if (error) {
    let respErr = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.json(respErr);
    return;
  }

  next();
}

module.exports = {
  CheckPostReq,
  CheckUsersReq,
};
