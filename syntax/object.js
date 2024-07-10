// 배열 = 순서가 있는 정보들의 집합
// 객체 = 순서 x ==> 변수들을 묶어주기 위한 것

var members =['sangjun', 'k090', 'hoyua'];


// console.log(roles.designer); 또는 console.log(roles['designer'])
var roles = {'programer':'sangjun',
    'designer':'k090',
    'manager' : 'hoyua'
}

for(var name in roles){  // 약속된 형태 지키기, name 대신 다른 변수명 사용 가능
    console.log("object =>", name)
    console.log("value:", roles[name] )
}
