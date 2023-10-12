<template>
  <div class="my">
    
    <img src="../assets/touxaing.png" alt="" srcset="" class="img">
    <span class="sp">id：网易云</span>
    <van-button class="btn" type="info" @click="unLogin">退出登录</van-button>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出登录
    unLogin() {
      // 1.删除浏览器缓存中的token
      localStorage.removeItem("Login");

      // 2.页面跳转到登录页面
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.my {
  position: absolute;

}

.img {
  position: relative;
  left: 150px;
  top: 60px;
}

.sp {
  position: relative;
  left: 70px;
  top: 85px;
}

.btn {
  width: 150px;
  position: relative;
  align-items: center;
  right: 40px;
  top: 150px;
}</style>