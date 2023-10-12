<template>
  <div class="about">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <!-- 使用点击@click="$router.go(-1) 返回上一页 -->
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <!-- 顶部中间的内容 -->
    <div class="itemContent">
      <div class="itemContentLeft">
        <img :src="playlist.coverImgUrl" alt="" class="lim">
        <div class="playCount">
          <svg class="icplay" aria-hidden="true">
            <use xlink:href="#icon-play" style="color:white"></use>
          </svg>
          <span class="count">{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="itemContentRight">
        <div class="name">{{ playlist.name }}
          <div class="nickname" v-if="playlist.name">{{ playlist.creator.nickname }}</div>
        </div>
        <div class="middle">
          <img :src="playlist.coverImgUrl" alt="" class="middleImg">
        </div>
        <div class="Cbottom">持续更新，会把自认为好听的曲子分享给大家</div>
      </div>
    </div>
    <!-- 歌单列表 -->
    <div class="itemMusicList">
      <div class="listTop">
        <span class="topLeft">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </span>
        <div class="topMiddle">播放全部
          <span class="tol">(共{{ itemList.length }}首)</span>
        </div>
        <div class="topRight"><span>
            + 收藏{{ changeCount(playlist.playCount) }}</span></div>
      </div>
      <div class="itemList">
        <div class="item" v-for="(item, i) in itemList" :key="i">
          <div itemLeft>
            <span class="leftSpan">{{ i + 1 }}</span>
          </div>
          <div class="name">
            <router-link :to="{ path: '/music', query: { id: item.id, item: i ,picUrl:item.al.picUrl, ar:item.ar , name:item.al.name} }">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: {}, //歌单的详情页的数据
      itemList: [], //歌单的歌曲 数组
    }
  },

  methods: {
    getMusic() {
      // // 取到路由带过来的参数
      var routerParams = this.$route;
      console.log(routerParams);
      var data = routerParams.query.id
      console.log(data);
      this.axios({
        // 请求数据的类型
        method: "get",
        // 请求数据的接口地址
        url: `http://localhost:3000/playlist/detail?id=${data}`,
      }).then((res) => {
        console.log("AboutMusic获取歌曲详情页的数据===>", res);
        // 拿到数据，存储起来
        this.playlist = res.data.playlist;
        console.log(this.playlist, 11);
      });
    },

    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿"
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万"
      }
    },

    getMusicList() {
      // // 取到路由带过来的参数
      var routerParams = this.$route;
      var data = routerParams.query.id
      console.log("getMusicList", data);
      this.axios({
        // 请求数据的类型
        method: "get",
        // 请求数据的接口地址
        url: `http://localhost:3000/playlist/track/all?id=${data}&limit=20&offset=0`,
      }).then((res) => {
        console.log("获取歌单列表的数据===>", res);
        // 拿到数据，存储起来
        this.itemList = res.data.songs;
        console.log(this.itemList, 11);
      });
    },

  },

  created() {
    this.getMusic();
    this.getMusicList();
  }
}
</script>

<style scoped>
.bgimg {
  width: 100%;
  height: 450px;
  position: fixed;
  z-index: -1;
  /* // 过滤器 */
  filter: blur(30px);
}
.about {
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
}

.icon {
  height: 50px;
  width: 50px;
  position: relative;
  bottom: 15px;
}
.itemLeft {
  height: 50px;
  width: 30px;
  /* background: aqua; */
  padding-top: -50px;
}

.itemContent {
  height: 150px;
  width: 98%;
  position: absolute;
  top: 53px;
  right: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lim {
  width: 130px;
  height: 135px;
  margin: 15px;
  margin-top: -15px;
  border-radius: 10px;
}

.playCount {
  border-radius: 10px;
  background-color: rgba(19, 19, 19, 0.5);
}

.count {
  position: absolute;
  width: 50px;
  right: 17px;
  bottom: 135px;
  font-size: 12px;
  color: rgb(246, 247, 250);

}

.icplay {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 67px;
  bottom: 133px;
  font-size: 10px;
  color: rgb(246, 247, 250);
  /*填充颜色*/
  color: #fff;
}

.itemContentLeft {
  position: absolute;
  left: 20px;
}

.itemContentRight {
  width: 190px;
  height: 150px;
  position: absolute;
  left: 185px;
  top: -12px;
}

.itemContentRight .name {
  font-size: 14px;
  font-weight: 500;
  height: 50px;
  width: 200px;
  color: white;
}

.name .nickname {
  position: absolute;
  top: 60px;
  left: 50px;
  color: #ccc;
}

.middleImg {
  height: 40px;
  width: 40px;
  border-radius: 100%;

}

.Cbottom {
  height: 50px;
  color: #ccc;
  position: absolute;
  top: 100px;
  font-size: 14px;
}

.itemMusicList {
  position: absolute;
  top: 205px;
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: -1px 10px;
}

.listTop {
  display: flex;
  align-items: center;
  padding: 10px 0px;
  height: 60px;
}

.topLeft .icon {
  height: 30px;
  width: 30px;
  padding-right: 10px;
  padding-top: -10px;
  position: absolute;
  top: 10px;
  left: 10px;
}

.topMiddle {
  padding-left: 55px;
  font-size: 15px;
  font-weight: bolder;
  height: 50px;
  /* line-height: 50px; */
}

.topMiddle .tol {
  font-size: 12px;
  color: #ccc;
}

.topRight {
  display: flex;
  position: absolute;
  right: 20px;
  top: 10px;
  height: 35px;
  width: 100px;
  border-radius: 20px;
  background: red;
  text-align: center;
  line-height: 35px;
}

.topRight span {
  font-size: 13px;
  margin-left: 5px;
  color: white;
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

.leftSpan {
  padding-left: 5px;
}

.itemList .name {
  /* margin-bottom: 5px ; */
  width: 250px;
  height: 65px;
  position: absolute;
  left: 40px;
  padding-bottom: -10px;
  font-size: 13px;
  font-weight: 700;
}

.itemList .icon {
  height: 20px;
  width: 18px;
  position: absolute;
  right: 20px;
}

.itemList .name .name1 {
  width: 250px;
  font-size: 12px;
  color: #ccc;
}
</style>
