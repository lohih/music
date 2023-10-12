<template>
  <div class="playMusic">
    <img :src="this.$route.query.picUrl" alt="" class="bgimg" />
    <div class="detailTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="name">
        <div class="name1">
          {{ this.$route.query.name }}
        </div>
        <div class="name2">
          {{ this.$route.query.ar[0].name }}
        </div>
      </div>
    </div>
    <div class="detailContent">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="this.$route.query.picUrl" alt="" class="img_ar" :style="animationState">
    </div>
    <div class="Ico">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
      <svg class="icon" aria-hidden="true" v-if="!this.start" @click="audioPlay(); handlePlay()" >
        <use xlink:href="#icon-bofang-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="audioPlay(); handlePause()" >
        <use xlink:href="#icon-zanting-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
      <audio class="audio" ref="audio" muted="muted" :src="url">
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playList: [],
      updataMusic: {},
      id: "",
      url: {},
      start: true,
      isPlay: false,
      bf:false
      // songs:[],
      // Item:[],
    }
  },
  methods: {
    getMusicItem() {
      // 取到路由带过来的参数
      var musicItem = this.$route;
      console.log("musicItem====", musicItem);
      // 获取歌单列表中歌曲的id
      var data2 = musicItem.query.id
      console.log("data2=====", data2);
      // 获取歌单列表中歌曲的下标
      var item = musicItem.query.item
      console.log("item====", item);
      // 获取歌单列表中歌曲的图片
      var picUrl = musicItem.query.picUrl
      console.log("picUrl====", picUrl);
      this.axios({
        // 请求数据的类型
        method: "get",
        // 请求数据的接口地址
        url: `http://localhost:3000/song/url?id=${data2}`,
      }).then((res) => {
        console.log("获取歌单列表的数据===>", res);
        // 拿到数据，存储起来
        this.updataMusic = res.data.data;
        console.log("updataMusic==", this.updataMusic);
        this.url = this.updataMusic[0].url
        console.log("url==", this.url);
      });
    },
    // 更换播放、暂停按钮的图标显示
    audioPlay() {
      console.log("refs===>",this.$refs);
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updatebtn(true);
      } else {
        this.$refs.audio.pause(); 
        this.updatebtn(false);
      }
    },
    // 判断播放、暂停按钮的状态
    updatebtn(value) {
      this.start = value
      console.log("this.start===", this.start);
      console.log(this.$route.query.ar[0].name);
    },

    // 唱片转动的状态
    handlePlay() {
      this.isPlay = true
    },

    // 唱片暂停的状态
    handlePause() {
      this.isPlay = false
    },

  },

  created() {
    this.getMusicItem();
    this.updatebtn();
  },
  // 根据isplay计算播放状态
  computed: {
    state() {
      if (this.isPlay) {
        return 'running'
      } else {
        return 'paused'
      }
    },
    // 根据状态决定是否播放
    animationState() {
      return {
        animationPlayState: this.state
      }
    }
  },


}
</script>

<style scoped>
@keyframes rotateImg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.playMusic {
  height: 100%;
  width: 100%;
  position: absolute;
}

.bgimg {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0px 10px 0px 20px; */
}

.icon {
  width: 30px;
  height: 30px;
  margin-left: 15px;
  color: #ccc;
}

/* .name{
  width: 500px;
  display: flex;
  position: absolute;
  left: 10px;
  top: 2px;
} */
.name1 {
  display: flex;
  position: absolute;
  left: 50px;
  font-size: 10px;
  color: darkgrey;
  font-weight: 700;
}

.name2 {
  display: flex;
  position: absolute;
  left: 50px;
  top: 0px;
  font-size: 16px;
  font-weight: 700;
}

.Ico .icon {
  width: 50px;
  height: 50px;
  position: relative;
  left: 80px;
  bottom: 50px;
  /* color: black; */
}

.audio {
  display: flex;
}

.detailContent {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.detailContent .img_needle {
  width: 100px;
  height: 150px;
  position: absolute;
  left: 46%;
  transform-origin: 0 0;
  transform: rotate(-10deg);
  transition: all 5s;

}

.detailContent .img_cd {
  position: absolute;
  width: 250px;
  height: 250px;
  z-index: -1;
  bottom: 115px;
}

.detailContent .img_ar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  position: absolute;
  bottom: 157px;
  animation: rotateImg 10s linear infinite;
}</style>