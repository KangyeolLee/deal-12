import express from 'express';
// const path = require('path');
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// const session = require('express-session');
import 'dotenv/config';
import router from './api';

// const FileStore = require("session-file-store")(session);

const app = express();
// sequelize.sync();

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

app.use((req: any, res: any, next: any) => {
  const err = new Error('Not Found') as any;
  err.status = 404;
  next(err);
});

app.use((err: any, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
