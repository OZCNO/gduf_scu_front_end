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
var clubs=["社联",'公关协会','摄影协会','绿色环保协会','鲲鹏创客空间','大学生创业协会','米森动物协会','金融实践社','创行','管理学社','大学生职业生涯规划研究协会','出雲音乐协会','墨染文学社','西椎动漫社','楚天棋友社','毽球协会','篮球协会','心理健康与个人发展协会','电子商务学会','保险学社']
var major=['金融学','金融工程','财政学','会计学','投资学','财务管理','保险学','精算学','国际经济与贸易','经济学','经济与金融','国际商务','信用管理','工商管理','市场营销','物流管理','酒店管理','人力资源管理','互联网金融','信息管理与信息系统','计算机科学与技术','电子商务','软件工程','商务英语','英语','翻译','法学','汉语言文学','网络与新媒体','文化产业管理','金融数学','数学与应用数学','信息与计算科学','应用统计学','经济统计学','行政管理','公共事业管理','应用心理学','劳动与社会保障','劳动关系','社会工作']
var ins=['金融与投资学院','会计学院','保险学院','经济贸易学院','信用管理学院','工商管理学院','互联网金融与信息工程学院','外国语言与文化学院','法学院','财经与新媒体学院','金融数学与统计学院','公共管理学院',]
// 未审核的学生模版
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
	"institute|1":ins,
	"majorId":2,
	"major|1":function(){return institute[this.institute]},
	"department":"宣传部",
	"status":"干事",
	"email":'@email',
	"mobile":/^1[385][1-9]\d{8}/,
	"introduction":'@paragraph(3,5)',
	"time":'@datetime("MM/dd")',
	"reason":'@paragraph(1,3)',
	"avatar":'@image("120x160","头像","#123156")',
	"state":0,
}
var i=0
var clubManagersListTemplate={
	"club":function(){
		if(i<clubs.length){
			return clubs[i++]
		}else{
			i=1
			return clubs[0]
		}
	},
	"name":'@cname',
	"grade":'@natural(15,18)',
	"sex":'@natural(0,1)',
	"email":'@email',
	"mobile":/^1[385][1-9]\d{8}/,
	"major|1":major,
	// "major":"法学"
}
var memberListTemplate={
	"club":function(){
		if(i<clubs.length){
			return clubs[i++]
		}else{
			i=1
			return clubs[0]
		}
	},
	"member1":'@natural(0,100)',
	"member2":'@natural(0,100)',
	"member3":'@natural(0,100)',
	"member4":'@natural(0,100)',
	"officer1":'@natural(0,10)',
	"officer2":'@natural(0,10)',
	"officer3":'@natural(0,10)',
	"officer4":'@natural(0,10)'
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
					time:"2019/03/11",
					clubUnionId:"3",
					clubName:"电商协会",
					theme:"电子知识竞赛",
					content:"很多学霸等你们来很多学霸等你们来很多学霸等你们来很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2019/01/11 12:00:00",
					timeEnd:"2019/01/11 13:50:00",
					enrollDeadline:"2019/03/10 12:00:00",
					introduction:"学习交流",					
					address:"A101",
					money:1000,
					goods:[],
					status:1,
					like:500,
					browser:452,
					enroll:150,
					isBrowser:1,
					isLike:1,
					isEnroll:0,
				},
				{	
					activityId:3,
					time:"2019/01/15",
					clubUnionId:"3",
					clubName:"爪哇部落",
					theme:"学习交流会",
					content:"很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2019/01/15 14:00:00",
					timeEnd:"2019/01/15 18:00:00",
					enrollDeadline:"2013/01/15 12:00:00",
					introduction:"学习交流",
					address:"A-102",
					money:200,
					goods:[{
						sum:"1",
						name:"相机"
					}],
					status:2,
					like:500,
					browser:452,
					enroll:150,
					isBrowser:1,
					isLike:1,
					isEnroll:0,
				},
				{	
					activityId:4,
					time:"2019/08/15",
					clubUnionId:"3",
					theme:"学习交流会",
					clubName:"数学协会",
					content:"很多学霸等你们来",
					memberActivity:1,
					timeBegin:"2019/09/15 12:00:00",
					timeEnd:"2019/09/15 14:00:00",
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
					like:500,
					browser:452,
					enroll:150,
					isBrowser:1,
					isLike:1,
					isEnroll:0,
				},
				// {	
				// 	activityId:4,
				// 	time:"2019/01/15",
				// 	clubUnionId:"3",
				// 	clubName:"乒乓球协会",
				// 	theme:"乒乓球赛",
				// 	content:"很多学霸等你们来",
				// 	memberActivity:0,
				// 	timeBegin:"2019/01/15 14:00:00",
				// 	timeEnd:"2019/01/15 18:00:00",
				// 	enrollDeadline:"2013/01/15 12:00:00",
				// 	introduction:"学习交流",
				// 	address:"A-104",
				// 	money:1000,
				// 	goods:[{
				// 		sum:"1",
				// 		name:"相机"
				// 	},{
				// 		sum:"2",
				// 		name:"桌子"
				// 	}],
				// 	status:4,
				// 	like:500,
				// 	browser:452,
				// 	enroll:150,
				// 	isBrowser:1,
				// 	isLike:1,
				// 	isEnroll:0,
				// }
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
							use:"面包",
							sum:"200"
						},
						{
							use:"水果",
							sum:"200"
						},
						{
							use:"饮料",
							sum:"100"
						}
					],
					read:1,
				},
				{	
					activityId:3,
					time:"2019/03/6",
					clubUnionId:"3",
					theme:"电子知识竞赛",
					content:"很多学霸等你们来很多学霸等你们来很多学霸等你们来很多学霸等你们来",
					memberActivity:0,
					timeBegin:"2019/01/11 12:00:00",
					timeEnd:"2019/01/11 13:50:00",
					enrollDeadline:"2019/03/10 12:00:00",
					introduction:"学习交流",					
					address:"A101",
					clubName:"电商协会",
					money:1000,
					goods:[{
						sum:"1",
						name:"相机"
					}],
					status:2,
					moneyUse:[
						// {
						// 	use:"零食",
						// 	sum:"200"
						// }
					],
					read:0,
				},
				{	
					activityId:4,
					time:"2019/01/15",
					clubUnionId:"3",
					theme:"三人篮球赛",
					clubName:"篮球协会",
					content:"三人篮球赛",
					memberActivity:1,
					timeBegin:"2013/09/15 12:00:00",
					timeEnd:"2013/09/15 14:00:00",
					enrollDeadline:"2013/09/14 12:00:00",
					introduction:"三人篮球赛",
					address:"北苑1号新篮球场",
					money:400,
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
							use:"篮球4个",
							sum:"400"
						}
					],
					read:1,
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
					money:400,
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
							use:"奖品-乒乓拍",
							sum:"400"
						}
					],
					read:1,
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
            		name:"数学协会",
            		times:5,
            		memberTimes:4,
            		unmemberTimes:1,
            		averageNumber:125,
            		hotActivity:"第五次自习",
            		hotNumber:100
            	},
            	{
            		time:"2016年下",
            		name:"电子商务学会",
            		times:4,
            		memberTimes:3,
            		unmemberTimes:1,
            		averageNumber:80,
            		hotActivity:"第一次交流会",
            		hotNumber:219
            	},
            	{
            		time:"2017年上",
            		name:"出雲",
            		times:5,
            		memberTimes:2,
            		unmemberTimes:3,
            		averageNumber:80,
            		hotActivity:"草地音乐节",
            		hotNumber:205
            	},
            	{
            		time:"2017年下",
            		name:"魔方协会",
            		times:4,
            		memberTimes:2,
            		unmemberTimes:2,
            		averageNumber:51,
            		hotActivity:"竞速魔方",
            		hotNumber:70
            	},
            	{
            		time:"2018年上",
            		name:"创行",
            		times:4,
            		memberTimes:2,
            		unmemberTimes:2,
            		averageNumber:47,
            		hotActivity:"广工交流会",
            		hotNumber:50
            	},
            	{
            		time:"2018年下",
            		name:"舞蹈社",
            		times:5,
            		memberTimes:2,
            		unmemberTimes:3,
            		averageNumber:44,
            		hotActivity:"舞王",
            		hotNumber:100
            	}
]
var statistics={
	"name":function(){
		if(i<clubs.length){
			return clubs[i++]
		}else{
			i=1
			return clubs[0]
		}
	},
	'times':'@natural(3,7)',
	"memberTimes":'@natural(0,3)',
	"unmemberTimes":function(){
		return this.times-this.memberTimes
	},
	"averageNumber":'@natural(20,140)',
	"str":'@cname',
	"str1":'@cname',
	"hotActivity":function(){return this.str+this.str1},
	"hotNumber":'@natural(50,160)',
}
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
var activityResultList=[
	{
		title:"北上广智库专家齐聚广金畅谈中国经济 ",
		image:"http://www.gduf.edu.cn/__local/B/A3/2F/31432773EF394D6CB6033C954E9_81361905_4F9E4.png",
		content:"我校作为2018年广东省智库联盟轮值理事长单位，2019年1月31日与广东省社会科学院联合举办广东省智库联盟年会暨构建现代化经济体系高端论坛，本次论坛邀请北上广三地智库专家，论坛分为两个部分，主旨环节是构建现代化经济体系高端论坛，其次是2018年广东智库联盟工作总结及轮值理事长单位交接仪式。广东省社会科学副院长赵细康，广东金融学院校长雍和明在开幕式上致辞。"
	},
	{
		title:"学校领导小年佳节看望慰问寒假留校师生",
		image:"http://www.gduf.edu.cn/__local/5/44/A8/069E0C5B4D2A99B2D5708EB3EF6_C0DB3EF1_15833.jpeg",
		content:"犬过千秋留胜迹，亥岁跃马奔小康。1月28日是腊月二十三日，正值小年佳节，为了给寒假留校学生送上新春的问候和祝福，我校在实验教学中心三楼多功能厅举办了2019年寒假留校学生新春茶话会。党委书记李建军，党委副书记、纪委书记张欣，学生工作处、招生与就业工作处、保卫处、后勤服务中心、资产后勤管理处、教育技术与网络管理中心、团委等部门负责人以及留校学生代表共100多人齐聚一堂，喜迎新春，茶话会由学生工作处处长陈伟业主持。"
	},
	{
		title:"我校学子在2018-2019年CFA协会全球高校投资分析大赛中斩获广州赛区冠军",
		image:"http://www.gduf.edu.cn/__local/E/D9/10/3B85B8F5CA60EFC037E2DC2F38D_253A15D9_2AF44.jpg",
		content:"2月23日，我校金融与投资学院2016级CFA实验班学生许皓钧、林秋晴、邱诗韵与陈雨柔组成的四人代表队，在学院胡妍老师的带领下参加了2018-2019年CFA全球投资分析大赛广州地区决赛。四位队员击败了来自中南财经政法大学、华南理工大学、华南师范大学等高校的其余八支队伍，获得冠军，并将在今年3月下旬与来自北京大学光华管理学院、北京大学汇丰商学院、上海财经大学以及西南财经大学的另外四支队伍一起代表中国赴澳大利亚悉尼参加亚太区决赛。"
	},
    {
    	title:"ACM我校斩获....",
    	image:"https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=3e23aa77232dd42a4b0409f9625230d0/314e251f95cad1c84e8f0339793e6709c93d51fc.jpg",
    	content:"本次数学竞赛。。。"
    },
    {
    	title:"爱心行动",
    	image:"https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=93b50afd6681800a7ae8815cd05c589f/4bed2e738bd4b31cc5ec67c98dd6277f9f2ff8f4.jpg",
    	content:"爱心行动。。。"
    },
    {
    	title:"开学季",
    	image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551024863825&di=ceef7b0fa69de1a62de61f4118aa0275&imgtype=0&src=http%3A%2F%2Fpic98.huitu.com%2Fres%2F20170808%2F622769_20170808215534312050_1.jpg",
    	content:"开学季，我们在XXX举办的xxxxx活动获得了广大学生的青睐"
    },
    {
    	title:"计算机技能竞赛",
    	image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551021712040&di=66b1fb44073818ec989c0f7c15844b73&imgtype=0&src=http%3A%2F%2Fwww.hzxxgc.com%2Fupimg%2Fuserup%2F1404%2F2F3041X927.jpg",
    	content:"本次计算机技能竞赛。。。"
    },
]
Mock.mock("http://127.0.0.1:8083/statistics",{
	'statistics|20':[
		statistics
	]
})
// Mock.mock("http://127.0.0.1:8083/reg",function(data){
// 	var response={
// 		"credential": {
// 	        "token": "hseJ7nkui0vbRctXvvWSxZKUmmP7HaoyaIocdCZN",
// 	        "userId": 2
// 	    }
// 	}
// 	console.log(data.body);
// 	return response;
// })
// Mock.mock("http://127.0.0.1:8083/editPassword","success");
// Mock.mock("http://127.0.0.1:8083/login",function(){
// 	var response={
// 		"credential": {
// 	        "token": "hseJ7nkui0vbRctXvvWSxZKUmmP7HaoyaIocdCZN",
// 	        "userId": 2
// 	    },
// 	    role:3,
// 	}
// 	return response;
// })
Mock.mock("http://127.0.0.1:8083/getStudentList",{
	'studentList|10':[
		studentListTemplate
	],
	"totalCount":50
})

Mock.mock("http://127.0.0.1:8083/getActivityDetailList",function(){
	return activityDetailList
})
Mock.mock("http://127.0.0.1:8083/getActivityList",function(){
	return activityList
})
Mock.mock("http://127.0.0.1:8083/getActivityStatisticalList",function(){
	return activityStatisticalList
})
Mock.mock("http://127.0.0.1:8083/getAuditedActivityList",function(){
	return auditActivityList
})
Mock.mock("http://127.0.0.1:8083/getUnauditActivityList",function(){
	return unauditActivityList
})
// Mock.mock("http://127.0.0.1:8083/getAuditAnnualReg",function(){
// 	return auditAnnualReg
// })
// Mock.mock("http://127.0.0.1:8083/getUnauditAnnualReg",function(){
// 	return unauditAnnualReg
// })
Mock.mock("http://127.0.0.1:8083/getActivityResultList",function(){
	return {
		msg:"成功",
		data:{list:activityResultList},
		code:200
	}
})
Mock.mock("http://127.0.0.1:8083/postImg","success")
Mock.mock("http://127.0.0.1:8083/success",function(){
	return {
		msg:"成功",
		data:{
		},
		code:200
	}
})
// Mock.mock("http://127.0.0.1:8083/club/1/vip",{
// 	'studentList|10':[
// 		studentListTemplate
// 	],
// 	"totalCount":100
// })
Mock.mock("http://127.0.0.1:8083/union/1/vip",{
	'studentList|10':[
		studentListTemplate
	],
	"totalCount":80
})
Mock.mock("http://127.0.0.1:8083/getManagerList",{
	'managerList|10':[
		clubManagersListTemplate
	],
	"totalCount":20
})
Mock.mock("http://127.0.0.1:8083/getMemberList",{
	'memberList|10':[
		memberListTemplate
	],
	"totalCount":20
})
Mock.mock("http://127.0.0.1:8083/getInstitute",function(){
	return JSON.stringify(institute);		
})
Mock.mock("http://127.0.0.1:8083/acceptThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://127.0.0.1:8083/rejectThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://127.0.0.1:8083/removeThis",function(data){
	console.log(data.body);
	return "success";
});
Mock.mock("http://127.0.0.1:8083/editThis",function(data){
	console.log(data.body);
	return "success";
});