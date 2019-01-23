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
Random.extend({
	// inst:function(date){
	// 	return this.pick(this.pick(institute));
	// }
})
// 未通过审核的学生模版
var studentListTemplate={
	"recruit_id|+1":1,
	"student_id|+2":2,
	"club_union_id|+1":2,
	// 1表社联
	"type":1,
	"name":'@cname',
	"sex":'@character("男女")',
	"grade":'@natural(15,18)',
	"institute":"互联网金融与信息工程学院",
	"major":"信息管理与信息系统",
	"department":"宣传部",
	"recruit_introduce":'@paragraph(3,5)',
	"recruit_enroll_time":'@datetime("MM/dd")',
	"recruit_enroll_reason":'@paragraph(1,3)',
	"recruit_enroll_image":'@image("120x160","头像","#123156")',
	"status":0,
}
Mock.mock("/getStudentList",{
	'studentList|20-40':[
		studentListTemplate
	]
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
// 输出结果
// console.log(JSON.stringify(data, null, 4))