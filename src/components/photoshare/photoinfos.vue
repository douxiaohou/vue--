
<!--photoinfos component-->
<template>
<!--根元素-->
	<div id="temp">
		<!--1.0 实现的是图片详情和缩略图-->
		<div id="desc">
			<!--图片详情- 标题部分-->
			<div  class="title">
				<h4>{{imginfo.title}}</h4>
				<p>
				 {{imginfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  {{imginfo.click}}次浏览
				</p>
				<p class="line"></p>
			</div>

			<!--缩略图-->
			<div  class="mui-content">
				<ul class="mui-table-view mui-grid-view mui-grid-9">
					<li v-for="(item,index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)"
								 >
					</li>

				</ul>
			</div> 

			<!--图片详情- 摘要部分-->
			<p v-html="imginfo.content"></p>
		</div>

		<!-- 评论 begin -->
		<comment :id="id"></comment>
	</div>

</template>

<script>
	import comment from '../comment/comment.vue';
	import common from '../../common/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				id:0,
				imginfo:{},
				list:[]
			}
		},
		components:{ // 导入组件了  那就必须注册组件才能使用哦
			comment
		},
		created(){
			this.id = this.$route.params.imgid;
			this.getimageInfo();
			this.getthumimages();
		},
		methods:{
			//1.获取图片详情的信息内容	
			getimageInfo(){
				// api格式：api/getimageInfo/:imgid
				var url = common.apidomain+'/api/getimageInfo/'+this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
					}
					this.imginfo = data.message;
					
				})
			},
			//2.获取详细信息的缩略图
			
			getthumimages(){
				// api 格式:/api/getthumimages/:imgid
				var url = common.apidomain + '/api/getthumimages/'+this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					
					if(data.status != 0){
						Toast(data.message);
					}
					// 使用preview图片预览插件的时候 需要两个值  w 和 h(固定格式) 解决的方式：
					//方法一：是让后台在返回的数据中加上这两个属性
					// 方法二：将这两个属性值写死 

					//下面的方面 第一张之后的图片的w和h会失效 
					data.message.forEach(function(item){
					//当前所有图片不管有多大都设置为宽高为400，就会导致图片失真了，所以应该按照图片的实际尺寸来设置
						var img = document.createElement('img');
						//img.src = item.src;
						item.h = 400;
						item.w = 400;
					});
					console.log(data);
					this.list = data.message;
				})
			}
		}
	}	
</script>
	

<style scoped>	
	
</style>