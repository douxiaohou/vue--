
<!--shop component-->
<template>
<!--根元素-->
	<div>
		<mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in imgs" :key="item.id">
                <img v-bind:src="item.img">
            </mt-swipe-item>
        </mt-swipe>
	</div>

</template>

<script>
	export default{
		props:['imgs']
	}	
</script>
	

<style scoped>	
	/* 轮播图 begin  */
    .mint-swipe{
        height: 300px;
    }
    .mint-swipe-item img{
        width: 100%;
        height: 100%
    }
    .mint-swipe-item{
        width: 100%;
        height: 300px;
    }
</style>