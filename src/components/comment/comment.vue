



<!--shop component-->
<template>
<!--根元素-->
	<div>
		<!--评论组件-->
		<!--1.0 实现提交评论数据到服务器的静态结构-->
		<div id="postcomment">
			<h3>提交评论</h3>
			<p class="p"></p>
			<textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
			<mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
		</div>

		<!--2.0 实现获取评论数据列表-->
		<div id="list">
			<h3>评论列表</h3>
			<p class="p"></p>
			<div v-for="(item,index) in list">
				<div class="title">
					<span>第{{index + 1}}楼:</span>
					<span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-text="item.content"></li>
				</ul>
			</div>
		</div>

		<!--3.0 实现获取更多按钮-->
		 <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button> 
	</div>

</template>

<script>
	import common from '../../common/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				postcontent:'',// 双向数据绑定 获取 输入框的内容
				list:[], //定义一个数组  保存提交到数据库中的评论数据
				pageindex:1
			}	
		},
		props:['id'], //作用是用来接收父组件传入过来的id值
		created(){
			this.getcomment(this.pageindex);
		},
		methods:{
			//1.提交数据到 数据库 并保存到list数组中
			//http://182.254.146.100:8899/api/getcomments/13?pageindex=1  查看数据提交后的结果
				postcomment(){
					//客户端提交过来的数据必须进行判断  防止出现不必要的bug
					// trim() 过滤掉 空格
					if(this.postcontent.trim().length<=0){
						Toast('您要评论的内容不能为空');
						return;
					}
					var url = common.apidomain+'/api/postcomment/'+this.id;
					//{emulateJSON:true} post请求固定格式 必须加这一句
					this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).
					then(function(res){
						var data=res.body;
						if(data.status == 0){
							Toast(data.message);
						}
						this.postcontent = '';
						console.log(data)
					})	
				},
				//2.获取数据库中的数据 get请求
				getcomment(pageindex){
					//pageindex:代表的是当前获取的是哪一页的数据，默认值是1
					pageindex = pageindex || 1;//为了确保有值 学习下
					// http://182.254.146.100:8899/api/getcomments/13?pageindex=1 获取数据的地址格式
					var url = common.apidomain+'/api/getcomments/'+this.id+'?pageindex='+pageindex;
					this.$http.get(url).then(function(res){
						if(res.body.status != 0 ){
							Toast(res.body.message);
							return;
						}
						//将message数组中的数据赋值给this.list
						//  每一条评论都是一个数组  调用concat方法将每个数组拼接成一个数组
						this.list = this.list.concat(res.body.message);
					}) 
				},
				//3.0 实现加载更多的方法
				getmore(){
				//1.0 实现this.pageindex值的增加1
					this.pageindex++;
					console.log(this.pageindex);

				//2.0 获取当前this.pageindex值对应的分页数据
					this.getcomment(this.pageindex);

				}				
		}		
		
	}	
</script>
	

<style scoped>	
	#postcomment{
	padding: 5px;
}
	 .p{
		height: 1px;
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.3);
	}

	/*2.0 评论列表的样式*/
#list{
	padding: 5px;
}
.title{
	padding: 5px;
	color: #6d6d72;
	font-size: 15px;
	background-color: rgba(0,0,0,0.1);
}
</style>