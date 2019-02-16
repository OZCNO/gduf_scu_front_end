<template id="tags">
	<el-col :span="24" class="breadcrumbContainer">
		<strong class="title">{{$route.name}}</strong>
		<el-breadcrumb separator="/" class="breadcrumbInner">
			<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name}}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</el-col>	
</template>