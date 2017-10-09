<template>
	<div id="temp">
		<div class="row" v-for="(item,index) in datalist">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img class="img" :src="item.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li> <!-- v-on:sendCount = "getCarCoun" -->
						<!-- 把请求过来的数据中的cou值通过props传递给子组件 -->
							<shopcomponent :initCount="item.cou" :goodsid="item.id" v-on:carNewData="getInputData"></shopcomponent>
						</li>
						<li><a href="#">删除</a></li>
					</ul>

				</div>
			</div>
		</div>
		<!--计算价格 begin  -->
		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品X件,总价:￥4999元</li>
				</ul>
			</div>
			<div id="button">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
		{{value}}
	</div>
</template>

<script>
	//引入购物车  加减购物数量组件
	import shopcomponent from '../../common/shopCarNumber .vue';
	import {getGoodsData,updateData} from '../../common/locoldata.js';
	import common from '../../common/common.js';
	import { Toast } from 'mint-ui';
	export default{
		components:{
			shopcomponent
		},
		data(){
			return {
				totalAmount:0, // 初始化总价格
				// value 值来控制 购物车里的上面列表 前的按钮 是否勾选上
				value:[],
				// 保存api响应回来的数据 及 格式
				datalist:[
					/*{
						"cou": 1,
						"id": 87,
						"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
						"sell_price": 2195,
						"thumb_path": "http://www.webhm.top:8080/upload/201504/20/thumb_201504200046594439.jpg"
					}*/
				]
			}
		},
		created(){
			//调用方法获取购物车列表数据
			this.getGoodsList();
		},
		computed:{
			//计算购物车中所有商品中的总价格
		},
		methods:{
			// 根据绑定carNewData子组件  传递回来子组件最新的数据obj 更新datalist 中的数据
			getInputData(obj){
				//A根据子组件传递回来的数据 更新本地数据
				updateData(obj)
				//B更新datalist 中的数据  //obj的格式：{goodsid:87,type:'add'}
				for(var i = 0;i <this.datalist.length ; i++){
					if(this.datalist[i].id == obj.goodsid){
						if(obj.type =='add'){
							this.datalist[i].cou = this.datalist[i] + 1;
						}else{
							this.datalist[i].cou = this.datalist[i] - 1;
						}
						break;
					}
				}
			},
			getGoodsList(){
				// 调用引用的getGoodsData()方法获取本地存储的数据,数据data=> 格式{ 88:2,89:1}
				var data = getGoodsData();
				var idStr ='';
				for(var k in data){
					idStr += k +','; 
				}
				idStr = idStr.substring(0,idStr.length-1); // 截取字符串  从索引0开始截取到长度减一

				//3. ajax请求这个api获取到完整的商品数据信息赋值给this.datalist
				var url  = common.apidomain + '/api/goods/getshopcarlist/'+idStr;
				this.$http.get(url).
				then(function(res){
					var body = res.body
					//状态值的判断
					if(body.status != 0 ){
						Toast(body.message);
						return;
					}
					// 更新api接口数据中的 cou值 为了让子组件shopcomponent 获取最新的api中的数据 然后更新组件中的购买数量
					body.message.forEach(function(item){
						//data数据格式=> { 88:2,89:1}
						//通过item.id找到 本地传输过来的数据data对应的id值 通过id这个key 获取对应的 data中的 value  然后赋值给api中的cou
						item.cou = data[item.id]; 
					});
					this.datalist = body.message;
				});
			}
		}
	}
</script>

<style scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 100px;
		display: flex;
		padding: 5px;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		float: left;
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		float: left;
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding:0;
		margin:0;
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}

	.bottom li:last-child{
		margin-left: 5px;
	}

	/* 购物价格 计算*/
	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}

	#total ul {
	 padding-left: 0px;
	}
	#total li{
		list-style: none;
		font-size: 14px;
	}

	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}

	.desc{

		flex:1;
	}
</style>