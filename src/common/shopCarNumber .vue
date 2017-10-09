
<!--shop component-->
<template>
<!--根元素-->
	<div id="temp">
		<template>
	<div id="subtmpl">
		 <div class="inleft div" @click="substrict">-</div>
		<div class="incenter div" v-text="count"></div>
		<div class="inright div"  @click="add">+</div>
	</div>
</template>
	</div>

</template>

<script>
// 导入公共对象vm 获取保存在vm对象中的 购物车数据的数量值
		import {vm,buycount} from './vm.js';	
	export default{
		
		// 通过props对象 获取 购物车父组件传递过来的 购物数量 和购物的id
		props:['initCount','goodsid'],
		data(){
			return {
				// 默认初始值是1 购物数量
				count :1,
				resObj:{'goodsid':0,'type':'add'}
			}
		},	
		created(){
			//  将接收自父组件的购物数量 赋值count
			this.count = this.initCount;
		},
		methods:{
			substrict(){
				this.count--;
				if(this.count <=1){
					this.count = 1;
				}
				vm.$emit(buycount,-1); //同步更新 vm中的数值
				this.sendcount('substrict');
			},
			add(){
				this.count++;
				vm.$emit(buycount,-1);
				this.sendcount('add');
			},
			sendcount(type){
				this.resObj.type = type; //判断传入的 类型
				this.resObj.goodsid = this.goodsid;
				// 向父组件传递值的方法 $edit(参数一,参数二)
				//  参数一自定义的键，参数二是要传递的对应的value值
				this.$emit('carNewData',this.resObj)
			}
		}
	}	
</script>
	

<style scoped>	
	#subtmpl .div{
		width: 40px;
		height: 25px;
		line-height: 25px;
		border: 1px solid #000;
		display: inline-block;
		text-align: center;
		cursor: pointer;
	}
</style>