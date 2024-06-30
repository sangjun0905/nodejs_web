/*function a(){
    console.log('A');
}
*/



var a= function(){
    console.log('A');
}
//변수의 값에 함수를 대입



function slowfunc(callback){
    callback();
}

slowfunc(a); // showfunc의 argument로 함수를 뜻하는 변수 a 대입