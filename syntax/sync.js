var fs =require('fs');

//read file Sync   --> A, B, C 동기적 순차적으로 출력
/*console.log('A');
var result = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');
*/


// 비동기적, 병렬적 ---> A C B 출력 B를 읽는데 시간이 걸리기 때문
console.log('A');
fs.readFile('syntax/sample.txt','utf8',function(err,result){
    console.log(result); //읽은 후 출력 '콜백'
});

console.log('C');