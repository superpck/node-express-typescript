import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import jwt from "jsonwebtoken";

import { UserModel } from '../../models/user/user-model';
const userModel = new UserModel();

const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.send({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Invalid parameters'
    });
  }
  try {
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');
    const row: any = await userModel.login(global.db, req.body.username, password);
    if (row && row.username) {
      const payload = {
        uid: row.id
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY || 'xx', { expiresIn: "8h" });
      res.send({
        statusCode: StatusCodes.OK, token
      });
    } else {
      res.send({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    res.json({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
});

module.exports = router;