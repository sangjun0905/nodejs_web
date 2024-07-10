var v1='v1';
// 1000 codes
v1 = 'egoing'; // 수많은 코드가 엉키며 변수가 꼬임
var v2='v2';


var object = {    // object를 이용해 수많은 변수들을 묶어서 선언
    v1:'v1',
    v2:'v2',
    v3:'v3',
    f1: function f1(){
        console.log(this.v1);
    },
    f2:function f2(){
        console.log(this.v2);    // this ==> 자신이 속한 객체 참조
    }
}

object.f1();
object.f2();