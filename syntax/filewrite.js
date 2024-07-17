const fs = require('fs');

// 데이터
const data = 'dkdkdkdkdkdkd';

// 파일 경로와 이름
const filePath = 'output.txt';

// 파일 쓰기
fs.writeFile(filePath, data, (err) => {
  if (err) {
    console.error('파일 쓰기 중 오류 발생:', err);
    return;
  }
  console.log(`파일 ${filePath}에 데이터가 성공적으로 쓰여졌습니다.`);
});
