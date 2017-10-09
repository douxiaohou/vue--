<template>
	<div id="temp">
	  <!--1.0 商品轮播图-->
		<div class="silder">
		<silder :imgs="imgs"></silder>
		</div>

		<!--2.0 实现商品购买区-->
		<div id="buy">
			<h4 v-text="info.title"></h4>
			<p class="line"></p>
			<ul>
				<li class="price">
					市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
				</li>
				<li class="shopcount">
				<!-- 绑定 sendData 到 getcount 这个方法中 即把sendData的值挂载到getcount方法中 -->
					<div>购买数量：</div><inputcar v-on:sendData = "getcount"></inputcar>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click = "toshopcar">加入购物车</mt-button>
					<transition
					@befor-enter="beforEnter" @enter ="enter" @after-enter="afterEnter"
					>
						<div v-if="isshow" class="ball"></div>
					</transition>
				</li>
			</ul>
		</div>

		<div id="params">
				<h6>商品参数</h6>
				<p class="line"></p>
			<ul>
				<li>商品货号：{{info.goods_no}}</li>
				<li>库存情况：{{info.stock_quantity}}</li>
				<li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
			</ul>
		</div>

		<!--3.0 图文详情-->
		<div id="other">
		<router-link v-bind="{to:'/goods/goodsdesc/'+ id}">
			<mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
		</router-link>
		<!--4.0 商品评论-->
		<router-link v-bind="{to:'/goods/goodscomment/'+ id}">
			<mt-button type="danger" size="large">商品评论</mt-button>
		</router-link>
		</div>

	</div>
</template>

<script>
	//导入保存购物车 id和购买数量的方法
	import {setItem,valueObj} from '../../common/locoldata.js';
	// 因为购物详情页中的加入购物车和页面底部的加入购物车页面不是父子组件的关系，所以我们这里采用一个技巧，新建一个公共的vm对象，把这两个页面需要共享的数据都保存到公共的vm对象中，然后引入这个公共对象，就可以获取里面的共享数据。
	//导入公共对象vm 这里的buycount是定义在公共vm.js中 这里的$emit()方法的 键是在vm.js中定义为一个常量的方式绑定事件的，使用vm对象 作为一个公共的存储区域  可以使vm对象中的数据在其他的组件中进行共享
	import {vm,buycount} from '../../common/vm.js';
	import comment from '../comment/comment.vue';
	import common from '../../common/common.js';
	import inputcar from '../../common/inputnumber.vue';
	import silder from '../../common/slider.vue';
	import { Toast } from 'mint-ui';

	export default{
		// 注册轮播图组件
		components:{silder,inputcar},
		data(){
			return {
				isshow:false,// 控制小球的初始状态 为隐藏
				id : 0,  //表示商品id
				inputnum:1,
				imgs:[],// 存储轮播图的数据
				info:{
				// api响应回来的 数据的格式
//					"id": 87,
//					"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
//					"add_time": "2015-04-19T16:51:03.000Z",
//					"goods_no": "SD9102356032",
//					"stock_quantity": 60,
//					"market_price": 2499,
//					"sell_price": 2195
				}  // 存储商品的详细信息
			}
		},
		created(){
			//获取url传入的商品id值 并保存到 data中的id中
			this.id = this.$route.params.id;
			this.getimgs();
			this.getinfo();
		},

		methods:{
			// 购物小球动画实现
			beforEnter(el){
				el.style.transform="translate(0px,0px)";
			},
			enter(el,done){
				el.offsetWidth;
				el.style.transform="translate(175px,395px)";
				done();
			},
			afterEnter(el){
				this.isshow = !this.isshow;
			},
			// A.获取子组件传递过来的count值
			// 用count参数 接收子组件$emit(key,value) 中的键value值
			getcount(count){
				// 将子组件传递过来的数据 保存到 data定义的inputnum中
				this.inputnum = count;
			},
			//B. 点击加入购物车事件
			toshopcar(){
				//将获取来的子组件的值通过$emit()方法保存到公共的对象vm中 保存加入购物车数据的数量
				vm.$emit(buycount,this.inputnum)
				// 将商品的id 赋值给goodsid
				valueObj.goodsid = this.id;
				// 将 加入到购物车的 商品的数量count 保存到 goodscount中
				valueObj.goodscount = this.inputnum;
				// 将 valueObj 对象 通过 setItem()方法保存到 本地存储localStorage中
				setItem(valueObj);
				// this.arrobj = getItem();
				// console.log(getItem())
				//3.0 实现小球动画
				this.isshow = !this.isshow;
			},
			//1.0 获取商品详细描述
			getinfo(){
				var url = common.apidomain +'/api/goods/getinfo/'+this.id;
				this.$http.get(url).then(function(res){
					//这里的message 是一个数组
					this.info =res.body.message[0];
				});
			},
			//2.获取轮播图 信息
			getimgs(){
				var url  = common.apidomain + '/api/getthumimages/'+this.id;
				this.$http.get(url).then(function(res){
					//判断状态
				this.imgs =res.body.message;
				});
			}
		}
	}

</script>

<style scoped>
 .silder{
	 border:1px solid rgba(0,0,0,0.4);
	 border-radius: 5px;
	 margin: 5px;
 }

	#buy,#params,#other
	{
		margin: 5px;
		padding: 5px;
		border:1px solid rgba(0,0,0,0.4);
		border-radius: 5px;
	}
 .line{
		height: 1px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	#buy ul,#params ul{
		padding-left: 0px;
	}
 #buy h4{
	 color:#0094ff;
	padding: 5px;
 }
 #buy li,#params li{
	 list-style: none;
	 padding: 8px;
	 position: relative;
 }

	#buy .price span{
		color:red;
	}

	#other .imgdesc{
		margin-bottom: 20px;
	}
	/*购买数量*/
	.shopcount{
		height: 100px;
		line-height: 20px;
	}

	/*购物小球样式*/
	.ball{
		background-color: red;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		position: absolute;
		left:60px;
		top:-26px;
		transition: all 0.5s ease;
		z-index: 100;
	}
</style>