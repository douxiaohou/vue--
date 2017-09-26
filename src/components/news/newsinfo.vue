
<!--shop component-->
<template>
<!--根元素-->
	<div id="temp">
		<!--信息内容 begin  -->
		<div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content">

        </div>
        <!-- 评论区域 begin-->
        	<!-- 组件集成的 的方式  引入一个子组件 绑定id 因为每一个详情页的评论是不一样的 -->
			<comm :id="id"></comm>
	</div>

</template>

<script>
//导入需要的组件 模块
import comm from '../comment/comment.vue';
// 实现api域名的动态绑定 因为在开发中可能会有测试域名 开发域名 和上线域名
import common from '../../common/common.js';
	export default{
		components:{ //引入相应的组件之后 需要注册 这里的名字必须和导入时自定义的名字一样  即 comm
			comm
		},
		data(){
			return{
				id:0,
				info:{}
			}
		},
		created(){
			//在生命周期函数中获取动态id的参数  这里的id1要和 main.js中的锚点参数id1一致  
			this.id = this.$route.params.id1;
			this.getInfo();
		},
		methods:{
			getInfo(){
				var url = common.apidomain+'/api/getnew/' + this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status!=0){
						alert(data.message);
					}
					this.info = data.message[0];
				})
			}
		}
	}	
</script>
	

<style scoped>	
	 .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,.content{
        padding: 5px;
    }
</style>