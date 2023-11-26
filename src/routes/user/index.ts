import express from "express";
const router = express.Router();

import userRoute from "./user";
import reportRoute from "./report";

router.use("/", userRoute);
router.use("/report", reportRoute);

module.exports = router;
