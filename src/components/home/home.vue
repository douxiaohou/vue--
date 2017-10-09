<template lang="html">
    <div id="temp">
        <!-- 轮播图 begin -->
        <!-- <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in listImg" :key="item.id">
                <img v-bind:src="item.img">
            </mt-swipe-item>
        </mt-swipe> -->
        <slider :imgs = "listImg"></slider>
        <!--  菜单 list begin-->
        <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/news/newslist">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/photo/photoshare">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/goods/goodslist">
                            <span class="mui-icon mui-icon-chatbubble"></span>
                            <div class="mui-media-body">商品购买</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/feedback">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">留言反馈</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/video">
                            <span class="mui-icon mui-icon-search"></span>
                            <div class="mui-media-body">视频专区</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/callme">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">联系我们</div>
                        </router-link>
                    </li>
                </ul>
        </div>
        <!--  菜单 list end-->
            
    </div>
</template>

<script>
// 实现api域名的动态绑定 因为在开发中可能会有测试域名 开发域名 和上线域名
import common from '../../common/common.js';
import slider from '../../common/slider.vue'
import { Toast } from 'mint-ui';
export default {
    components:{
        slider
    },
    data(){
        return {
            listImg : []
        }
    },
    created : function(){
        // 当页面中的data和methods对象都创建完毕之后，就会自动调用created方法
        this.getImgs()
    },
    methods : {
        getImgs(){
            // 实现轮播组件中的数据请求
            var url = common.apidomain+'/api/getlunbo';
            this.$http.get(url).then(function(res){
                var data = res.body;
                console.log(data)
                // 错误处理
                if (data.status != 0) {
                    Toast(data.message);
                    return ;
                }
                this.listImg = data.message;
            })
        }
    }
}
</script>

<style lang="css" scoped>
    
    /* 菜单 list begin */
    .mui-content,.mui-content ul{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right:0px;
        border-bottom:0px;
    }
    .mui-grid-view.mui-grid-9{
        border-top:0px;
        border-left:0px;
    }
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content: '';
        display: inline-block;
        width: 50px;
        height: 50px;
        background-repeat: round;
    }

    .mui-icon-home:before{
        background-image: url(../../../statics/imgs/1.png);
    }

    .mui-icon-email:before{
        background-image: url(../../../statics/imgs/2.png);
    }
    .mui-icon-chatbubble:before{
        background-image: url(../../../statics/imgs/3.png);
    }
    .mui-icon-location:before{
        background-image: url(../../../statics/imgs/4.png);
    }
    .mui-icon-search:before{
        background-image: url(../../../statics/imgs/5.png);
    }
    .mui-icon-phone:before{
        background-image: url(../../../statics/imgs/6.png);
    }
</style>
