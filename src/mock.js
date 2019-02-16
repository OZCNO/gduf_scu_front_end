var Mock = require('mockjs')
var Random=Mock.Random//可以省略不写
Mock.mock('https://jsonplaceholder.typicode.com/posts/', function() {
    return "success";
})
var institute={
			"金融与投资学院":[
							"金融学",
							"金融工程",
							"财政学",
							],
			"会计学院":[
						"会计学",
						"投资学",
						"财务管理",
						],
			"保险学院":[
						"保险学",
						"精算学",
						],
			"经济贸易学院":[
						"国际经济与贸易",
						"经济学",
						"经济与金融",
						"国际商务"
						],
			"信用管理学院":[
						"信用管理",
						"资产评估",
						],
			"工商管理学院":[
						"工商管理",
						"市场营销",
						"物流管理",
						"酒店管理",
						"人力资源管理"
						],
			"互联网金融与信息工程学院":[
						"互联网金融",
						"信息管理与信息系统",
						"计算机科学与技术",
						"电子商务",
						"软件工程"
						],
			"外国语言与文化学院":[
						"商务英语",
						"英语",
						"翻译",
						],
			"法学院":[
						"法学"
					],
			"财经与新媒体学院":[
						"汉语言文学",
						"网络与新媒体",
						"文化产业管理"
						],
			"金融数学与统计学院":[
						"金融数学",
						"数学与应用数学",
						"信息与计算科学",
						"应用统计学",
						"经济统计学"
						],
			"公共管理学院":[
						"行政管理",
						"公共事业管理",
						"应用心理学",
						"劳动与社会保障",
						"劳动关系",
						"社会工作"
						]
		};
// 未通过审核的学生模版
var studentListTemplate={
	"recruit_id|+1":1,
	"student_id|+2":2,
	"club_union_id|+1":2,
	"type":1,
	"username":"151541217",
	"name":'@cname',
	"sex":'@natural(0,1)',
	"grade":'@natural(15,18)',
	"instituteId":5,
	"institute":"互联网金融与信息工程学院",
	"majorId":2,
	"major":"信息管理与信息系统",
	"department":"宣传部",
	"status":"干事",
	"email":'@email',
	"mobile":/^1[385][1-9]\d{8}/,
	"introduce":'@paragraph(3,5)',
	"time":'@datetime("MM/dd")',
	"reason":'@paragraph(1,3)',
	"avatar":'@image("120x160","头像","#123156")',
	"state":0,
}
var clubManagersListTemplate={
	"club":"公关协会",
	"name":'@cname',
	"grade":'@natural(15,18)',
	"sex":'@natural(0,1)',
	"email":'@email',
	"mobile":/^1[385][1-9]\d{8}/,
	"institute":"法律学院",
	"major":"法学"
}
var memberListTemplate={
	"club":"公关协会",
	"member1":'@natural(0,100)',
	"member2":'@natural(0,100)',
	"member3":'@natural(0,100)',
	"member4":'@natural(0,100)',
	"officer1":'@natural(0,100)',
	"officer2":'@natural(0,100)',
	"officer3":'@natural(0,100)',
	"officer4":'@natural(0,100)'
}
// Mock.mock("http://119.29.105.29:8083/reg",function(data){
// 	var response={
// 		"credential": {
// 	        "token": "hseJ7nkui0vbRctXvvWSxZKUmmP7HaoyaIocdCZN",
// 	        "userId": 2
// 	    }
// 	}
// 	console.log(data.body);
// 	return response;
// })
Mock.mock("http://119.29.105.29:8083/editPassword","success");
// Mock.mock("/login",function(data){
// 	var response={
// 		"credential": {
// 	        "token": "hseJ7nkui0vbRctXvvWSxZKUmmP7HaoyaIocdCZN",
// 	        "userId": 2
// 	    }
// 	}
// 	console.log(data.body);
// 	return response;
// })
Mock.mock("http://119.29.105.29:8083/getStudentList",{
	'studentList|10':[
		studentListTemplate
	],
	"totalCount":100
})
// Mock.mock("http://119.29.105.29:8083/club/1/vip",{
// 	'studentList|10':[
// 		studentListTemplate
// 	],
// 	"totalCount":100
// })
Mock.mock("http://119.29.105.29:8083/union/1/vip",{
	'studentList|10':[
		studentListTemplate
	],
	"totalCount":100
})
Mock.mock("http://119.29.105.29:8083/getManagerList",{
	'managerList|10':[
		clubManagersListTemplate
	],
	"totalCount":100
})
Mock.mock("http://119.29.105.29:8083/getMemberList",{
	'memberList|10':[
		memberListTemplate
	],
	"totalCount":40
})
Mock.mock("https://getInstitute",function(){
	return JSON.stringify(institute);		
})
Mock.mock("/acceptThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("/rejectThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("/acceptThese",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("/removeThese",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("/removeThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("/editThis",function(data){
	console.log(data.body);
	return "success";
});
// 输出结果
// console.log(JSON.stringify(data, null, 4))