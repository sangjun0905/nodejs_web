// 객체지향 프로그래밍
// array, object ....

function f1(){
    console.log("앙기뫃찌");
}


var f = f1; //함수는 값이 될 수 있다.
// var f2 = function(){
//     console.log(2);
// }
f();

var a=[f];   //함수배열
a[0]();

var object = {    //함수 객체
    func:f
}
object.func();

// var i = if(true){
//     f1;
// }                        조건문은 값이 될 수 없다

// var w = while(true){
//     console.log(1);
// }                            반복문도 값이 될 수 없다