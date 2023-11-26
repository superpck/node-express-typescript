import express from "express";
const router = express.Router();

import mailerRoute from "./mailer";

router.use("/mailer", mailerRoute);

module.exports = router;
