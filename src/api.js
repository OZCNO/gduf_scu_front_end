import axios from 'axios';
//这里一般一开始就执行，会是null
// let AUTH_TOKEN=`Bearer ${localStorage.getItem("userId")} ${localStorage.getItem("token")}`;

axios.defaults.baseURL = 'http://127.0.0.1:8083';
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// 添加请求拦截器
axios.interceptors.request.use(function(config){
    let url = config.url;
    // // 如果发出请求的是登录或注册页面
    if(url.indexOf("login")>-1 || (url.indexOf("reg")>-1 && url.indexOf("clubReg")>-1)){
        config.headers.Authorization = "";	
    }else{//如果不是
        config.headers.Authorization =`Bearer ${localStorage.getItem("userId")} ${localStorage.getItem("token")}`;
    }
    return config;
},function(err){// 对请求错误做些什么
    return Promise.reject(err);
});
// 添加响应拦截器
axios.interceptors.response.use(function(res){
	let data=res.data;
    if(data.data && data.data.credential){
  		localStorage.setItem("token",data.data.credential.token);
  		localStorage.setItem("userId",data.data.credential.userId);
    }	
    return res;
},function(err){
    return err;
});



//登录注册修改密码API
export const requestLogin = params => { return axios.post("/login",params); };
export const requestRegister = params => { return axios.post("/reg",params); };
export const editPassword = (params) => { return axios.put("/user/password",params); };


//获取用户信息
export const getUserInformation=()=>{ return axios.get("/user/info"); }


//成员API
// 申请加入
export const enterClub=(studentId,activityId,params)=>{return axios.post(`/student/${studentId}/activity/${activityId}`,params)}
// 社团获取
export const getClubMemberList = (clubID,params) => { return axios.get(`/club/${clubID}/vip`,{params:params}); };
// 审核通过
export const editMemberStatus=studentId=>{return axios.put(`/club/student/${studentId}/status`)}
//mock 获取待审核社联干事列表
export const getUnauditUnionMemberList=params => { return axios.get("/getStudentList",{params:params}); };
// 社联审核:通过，拒绝
// export const editUnauditUnionMemberList
//mock  获取社联干事列表
export const getUnionMemberList = (unionID,params) => { return axios.get(`/union/${unionID}/vip`,params); };
//? 修改社团干事信息
// export const editClubMember = (params) => { return axios.put("/club/vip",params); };
// 修改社联干事信息
// export const editUnionMember = (unionID,params) => { return axios.get("",params); };
//移除某社联干事
// export const removeUnionMember


//活动API
// 申请
export const requestActivity = (type,params) => { return axios.post(`/${type}/activity`,params);}
// 获取
export const getActivityList=(type,params)=>{return axios.get(`/${type}/activity`,{params:params})}
// 状态变更
export const editActivity = (activityId,params) => { return axios.put(`/activity/${activityId}/status`,params);}
// 学生获取
export const getActivity=(params)=>{return axios.get("/activity",{params:params})}


//年度注册表API
// 获取
export const getAnnualRegList=(params)=>{return axios.get("/club/annual/registration",{params:params})};
// 提交
export const requestClubAnnualReg= (clubID,params) => { return axios.post(`/club/${clubID}/annual/registration`,params);}
// 审核
export const editAnnualReg=(regId,params)=>{return axios.put(`/club/annual/registration/${regId}/status`,params)}


//经费表API
//获取待提交
// export const getMoneyActivityList=(type,clubOrUnionId,params)=>{return axios.get(`/${type}/${clubOrUnionId}/money/usage/`,{params:params})}
export const getMoneyActivityList=()=>{return axios.get(`uncommitted/money/usage/activity`)}
//提交
export const pushMoneyDetail=(activityId,params)=>{return axios.post(`/activity/${activityId}/money/usage/`,params)}
//社联获取社团
export const getMoneyActivityList2=(type,params)=>{return axios.get(`/${type}/money/usage`,{params:params})}
//审阅
export const editMoneyList=(activityId)=>{return axios.put(`/activity/${activityId}/money/usage/read`)}


//保管金API
//获取
export const getClubMoney=(type)=>{return axios.get(`/${type}/funds`)}
//管理
export const editClubMoney=(type,moneyId,params)=>{return axios.put(`/${type}/funds/${moneyId}`,params)}



//mock 获取社团管理人信息
export const getClubManagerList=params => { return axios.put("/getManagerList",params); };
//mock 获取社团成员统计信息
export const getClubMemeberStatistics=params => { return axios.put("/getMemberList",params); };
//mock 获取已提交活动列表（待发布）、已发布且需填经费活动列表（待填经费）
export const getActivityList2= (clubID) =>{return axios.get("/getActivityList");}
//mock 获取社团活动热度指数列表（点赞数..)、已发布活动列表（发布活动成果）
export const getActivityDetailList=(clubID)=>{return axios.get(`/getActivityDetailList`);}
//mock 获取社团活动统计结果
export const getActivityStatisticalList=(clubID)=>{return axios.get("/getActivityStatisticalList")}
//mock 发布活动成果
export const requestActivityResult=(params)=>{return axios.get("/success",params)}
//mock 修改个人信息
export const editPersonalInformation=(params)=>{return axios.get("/success",{params:params})}
//mock 获取活动成果展列表
export const getActivityResultList=()=>{return axios.get("/getActivityResultList")}

