webpackJsonp([31],{t0MP:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("n5Qe"),o={name:"ClubManagers",data:function(){return{filters:{club:""},page:1,total:0,managerList:[],listLoading:!1}},created:function(){this.getManagerList()},methods:{formatSex:function(t,e){return 0==t.sex?"男":1==t.sex?"女":"-"},handleCurrentChange:function(t){this.page=t,this.getManagerList()},getManagerList:function(){var t=this,e={page:this.page,club:this.filters.club,token:JSON.parse(sessionStorage.getItem("token"))};this.listLoading=!0,Object(a.e)(e).then(function(e){200==e.status&&(t.total=e.data.totalCount,t.managerList=e.data.managerList,t.listLoading=!1)}).catch(function(e){console.log(e),t.listLoading=!1})}}},s={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",{staticClass:"clubManagersContainer"},[l("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[l("el-form",{attrs:{inline:!0,size:"mini",model:t.filters}},[l("el-form-item",[l("el-input",{attrs:{placeholder:"校社团"},model:{value:t.filters.club,callback:function(e){t.$set(t.filters,"club",e)},expression:"filters.club"}})],1),t._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:t.getManagerList}},[t._v("查询")])],1)],1)],1),t._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"tableClass",staticStyle:{width:"100%"},attrs:{data:t.managerList,"highlight-current-row":!0,size:"mini"}},[l("el-table-column",{attrs:{type:"index",width:"55"}}),l("el-table-column",{attrs:{prop:"club",label:"校社团",sortable:"","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"name",label:"管理人",sortable:"","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"grade",label:"年级",sortable:"","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"sex",label:"性别",sortable:"","show-overflow-tooltip":"",formatter:t.formatSex}}),l("el-table-column",{attrs:{prop:"mobile",label:"手机",sortable:"","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"email",label:"邮箱",sortable:"","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"institute",label:"学院",sortable:"","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{prop:"major",label:"专业",sortable:"","show-overflow-tooltip":""}})],1),t._v(" "),l("el-col",{staticClass:"toolbar",attrs:{span:24}},[l("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",small:"",layout:"prev, pager, next","page-size":10,total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]},r=l("VU/8")(o,s,!1,null,null,null);e.default=r.exports}});
//# sourceMappingURL=31.be63bb5decc3ddb5aeaf.js.map