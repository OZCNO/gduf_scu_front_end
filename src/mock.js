var Mock = require('mockjs')
var Random=Mock.Random//可以省略不写
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
var activityDetailList=[
            	{
            		theme:"挑战杯",
            		timeBegin:"20150105",
            		visits:2585,
            		likes:1999,
            		enrolls:1532
            	},
            	{
            		theme:"蓝桥杯",
            		timeBegin:"20150105",
            		visits:954,
            		likes:864,
            		enrolls:581
            	},
            	{
            		theme:"数学建模",
            		timeBegin:"20150105",
            		visits:954,
            		likes:851,
            		enrolls:581
            	},
            	{
            		theme:"沙盘模拟",
            		timeBegin:"20150105",
            		visits:1893,
            		likes:925,
            		enrolls:858
            	},
            	{
            		theme:"金融数学",
            		timeBegin:"20150105",
            		visits:1454,
            		likes:925,
            		enrolls:858
            	},
            	{
            		theme:"嘉年华",
            		timeBegin:"20150105",
            		visits:654,
            		likes:525,
            		enrolls:458
            	},
            	{
            		theme:"辩论赛",
            		timeBegin:"20150105",
            		visits:2454,
            		likes:1025,
            		enrolls:258
            	},
            	{
            		theme:"美食节",
            		timeBegin:"20150105",
            		visits:3454,
            		likes:2525,
            		enrolls:558
            	},
            	{
            		theme:"篮网杯",
            		timeBegin:"20150105",
            		visits:2554,
            		likes:1925,
            		enrolls:725
            	},
            	{
            		theme:"希望杯",
            		timeBegin:"20150105",
            		visits:2568,
            		likes:2050,
            		enrolls:888
            	}
            ]
var activityList=[
				{	
					activityId:1,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"数学协会",
					theme:"数学建模",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",					
					address:"A-101",
					money:500,
					goods:[],
					status:1,
				},
				{	
					activityId:3,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"爪哇部落",
					theme:"学习交流会",
					content:"很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",
					address:"A-102",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					}],
					status:2,
				},
				{	
					activityId:4,
					time:"2019/01/15",
					clubUnionId:"3",
					theme:"学习交流会",
					clubName:"数学协会",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2013/09/15 12:00:00",
					timeEnd:"2013/09/15 14:00:00",
					enrollDeadline:"2013/09/14 12:00:00",
					introduction:"迎新活动",
					address:"大礼堂",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					},{
						sum:"2",
						name:"桌子"
					}],
					status:3,
					reason:"此时段不予办娱乐活动"
				},
				{	
					activityId:4,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"乒乓球协会",
					theme:"乒乓球赛",
					content:"很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",
					address:"A-104",
					money:1000,
					goods:[{
						sum:"1",
						name:"相机"
					},{
						sum:"2",
						name:"桌子"
					}],
					status:4,
				}
			]
var unauditActivityList=[
				{	
					activityId:1,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"数学协会",
					theme:"数学建模",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",					
					address:"A-101",
					money:500,
					goods:[],
					status:1,
					moneyUse:[
						{
							use:"零食",
							sum:"500"
						}
					]
				},
				{	
					activityId:3,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"爪哇部落",
					theme:"学习交流会",
					content:"很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",
					address:"A-102",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					}],
					status:1,
					moneyUse:[
						{
							use:"零食",
							sum:"200"
						}
					]
				},
				{	
					activityId:4,
					time:"2019/01/15",
					clubUnionId:"3",
					theme:"学习交流会",
					clubName:"数学协会",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2013/09/15 12:00:00",
					timeEnd:"2013/09/15 14:00:00",
					enrollDeadline:"2013/09/14 12:00:00",
					introduction:"迎新活动",
					address:"大礼堂",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					},{
						sum:"2",
						name:"桌子"
					}],
					status:1,
					moneyUse:[
						{
							use:"零食",
							sum:"200"
						}
					]
				},
				{	
					activityId:4,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"乒乓球协会",
					theme:"乒乓球赛",
					content:"很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",
					address:"A-104",
					money:1000,
					goods:[{
						sum:"1",
						name:"相机"
					},{
						sum:"2",
						name:"桌子"
					}],
					status:1,
					moneyUse:[
						{
							use:"零食",
							sum:"1000"
						}
					]
				}
			]
var auditActivityList=[
				{	
					activityId:1,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"数学协会",
					theme:"数学建模",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",					
					address:"A-101",
					money:500,
					goods:[],
					status:2,
					reason:"同意",
					moneyUse:[
						{
							use:"奖品-杯子",
							sum:"200"
						},
						{
							use:"零食",
							sum:"300"
						}
					]
				},
				{	
					activityId:3,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"爪哇部落",
					theme:"学习交流会",
					content:"很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2013/01/15 14:00:00",
					timeEnd:"2013/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",
					address:"A-102",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					}],
					status:2,
					reason:"同意",
					moneyUse:[
						{
							use:"奖品-杯子",
							sum:"200"
						}
					]
				},
				{	
					activityId:4,
					time:"2019/01/15",
					clubUnionId:"3",
					theme:"迎新晚会",
					clubName:"数学协会",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2013/09/15 12:00:00",
					timeEnd:"2013/09/15 14:00:00",
					enrollDeadline:"2013/09/14 12:00:00",
					introduction:"迎新活动",
					address:"大礼堂",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					},{
						sum:"2",
						name:"桌子"
					}],
					status:3,
					reason:"此时段不予办娱乐活动",
					moneyUse:[
						{
							use:"零食",
							sum:"200"
						}
					]
				}
			]
var activityStatisticalList=[
            	{
            		time:"2016年上",
            		times:3,
            		memberTimes:1,
            		unmemberTimes:2,
            		averageNumber:20,
            	},
            	{
            		time:"2016年下",
            		times:4,
            		memberTimes:2,
            		unmemberTimes:2,
            		averageNumber:33,
            	},
            	{
            		time:"2017年上",
            		times:5,
            		memberTimes:2,
            		unmemberTimes:3,
            		averageNumber:32,
            	},
            	{
            		time:"2017年下",
            		times:4,
            		memberTimes:2,
            		unmemberTimes:2,
            		averageNumber:51,
            	},
            	{
            		time:"2018年上",
            		times:4,
            		memberTimes:2,
            		unmemberTimes:2,
            		averageNumber:47,
            	},
            	{
            		time:"2018年下",
            		times:5,
            		memberTimes:2,
            		unmemberTimes:3,
            		averageNumber:44,
            	}
]
var auditAnnualReg=[
            	{
            		clubName:"数学协会",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"3",
            		time:"2019.01.02 22:00:00",
            		updateTime:"2019-02-23",
            		reason:"计划存在...问题"
            	},
            	{
            		clubName:"出雲",
            		type:"娱乐类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		time:"2019.01.02 22:00:00",
            		updateTime:"2019-02-23",
            		reason:"通过，计划可以稍作修改"
            	},
            	{
            		clubName:"爪哇部落",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		time:"2019.01.02 22:00:00",
            		updateTime:"2019-02-23",
            		reason:"通过"
            	}
]
var unauditAnnualReg=[
            	{
            		clubName:"数学协会",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"3",
            		time:"2019-02-23"
            	},
            	{
            		clubName:"出雲",
            		type:"娱乐类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		time:"2019-02-23"
            	},
            	{
            		clubName:"爪哇部落",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		time:"2019-02-23"
            	}
]
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
// Mock.mock("http://119.29.105.29:8083/editPassword","success");
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

Mock.mock("http://119.29.105.29:8083/getActivityDetailList",function(){
	return activityDetailList
})
Mock.mock("http://119.29.105.29:8083/getActivityList",function(){
	return activityList
})
Mock.mock("http://119.29.105.29:8083/getActivityStatisticalList",function(){
	return activityStatisticalList
})
Mock.mock("http://119.29.105.29:8083/getAuditedActivityList",function(){
	return auditActivityList
})
Mock.mock("http://119.29.105.29:8083/getUnauditActivityList",function(){
	return unauditActivityList
})
Mock.mock("http://119.29.105.29:8083/getAuditAnnualReg",function(){
	return auditAnnualReg
})
Mock.mock("http://119.29.105.29:8083/getUnauditAnnualReg",function(){
	return unauditAnnualReg
})
Mock.mock("http://119.29.105.29:8083/postImg","success")
Mock.mock("http://119.29.105.29:8083/success",function(){
	return {
		msg:"成功",
		data:{
		},
		code:200
	}
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
Mock.mock("http://119.29.105.29:8083/getInstitute",function(){
	return JSON.stringify(institute);		
})
Mock.mock("http://119.29.105.29:8083/acceptThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://119.29.105.29:8083/rejectThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://119.29.105.29:8083/acceptThese",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://119.29.105.29:8083/removeThese",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://119.29.105.29:8083/removeThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://119.29.105.29:8083/editThis",function(data){
	console.log(data.body);
	return "success";
});