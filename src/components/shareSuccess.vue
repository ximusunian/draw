<!--
 * @Description: 分享回流展示
 * @version: 1.0
 * @Author: ximusunian
 * @Date: 2020-09-28 19:56:41
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-29 17:18:39
-->
<template>
  <div id="shareSuccess">
    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="box" @click="change">
          <div>{{result}}</div>
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
  name: "shareSuccess",
  props: {
    result: {
      type: String,
      default: "0.00"
    },
  },
  data() {
    return {
      show: this.$store.state.showShareBox
    };
  },
  components: {
    [Overlay.name]: Overlay
  },
  computed: {
    state() {
      return this.$store.state.showShareBox;
    }
  },
  watch: {
    state(newVal, oldVal) {
      this.show = newVal
    }
  },
  mounted() {},
  methods: {
    change() {
      this.$store.commit("changeShowShareBox", false);
    }
  }
};
</script>

<style scoped lang="scss">
#shareSuccess {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .box {
      width: 83.3%;
      height: 8.213rem;
      background-image: url("https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/app/41f8765be0254297b130bf66be255e0b.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      div {
        font-size: 1.758rem;
        background: linear-gradient(to right, #FF5002, #FFBA00);
        -webkit-background-clip: text;
        color: transparent;
        margin-top: 1.6rem;
        margin-left: 32.96%;
      }
      img {
        width: 100%;
        height: 8.213rem;
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
