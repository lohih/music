<template>
  <div class="topNav">
    <div class="LoginTop">
      <!-- &#xe60a; -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <button class="btn"><router-link :to="{ path: '/login' }"> {{ text }}</router-link></button>
    </div>
    <div class="swiperTop">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="item in swiperData" :key="item.pid">
          <van-image radius="20px" :src="item.pic" class="img"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="musicList">
      <div class="musicTop">
        <div class="title">发现好歌单</div>
        <div class="more">
          查看更多
        </div>
      </div>
      <div class="musciContent">
        <van-swipe :loop="false" :width="120" class="my-swpie" :show-indicators="false">
          <van-swipe-item v-for="(item, id) in musicList" :key="id">
            <router-link :to="{ path: '/about', query: { id: item.id } }">
              <img :src="item.picUrl" alt="" />
              <span class="playCount">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-play"></use>
                </svg>
                <span class="count">{{ changeCount(item.playCount) }}</span>
              </span>
              <span class="name">{{ item.name }}</span>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList" :key="i">
        <div class="itemLeft">
          <span class="leftSpan">{{ i + 1 }}</span>
        </div>
        <div class="name">
          <router-link
            :to="{ path: '/music', query: { id: item.id, item: i, picUrl: item.al.picUrl, ar: item.ar, name: item.al.name } }">
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index" class="name1">
              {{ item1.name }}
            </span>
          </router-link>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-os-icon-3line"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 首页轮播的数据
      swiperData: [],
      // 获取歌单列表
      musicList: [10],
      // 获取歌单
      itemList: [],


    }
  },
  computed: {
    text() {
      var myToken = localStorage.getItem("Login");
      if (myToken) {
        return "曾泉龙，你好";
      } else {
        return "请登录";
      }
    },
  },
  methods: {
    // 轮播的方法
    getBanner() {
      this.axios({
        // 请求数据的类型
        method: "get",
        // 请求数据的接口地址
        url: 'http://localhost:3000/banner?type=2',
      }).then((res) => {
        console.log("拿到轮播图的数据===>", res);
        // 拿到数据，存储起来
        this.swiperData = res.data.banners;
        console.log(this.swiperData)
      });
    },
    // 歌曲列表的方法
    getGnedan() {
      this.axios({
        // 请求数据的类型
        method: "get",
        // 请求数据的接口地址url:"/personalized?limit=10"
        url: 'http://localhost:3000/personalized?limit=10',
      }).then((res) => {
        console.log("拿到歌曲列表的数据===>", res);
        // 拿到数据，存储起来
        this.musicList = res.data.result;
        console.log(this.musicList)
      });
    },
    // 获取单条歌曲
    getMusic() {
      this.axios({
        // 请求数据的类型
        method: "get",
        // 请求数据的接口地址2230318386
        url: " http://localhost:3000/playlist/track/all?id=2230318386&limit=20&offset=0",
      }).then((res) => {
        console.log("获取歌曲详情页的数据===>", res);
        // 拿到数据，存储起来
        this.itemList = res.data.songs;
        console.log(this.itemList, 11);
      });
    },

    // 统计播放量
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿"
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万"
      }
    },
    // 跳转页面
    changePage() {
      this.$router.push("/itemMusic");
    }
  },
  created() {
    this.getBanner();
    this.getGnedan();
    this.getMusic();
  },

}
</script>

<style  scoped>
.LoginTop {
  display: flex;
  /* justify-content: space-between; */
}

.LoginTop .icon {
  width: 50px;
  height: 30px;
}

.btn {
  height: 30px;
  background-color: cornflowerblue;
  border-radius: 50px;
  /* position: relative; */
  /* left: 270px; */
  margin: 0px 0px 5px -5px;
}

.topNav {
  width: 100%;
  height: 100px;
  padding-top: 10px;
  position: relative;
}


.img {
  height: 200px;
  width: 100%;
}

.musicList {
  width: 100%;
  height: 250px;
  padding-top: 20px;
}

.musicList .musicTop {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.musicList .musicTop .title {
  font-size: 20px;
  font-weight: 900;
  padding-left: 10px;
}

.musicList .musicTop .more {
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 20px;
}

.musicList .musciContent {
  width: 100%;
  height: 180px;
  display: flex;
  overflow-y: auto;
  text-align: center;
}

.musicList .musciContent .my-swpie {
  height: 100%;
  position: relative;
}

.musicList .musciContent .my-swpie img {
  width: 110px;
  height: 130px;
  border-radius: 10px;
}

.playCount {
  border-radius: 10px;
  background-color: rgba(19, 19, 19, 1);
}

.count {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 12px;
  color: rgb(246, 247, 250);
}

.playCount .icon {
  height: 15px;
  width: 20px;
  position: absolute;
  right: 55px;
  top: 5px;
  font-size: 10px;
  color: rgba(246, 247, 250, 1);
}

.name {
  color: black;
}

.musicList .musciContent span {
  font-size: 10px;
  align-items: center;
  opacity: 1;
}

.itemList {
  position: relative;
  top: -20px;
  height: 1050px;
}

.itemList .item {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.itemLeft {
  height: 50px;
  width: 50px;
  /* background: aqua; */
  padding-top: 10px;
}

.leftSpan {
  padding-left: 20px;
}

.itemList .name {
  /* margin-bottom: 5px ; */
  width: 200px;
  height: 80px;
  position: absolute;
  left: 50px;
  font-size: 13px;
  font-weight: 700;
}

.icon {
  height: 20px;
  width: 30px;
}

.itemList .name .name1 {
  font-size: 10px;
  color: #ccc;
}
</style>
