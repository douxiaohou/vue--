
<!--shop component-->
<template>
<!--根元素-->
	<div id="temp">
		<!--图文 list begin  -->
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList">
				<!-- 动态绑定带有参数的路由 规则  重点记忆 -->
					<router-link v-bind="{to:'/news/newsinfo/' + item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>{{item.zhaiyao}}</p>
						</div>
						<div class="ft">
							 <span>发表时间:{{item.add_time |datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
	                         <span>点击数:{{item.click}}</span>
						</div>
					</router-link>	
				</li>		
			</ul>
			<!--图文 list end  -->
	</div>

</template>

<script>
// 实现api域名的动态绑定 因为在开发中可能会有测试域名 开发域名 和上线域名
	import common from '../../common/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				newsList:[]
			}
		},
		created(){	
			this.getNews();
		},
		methods:{
			getNews(){
				var url = common.apidomain+'/api/getnewslist';
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status!=0){
						Toast(data.message);
					}
					this.newsList = data.message;
				})
			}
		}
	}	
</script>
	

<style scoped>	
	 .mui-table-view img{
        height:80px;
        width:80px;
    }

    .mui-table-view .mui-media-object{
        max-width: 80px;
        line-height: 80px;
    }

    .ft{
        margin-top: 1.5em;
        font-size: 14px;
        color:#0094ff;
    }

    .ft .click{
        margin-left: 30px;
    }
</style>