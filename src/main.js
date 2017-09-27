// 1 导入vue核心包   这个是固定的写法
import Vue from 'vue';

// 2 导入App.vue的vue对象
import App from './myapp.vue';
//导入vue 中ajax请求数据插件
import VueResource from 'vue-resource';
Vue.use(VueResource);
// 导入图片预览自动放大插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 3 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 4. 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);
// 导入日期格式化依赖包
import moment from 'moment';
// 注册filter 时间过滤器规则
Vue.filter('datefmt', function(input, fmtstring){
	return moment(input).format(fmtstring)
})

// 5. 导入路由规则对应的组件对象
import home from './components/home/home.vue'; // 首页
import shopcar from './components/shopcar/shopCar.vue';// 购物车
import newslist from './components/news/newslist.vue';//新闻资讯列表
import newsinfo from './components/news/newsinfo.vue';// 新闻资讯列表信息
import photoshare from './components/photoshare/photoshare.vue';// 图片分享列表
import photoinfos from './components/photoshare/photoinfos.vue';// 图片分享详细信息
import goodslist from './components/goods/goodslist.vue';// 图片分享详细信息

// 6. 定义路由规则
var router1 = new vueRouter({
	routes:[
		{path:'/',component:home}, 
		{path:'/home',component:home}, 
		{path:'/shopcar',component:shopcar},
		{path:'/news/newslist',component:newslist},
		{path:'/news/newsinfo/:id1',component:newsinfo},
		{path:'/photo/photoshare/',component:photoshare},
		{path:'/photo/photoinfo/:imgid',component:photoinfos},
		{path:'/goods/goodslist/',component:goodslist}
	]
 });


// 7. 使用mint-ui
import mintUi from 'mint-ui';
import 'mint-ui/lib/style.min.css'
//  将 mint-ui 对象绑定到vue对象上
Vue.use(mintUi);
// 8 使用mui
import '../statics/mui/css/mui.css';

//  引入自定义的全局css
import '../statics/css/site.css';


// 9. 利用Vue对象进行解析渲染
new Vue({
	el:'#app',// 这里的#app 是index1中的元素
	router:router1,
	
	//  意思是定义 所有的 子组件 都依赖于 myapp这个模块进行渲染
	//  而myapp 将定义为主组件
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});