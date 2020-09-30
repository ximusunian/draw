<!--
 * @Description: 
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-27 14:50:47
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-29 18:01:29
-->
<template>
  <div id="login">
    <van-overlay :show="show" @click="change">
      <div class="wrapper" @click.stop>
        <div class="box">
          <p>您还没有登录，请登录后再查看。</p>
          <div class="login-btn" @click="login">立即登录</div>
        </div>
        <img
          src="@/assets/images/close.png"
          class="close-icon"
          @click="change"
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay } from "vant";
export default {
  name: "login",
  data() {
    return {
      show: this.$store.state.showLogin
    };
  },
  components: {
    [Overlay.name]: Overlay
  },
  computed: {
    state() {
      return this.$store.state.showLogin;
    }
  },
  watch: {
    state(newVal, oldVal) {
      this.show = newVal;
    }
  },
  mounted() {},
  methods: {
    login() {
      if (this.$route.query.appType == "IOS") {
        window.webkit.messageHandlers.goLoginJumpToPay.postMessage({});
      } else {
        window["reLoad"] = function(url) {
          location.replace(url);
          location.reload()
        };
        window.goLoginJumpToPay.OnClick("");
      }
    },
    change() {
      this.$store.commit("changeShowLogin", false);
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .box {
      width: 80%;
      height: 4.533rem;
      background: #fff;
      border-radius: 0.266rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        color: #666666;
        font-size: 0.4rem;
        font-weight: 500;
      }
      .login-btn {
        width: 3.733rem;
        height: 0.96rem;
        color: #fff;
        font-size: 0.426rem;
        text-align: center;
        line-height: 0.96rem;
        border-radius: 0.96rem;
        background: #fc6a34;
        margin-top: 0.866rem;
      }
    }
    .close-icon {
      width: 0.706rem;
      height: 0.706rem;
      margin-top: 0.8rem;
    }
  }
}
</style>
