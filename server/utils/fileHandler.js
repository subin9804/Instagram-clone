const multer = require('multer');
const path = require('path');

module.exports = function fileHandler(dest) {
  const upload = multer({
    // 저장공간, 파일이름
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${__dirname}/../files/${dest}/`)
      },  // __dirname: 현재 파일의 경로를 리턴하는 함수
  
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
      } // Date.now()로 랜덤파일이름을 생성하여 원본이미지 확장자를 붙여 저장한다.
        // path.extname: 원본이미지 확장자
    }),

    // 파일 필터링
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
  
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        return cb(null, true)
      }
      // 확장자가 셋 중 하나에 포함되지 않을 때 에러 발생
      cb(new TypeError('Not acceptable type of files.'));
    },

    // 파일 사이즈, 갯수 제한
    limits: {
      fileSize: 1e7,
      files: 10
    }
  })

  return upload;
}