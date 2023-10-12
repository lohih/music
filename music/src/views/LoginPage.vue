<template>
    <div class="login">
        <img src="../assets/music.png" alt="" srcset="" class="img">
        <button @click="yzmlogin" class="p1">验证码登录</button>
        <van-action-sheet v-model="show" position="bottom" title="标题">
            <div class="content">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field v-model="phone" name="phone" label="手机登录" placeholder="手机号码"
                            :rules="[{ required: true, message: '手机号码' }]" />
                        <button class="hqyzm">
                            <span @click="getyzm">获取验证码</span>
                        </button>
                        <van-field v-model="yzm" name="yzm" label="验证码" placeholder="请输入验证码"
                            :rules="[{ required: true, message: '验证码' }]" />
                    </van-cell-group>
                    <div style="margin: 16px">
                        <van-button round block type="primary" native-type="submit" @click="Login" >登录</van-button>
                    </div>
                </van-form>
            </div>
        </van-action-sheet>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            phone: "",
            yzm: "",
            show: false,
        };
    },
    created() { },
    methods: {
        onSubmit(values) {
            console.log("submit", values);
            this.phone = values.phone;
            console.log("手机号码", this.phone);
            this.yzm = values.yzm;
            console.log("验证码", this.yzm);
        },
        yzmlogin() {
            this.show = true;
        },
        getyzm() {
            this.axios({
                method: "post",
                url: "http://localhost:3000/captcha/sent",
                params: {
                    phone: this.phone,
                },
            }).then((res) => {
                console.log("获取验证码的信息===>", res);
            });
        },
        Login() {
            this.axios({
                method: "post",
                url: "http://localhost:3000/captcha/verify",
                params: {
                    phone: this.phone,
                    captcha: this.yzm,
                },
            }).then((res) => {
                console.log("登录的信息===>", typeof(res.data.code));
                if (res.data.code === 200) {
                    console.log("res===",res.data);
                    localStorage.setItem("Login", true);
                    this.$router.push("/");
                    localStorage.setItem("index",0)
                    // 在子组件定义一个方法，触发父组件的方法
                    // this.$emit("方法名称aaa") 这个方法aaa 待会会放在父组件的身上
                    this.$emit("load")
                }
            });
        },
    },
};
</script>
    
<style scoped>

.login{
    position: relative;
}
.img{
    position: absolute;
    right: 150px;
}
.p1 {
    /* padding: 16px 16px 160px; */
    position: absolute;
    /* width: 150px; */
    right: 140px;
    top: 100px;
}
.p2 {
    /* padding: 16px 16px 160px; */
    position: absolute;
    /* width: 150px; */
    right: 150px;
}

.hqyzm {
    float: right;
}
</style>