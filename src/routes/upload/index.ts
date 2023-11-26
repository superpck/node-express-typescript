import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({ statusCode: StatusCodes.OK });
});

router.post('/upload', (req: Request, res: Response) => {
  // let storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, `${process.env.UPLOAD_PATH || './uploads'}/`);
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, Date.now() + '-' + file.originalname);
  //   }
  // });
  // const upload = multer({ storage: storage });

  let filePath = `${process.env.UPLOAD_PATH || './uploads'}/`;
  const upload = multer({ dest: filePath });
  // ...
  res.json({ message: 'File uploaded successfully!' });
});

module.exports = router;
