const fs = require('fs');
const path = 'data'; // 읽고자 하는 디렉토리 경로

fs.readdir(path, function(err,file) {
  console.log('디렉토리 내 파일 및 디렉토리 목록:');
  console.log(file)
});
