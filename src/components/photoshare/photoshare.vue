
<!--shop component-->
<template>
<!--根元素-->
	<div id="temp">
		 <!--1.0 图片分类 顶部的导航条分类-->
		<div id="cate">
			<ul v-bind="{style:'width:'+ulWidth+'px'}">
				<li @click="getImages(0)">全部</li>
				<li v-for="item in cates" @click="getImages(item.id)">{{item.title}}</li>
			</ul>
		</div>

		<!--2.0 图片列表-->
		<div id="imglist">
			<ul>
				<li v-for="item in list">
					<router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
					<img v-lazy="item.img_url">
					<div id="desc">
						<h5 v-text="item.title"></h5>
						<p v-text="item.zhaiyao"></p>
					</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	import common from '../../common/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				cates:[],
				list:[],
				ulWidth:320
			}
		},
		created(){
	//		1.0 获取图片分类数据
			this.getCates();

	//		2.0 加载图片数据
			var all = 0; //0表示获取所有数据
			this.getImages(all);
		},
		methods:{
			//当点击每一个图片分类的按键的时候  传递一个唯一的id  获取对应的分类的数据列表
			getImages(cateid){
				cateid = cateid || 0;
				var url = common.apidomain+'/api/getimages/'+cateid;
				this.$http.get(url).then(function(res){
					var data = res.body;
					//console.log(data);
					this.list = data.message;

				})
			},
			// 过去顶部导航条的 图片分类的数据  并把数据保存到cates数组中
			getCates(){
				var url = common.apidomain+'/api/getimgcategory';
				this.$http.get(url).then(function(res){
					var data = res.body;
					//console.log(data);
					if(data.status != 0){
						Toast(data.message);
						return;
					}
					this.cates = data.message;
					//实现当前分类数据所在的ul的总宽度 = 分类个数 * 每个分类数据的宽度
					var w = 62;
					//返回的message是一个数组
					var count = data.message.length + 1;
					this.ulWidth = w * count ;
				})
			}
		}
	}	
</script>
	

<style scoped>	
	/*1.0 图片分类*/
	#cate{
		width: 375px;
		max-width: 375px;
		overflow-x: auto;
	}
	#cate ul{
		margin: 0px;
		padding-left: 10px;
	}
	#cate li{
		cursor: pointer;
		list-style: none;
		display: inline-block;
		color:#0094ff;
		font-size: 14px;
		padding-left: 6px;
	}

	/*实现图片列表样式*/
	#imglist{

	}
	#imglist ul {
		padding-left: 0px;
	}
	#imglist li{
		list-style:none;
		position: relative ;
	}
	#imglist img{
		width:100%;
		height: 300px;
	}

	#desc{
		width: 100%;
		background-color: rgba(0,0,0,0.2);
		position: absolute;
		bottom: 2px;
		left: 0px;
	}

#desc h5{
	color: #ffffff;
	font-weight: bold;
}
#desc p{
	color:#fff;
}
/*实现图片的懒加载 组件中的固定用法*/
image[lazy=loading] {
	width: 40px;
	height: 300px;
	margin: auto;
}
</style>