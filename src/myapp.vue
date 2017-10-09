
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
					<span class="mui-icon mui-icon-email"></span>
					<span class="mui-tab-label">会员</span>
				</router-link>
				<router-link class="mui-tab-item" to="/shopcar/car">
					<span class="mui-icon mui-icon-contact"><span id="shopCount" class="mui-badge">0</span></span>
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
	import {setItem,valueObj,getItem} from './common/locoldata.js';
	// 导入公共对象vm 获取保存在vm对象中的 购物车数据的数量值
	import {vm,buycount} from './common/vm.js';
	// 利用 vm.$on() 来注册 buycount这个常量代表的事件
	vm.$on(buycount,function(count){
	//1.0 将count值追加到购物车中
		var badgeobj = document.querySelector('#shopCount');
		badgeobj.innerText = parseInt(badgeobj.innerText) + count;
	});
	// 2.实现页面刷新后 购物车数据不丢失
	window.onload = function(){
		var shopCount = document.querySelector('#shopCount');
		var count = getItem();
		var scount =0; 
		for(var i=0;i<count.length;i++){
			var tem = count[i];
			 scount+= tem.goodscount
		}
		shopCount.innerText = parseInt(shopCount.innerText) + scount;
	}
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