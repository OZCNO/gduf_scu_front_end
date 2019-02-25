import axios from 'axios';
//这里一般一开始就执行，会是null
// let AUTH_TOKEN=`Bearer ${localStorage.getItem("userId")} ${localStorage.getItem("token")}`;

axios.defaults.baseURL = 'http://119.29.105.29:8083';
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

export const requestLogin = params => { return axios.post("/login",params); };

export const requestRegister = params => { return axios.post("/reg",params); };

export const editPassword = (params) => { return axios.put("/user/password",params); };

// 获取用户信息
export const getUserInformation=()=>{ return axios.get("/user/info"); }

// 获取待审核社团会员列表
export const getUnauditClubMemberList=params => { return axios.put("/getStudentList",params); };

// 获取待审核社联干事列表
export const getUnauditUnionMemberList=params => { return axios.put("/getStudentList",params); };

// 修改待审核社团会员状态:通过，拒绝
// export const editUnauditClubMemberList

// 修改待审核社联干事状态:通过，拒绝
// export const editUnauditUnionMemberList

// 获取社团干事列表
// export const getClubMemberList = (clubID,params) => { return axios.get(`/club/${clubID}/vip?page=${params.page}&name=${params.name}`); };
export const getClubMemberList = (clubID,params) => { return axios.get(`/club/${clubID}/vip`,{params:params}); };

//mock  获取社联干事列表
export const getUnionMemberList = (unionID,params) => { return axios.get(`/union/${unionID}/vip`,params); };

// 修改社团干事信息
// export const editClubMember = (clubID,params) => { return axios.get("",params); };

// 修改社联干事信息
// export const editUnionMember = (unionID,params) => { return axios.get("",params); };

//移除某社团干事
// export const removeClubMember

//移除某社联干事
// export const removeUnionMember

//mock 获取社团管理人信息
export const getClubManagerList=params => { return axios.put("/getManagerList",params); };

//mock 获取社团成员统计信息
export const getClubMemeberStatistics=params => { return axios.put("/getMemberList",params); };
//mock 社团获取年度注册表列表
export const getAnnualRegList=()=>{return axios.get(`/getAuditAnnualReg`)};
// 提交社团年度注册表
export const requestClubAnnualReg= (clubID,params) => { return axios.post(`/club/${clubID}/annual/registration`,params);}
//申请活动
export const requestActivity = (type,params) => { return axios.post("/${type}/activity",params);}
//活动状态变更
export const editActivity = (activityId,params) => { return axios.put(`/activity/{activityId}/status`,params);}
//mock 获取已提交活动列表（待发布）、已发布且需填经费活动列表（待填经费）
export const getActivityList= (clubID) =>{return axios.get("/getActivityList");}
//修改活动状态：发布

//mock 获取社团活动热度指数列表（点赞数..)、已发布活动列表（发布活动成果）
export const getActivityDetailList=(clubID)=>{return axios.get(`/getActivityDetailList`);}
//mock 获取社团活动统计结果
export const getActivityStatisticalList=(clubID)=>{return axios.get("/getActivityStatisticalList")}
//mock 发布活动成果
export const requestActivityResult=(params)=>{return axios.get("/success",params)}


//mock 社联获取已审核社团活动列表
export const getAuditedActivityList=()=>{return axios.get("/getAuditedActivityList")}
//mock 社联获取待审核社团活动列表
export const getUnauditActivityList=()=>{return axios.get("/getUnauditActivityList")}
//mock 管理经费
export const editClubMoney=(params)=>{return axios.put("/success",params)}
//mock 社联获取已读社团经费表
export const getReadMoneyList=()=>{return axios.get("/getAuditedActivityList")}
//mock 社联获取未读社团经费表
export const getUnreadMoneyList=()=>{return axios.get("/getUnauditActivityList")}
//mock 修改社团经费表状态为已读状态
export const editMoneyList=(params)=>{return axios.get("/success",params)}
//mock 社联获取已审核社团年度注册表
export const getAuditAnnualReg=()=>{return axios.get("/getAuditAnnualReg")}
//mock 社联获取未审核社团年度注册表
export const getUnauditAnnualReg=()=>{return axios.get("/getUnauditAnnualReg")}
//mock 修改社团年度注册表
export const editAnnualReg=(params)=>{return axios.get("/success",params)}


//mock 修改个人信息
export const editPersonalInformation=(params)=>{return axios.get("/success",params)}
//mock 获取活动成果展列表
export const getActivityResultList=()=>{return axios.get("/getActivityResultList")}
