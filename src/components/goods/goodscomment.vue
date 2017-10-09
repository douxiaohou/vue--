
<!--shop component-->
<template>
<!--根元素-->
	<div id="temp">
		<comment :id="id"></comment>
	</div>

</template>

<script>
	import comment from '../comment/comment.vue';
	export default{
		components:{ // 注意： 因为我们定义的comment  是一个子组件 里面的props 对象是单向数据流的  只能接收父组件传过来的值  所以 我们可以通过 一个父组件作为中间桥梁来传递id值  否则直接通过路由传递的话  会接收不到传过来的id值
			comment
		},
		data(){
			return {
				id:0
			}
		},
		created(){
			this.id = this.$route.params.id;
		}
	}	
</script>
	

<style scoped>	
	
</style>