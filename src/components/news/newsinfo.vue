
<!--shop component-->
<template>
<!--根元素-->
	<div id="temp">
		 <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content">

        </div>
	</div>

</template>

<script>
	export default{
		data(){
			return{
				id:0,
				info:{}
			}
		},
		created(){
			//在生命周期函数中获取动态id的参数  这里的id1要和 main.js中的锚点参数id1一致  
			this.id = this.$route.params.id1;
			this.getInfo();
		},
		methods:{
			getInfo(){
				var url = 'http://182.254.146.100:8899/api/getnew/' + this.id;
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status!=0){
						alert(data.message);
					}
					this.info = data.message[0];
				})
			}
		}
	}	
</script>
	

<style scoped>	
	 .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,.content{
        padding: 5px;
    }
</style>