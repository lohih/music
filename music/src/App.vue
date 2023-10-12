<template>
  <div id="app">
    <router-view @load="load"/>
    <van-tabbar route  @change="onChange">
      <van-tabbar-item replace to="/" v-if="!$route.meta.isTab" :icon="tuijian">热歌推荐</van-tabbar-item>
      <van-tabbar-item replace to="/my" v-if="!$route.meta.isTab" :icon="my">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tuijian:require("./assets/tuijian.png"),
      tuijianImg:require("./assets/tuijian.png"),
      tuijianActive:require("./assets/tuijian_active.png"),
      my:require("./assets/my.png"),
      myImg:require("./assets/my.png"),
      myActive:require("./assets/my_active.png")
    }
  },
  methods: {
    onChange(index) {
      localStorage.setItem("index",index)

      if(index == 0) {
        console.log("index====>",index);
        this.tuijian = this.tuijianActive
      }
      else{
        this.tuijian = this.tuijianImg
      }
      // this.tuijian = index == 0 ? require("./assets/tuijian_active.png") : require("./assets/tuijian.png");
      this.my = index == 1 ? require("./assets/my_active.png") : require("./assets/my.png");
    },

    // 获取当前图片高亮的方法
    load() {
      // 获取 高亮的index
      var index = localStorage.getItem("index");
      console.log(index);
      this.onChange(index);
    }
  },
  mounted() {
    // 获取 高亮的index
    var index = localStorage.getItem("index");
    console.log(index);
    this.onChange(index);
  }
}
</script>

<style >
a{
  color: black;
}
</style>
