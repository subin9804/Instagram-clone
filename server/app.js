// IMPORT MODULES // require = import
const express = require('express'); // 프레임워크
const createError = require('http-errors'); // 에러처리
const cookieParser = require('cookie-parser');  // 클라이언트가 전송하는 쿠키를 수집
const logger = require('morgan'); // 로그를 기록하는 모듈
const cors = require("cors");   // 교차 출처 리소스 공유, 체제(policy)
const indexRouter = require('./routes/index');  // 요청 URL에 적절한 컨트롤러를 연결
const app = express(); 
const mongoose = require("mongoose");   // 몽고DB와 express를 연결하는 라이브러리
const compression = require('compression'); // 라우터 압축
const helmet = require('helmet'); // HTTP header를 보호 (보안)
require('dotenv').config();   // 환경변수를 사용하기 위함

// DATABASE Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
  .catch(err => console.log(err));

// MIDDLEWARE
app.use(logger('dev')); // 로거 호출
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin" 
}));
app.use(compression()); // Compress all routes
app.use(cors());

// set static path in this app. 정적경로설정
app.use('/api/static', express.static('public'));
app.use('/api/files', express.static('files'));

// ROUTER
app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json(err); 
})

module.exports = app;
