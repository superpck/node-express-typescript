import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({ statusCode: StatusCodes.OK, token: 'xx' });
});

module.exports = router;
