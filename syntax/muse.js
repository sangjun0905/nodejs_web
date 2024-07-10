// var M ={
//     v:'v',
//     f: function(){
//         console.log(this.v);
//     }
// }


var part = require('./mpart.js');

console.log(part);   // module.exports = M; 을 통해 수출한 객체의 정보
                     // { v: 'v', f: [Function: f] } 객체 정보 
part.f();

