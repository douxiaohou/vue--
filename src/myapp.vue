
<!--项目的根组件-->
<template>
<!--根元素-->
	<div>
		<!-- header begin-->
		<mt-header fixed title="Vue项目商场 begin"></mt-header>

		<!-- content begin-->
		<router-view></router-view>

		<!-- footer begin-->
		<div>
			<nav class="mui-bar mui-bar-tab">
				<router-link class="mui-tab-item mui-active" to="/home">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
				<router-link class="mui-tab-item" to="/tabbar-with-chat">
					<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
					<span class="mui-tab-label">会员</span>
				</router-link>
				<router-link class="mui-tab-item" to="/shopcar">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">购物车</span>
				</router-link>
				<router-link class="mui-tab-item" to="/tabbar-with-map">
					<span class="mui-icon mui-icon-gear"></span>
					<span class="mui-tab-label">搜索</span>
				</router-link>
			</nav>
		</div>

	</div>

</template>

<script>
		// ES6中导出的语法 结构
	export default{
		data(){		//等价于ES5中的 data:function(){msg:'hello'}
			return {
				msg:'hello'
			}	
		},
		methods:{

		},
		created(){// 也是ES6中的写法

		}
	}	
</script>
	

<style scoped>	
	/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
	
</style>