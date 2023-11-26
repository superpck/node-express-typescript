require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

// DB Connection =============================
global.db = require('./middleware/db')();

// Route path ================================
app.use(require('./routes/route'));

// Start service =============================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
