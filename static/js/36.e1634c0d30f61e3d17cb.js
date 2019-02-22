webpackJsonp([36],{XHO9:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("n5Qe"),a={name:"clubMemberManage",data:function(){return{filters:{name:""},page:1,total:0,listLoading:!1,studentList:[],institute:[],editFormVisible:!1,editForm:{id:0,name:"",sex:-1,grade:15,status:"会员",institute:"金融学",major:"金融学",department:"",mobile:"",email:""},editFormRules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}]},editLoading:!1}},created:function(){this.getStudentList(),this.getInstitute()},methods:{formatSex:function(t,e){return 0==t.sex?"男":1==t.sex?"女":"-"},getInstitute:function(){var t=this;this.$axios.get("/getInstitute").then(function(e){t.institute=JSON.parse(e.data)}).catch(function(t){console.log(t),console.log("获取学院列表出错")})},handleCurrentChange:function(t){this.page=t,this.getStudentList()},getStudentList:function(){var t=this,e={page:this.page,name:this.filters.name,type:1};this.listLoading=!0,Object(o.f)(1,e).then(function(e){var i=e.data,o=i.msg,a=i.code,l=i.data;200==a?(console.log(e),t.total=l.totalCount,t.studentList=l.list,t.listLoading=!1):(t.listLoading=!1,t.$message.error(o),console.log(e))}).catch(function(e){t.$message.error("数据获取失败"),t.listLoading=!1})},handleEdit:function(t,e){this.editFormVisible=!0,this.editForm=e},instituteChange:function(t){this.editForm.major=""},majorChange:function(t){var e,i=this.institute;for(e in i)i.hasOwnProperty(e)&&i[e].indexOf(t)>=0&&(this.editForm.institute=e)},editSubmit:function(){var t=this;this.$refs.editForm.validate(function(e){e&&t.$confirm("确认提交吗？","提示",{}).then(function(){t.editLoading=!0,t.$axios({url:"/editThis",type:"put",data:t.editForm}).then(function(e){t.$message({message:"修改成功",type:"success"}),t.editLoading=!1,t.editFormVisible=!1})})})},handleDel:function(t,e){var i=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then(function(){i.listLoading=!0;var t={id:e.id};i.$axios({url:"/removeThis",type:"post",data:t}).then(function(t){i.listLoading=!1,i.$message({message:"删除成功",type:"success"})})}).catch(function(){})}},computed:{major:function(){var t,e=[],i=this.institute;if(""!=this.editForm.institute)e=i[this.editForm.institute];else for(t in i)i.hasOwnProperty(t)&&(e=e.concat(i[t]));return e}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"officerManageContainer"},[i("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[i("el-form",{attrs:{inline:!0,size:"mini",model:t.filters}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"姓名"},model:{value:t.filters.name,callback:function(e){t.$set(t.filters,"name",e)},expression:"filters.name"}})],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.getStudentList}},[t._v("查询")])],1)],1)],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"tableClass",staticStyle:{width:"100%"},attrs:{data:t.studentList,"highlight-current-row":!0,size:"mini"}},[i("el-table-column",{attrs:{type:"index",width:"55"}}),i("el-table-column",{attrs:{prop:"department",label:"部门","show-overflow-tooltip":"",sortable:""}}),i("el-table-column",{attrs:{prop:"grade",label:"年级",sortable:"",width:"70"}}),i("el-table-column",{attrs:{prop:"name",label:"姓名",sortable:"",width:"80"}}),i("el-table-column",{attrs:{prop:"sex",label:"性别",sortable:"",width:"70",formatter:t.formatSex}}),i("el-table-column",{attrs:{prop:"status",label:"职务","show-overflow-tooltip":"",sortable:"",width:"70"}}),i("el-table-column",{attrs:{prop:"mobile",label:"手机号码","show-overflow-tooltip":"",sortable:"",width:"120"}}),i("el-table-column",{attrs:{prop:"email",label:"邮箱","show-overflow-tooltip":"",sortable:"",width:"150"}}),i("el-table-column",{attrs:{prop:"institute",label:"学院","show-overflow-tooltip":"",sortable:""}}),i("el-table-column",{attrs:{prop:"major",label:"专业","show-overflow-tooltip":"",sortable:""}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.handleDel(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",small:"",layout:"prev, pager, next","page-size":10,total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:t.editFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.editFormVisible=e}}},[i("el-form",{ref:"editForm",attrs:{model:t.editForm,"label-width":"80px",rules:t.editFormRules}},[i("el-form-item",{attrs:{label:"姓名",prop:"name"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.editForm.name,callback:function(e){t.$set(t.editForm,"name",e)},expression:"editForm.name"}})],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"性别"}},[i("el-radio-group",{model:{value:t.editForm.sex,callback:function(e){t.$set(t.editForm,"sex",e)},expression:"editForm.sex"}},[i("el-radio",{staticClass:"radio",attrs:{label:"0"}},[t._v("男")]),t._v(" "),i("el-radio",{staticClass:"radio",attrs:{label:"1"}},[t._v("女")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"年级"}},[i("el-input-number",{attrs:{min:0,max:99},model:{value:t.editForm.grade,callback:function(e){t.$set(t.editForm,"grade",e)},expression:"editForm.grade"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"学院"}},[i("el-select",{on:{change:t.instituteChange},model:{value:t.editForm.institute,callback:function(e){t.$set(t.editForm,"institute",e)},expression:"editForm.institute"}},t._l(t.institute,function(t,e){return i("el-option",{key:e,attrs:{value:e}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"专业"}},[i("el-select",{on:{change:t.majorChange},model:{value:t.editForm.major,callback:function(e){t.$set(t.editForm,"major",e)},expression:"editForm.major"}},t._l(t.major,function(t,e){return i("el-option",{key:e,attrs:{value:t}})}),1)],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"部门",prop:"department"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.editForm.department,callback:function(e){t.$set(t.editForm,"department",e)},expression:"editForm.department"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"职务"}},[i("el-select",{model:{value:t.editForm.status,callback:function(e){t.$set(t.editForm,"status",e)},expression:"editForm.status"}},[i("el-option",{attrs:{label:"会员",value:"会员"}}),t._v(" "),i("el-option",{attrs:{label:"干事",value:"干事"}}),t._v(" "),i("el-option",{attrs:{label:"副部",value:"副部"}}),t._v(" "),i("el-option",{attrs:{label:"正副",value:"正部"}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.editForm.mobile,callback:function(e){t.$set(t.editForm,"mobile",e)},expression:"editForm.mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.editForm.email,callback:function(e){t.$set(t.editForm,"email",e)},expression:"editForm.email"}})],1)],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(e){t.editFormVisible=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.editLoading},nativeOn:{click:function(e){return t.editSubmit(e)}}},[t._v("提交")])],1)],1)],1)},staticRenderFns:[]},n=i("VU/8")(a,l,!1,null,null,null);e.default=n.exports}});
//# sourceMappingURL=36.e1634c0d30f61e3d17cb.js.map