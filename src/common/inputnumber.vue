
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
	export default{
		data(){
			return {
				count :1
			}
		},
		methods:{
			substrict(){
				this.count--;
				if(this.count <=1){
					this.count = 1;
				}
				this.sendcount();
			},
			add(){
				this.count++;
				this.sendcount();
			},
			sendcount(){
				// 向父组件传递值的方法 $edit(参数一,参数二)
				//  参数一自定义的键，参数二是要传递的对应的value值
				this.$emit('sendData',this.count)
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