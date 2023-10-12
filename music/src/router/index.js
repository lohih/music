import Vue from 'vue'
import VueRouter from 'vue-router'
import HotMusic from '../views/HotMusic.vue'
import MusicList from '../views/MusicList.vue'
import PlayMusic from '../views/PlayMusic.vue'
import LoginPage from '../views/LoginPage.vue'
import MyVie from '../views/MyVie.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HotMusic
  },
  {
    path: '/about',
    name: 'about',
    component: MusicList
  },
  {
    path: '/music',
    name: 'music',
    component: PlayMusic
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    // 配置路由元信息
    meta: {
      isTab:true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: MyVie
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由页面每一次切换都会触发
router.afterEach((to,from) => {
  console.log("to===>",to);
  console.log("from===>",from);
  if(to.path === "/login") {
    // 去浏览器的缓存中我们的token值，如果这个值存在
    var Mytoken = localStorage.getItem("Login");
    // 判断 token值存在 直接去到我的页面
    if(Mytoken) {
      router.push("/")
    }
  }
})

export default router
