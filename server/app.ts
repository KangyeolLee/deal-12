import express, { Request, Response, NextFunction } from 'express';
// const path = require('path');
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// const session = require('express-session');
import 'dotenv/config';
import { initDatabase } from './database/database';
import router from './routes';

// const FileStore = require("session-file-store")(session);

const app = express();
// sequelize.sync();

(async function () {
  await initDatabase();
})();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.use(express.json());

app.use('/api', router);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: false,
//       secure: false,
//     },
//     // store: new FileStore(),
//   })
// );

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as any;
  err.status = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    error: err.message,
  });
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
