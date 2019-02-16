import axios from 'axios';

// 这里不能只获取一次！！！要修改
let AUTH_TOKEN=`Bearer ${localStorage.getItem("userId")} ${localStorage.getItem("token")}`;
axios.defaults.baseURL = 'http://119.29.105.29:8083';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const requestLogin = params => { return axios.post("/login",params); };

export const requestRegister = params => { return axios.post("/reg",params); };

export const editPassword = (params) => { return axios.put("/user/password",{params:params}); };

// 获取用户信息
// export const getUserInformation

// 获取待审核社团会员列表
export const getUnauditClubMemberList=params => { return axios.put("/getStudentList",params); };

// 获取待审核社联干事列表
export const getUnauditUnionMemberList=params => { return axios.put("/getStudentList",params); };


// 修改待审核社团会员状态:通过，拒绝
// export const editUnauditClubMemberList

// 修改待审核社联干事状态:通过，拒绝
// export const editUnauditUnionMemberList

// 获取社团干事列表
export const getClubMemberList = (clubID,params) => { return axios.get(`/club/${clubID}/vip`,params); };

// 获取社联干事列表
export const getUnionMemberList = (unionID,params) => { return axios.get(`/union/${unionID}/vip`,params); };

// 修改社团干事信息
export const editClubMember = (clubID,params) => { return axios.get("",params); };

// 修改社联干事信息
export const editUnionMember = (unionID,params) => { return axios.get("",params); };

//移除某社团干事
// export const removeClubMember

//移除某社联干事
// export const removeUnionMember

//获取社团管理人信息
export const getClubManagerList=params => { return axios.put("/getManagerList",params); };

//获取社团成员统计信息
export const getClubMemeberStatistics=params => { return axios.put("/getMemberList",params); };

//申请活动
export const requestActivity = (type,params) => { return axios.post("/${type}/activity",params);}

//修改活动状态：发布


// 获取活动列表
// /{club/union}/activity