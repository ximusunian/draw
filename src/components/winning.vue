<!--
 * @Description: 
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-29 09:38:57
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-29 10:13:02
-->
<template>
  <div id="winning">
    <van-overlay :show="show">
      <transition name="van-fade">
        <div class="wrapper" @click.stop>
          <div class="box">
            <img :src="src" />
          </div>
          <img
            src="@/assets/images/close.png"
            class="close-icon"
            @click="change"
          />
        </div>
      </transition>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay } from "vant";
export default {
  name: "winning",
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: this.$store.state.showWining
    };
  },
  components: {
    [Overlay.name]: Overlay
  },
  computed: {
    state() {
      return this.$store.state.showWining;
    }
  },
  watch: {
    state(newVal, oldVal) {
      this.show = newVal;
    }
  },
  mounted() {},
  methods: {
    change() {
      this.$store.commit("changeShowWining", false);
    }
  }
};
</script>

<style scoped lang="scss">
#winning {
  @keyframes scale {
    0% {
      transform: scale3d(0, 0, 0);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .box {
      text-align: center;
      img {
        width: 4.42rem;
        height: 5.6rem;
        animation-name: scale; // 动画名称
        animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
        animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
        animation-delay: 0s; // 动画延迟时间
        animation-iteration-count: 1; //  动画播放次数，infinite：一直播放
        animation-duration: 0.3s; // 动画完成时间
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
