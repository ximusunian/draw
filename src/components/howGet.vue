<!--
 * @Description: 
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-27 13:50:37
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-27 18:09:11
-->
<template>
  <div id="howGet">
    <van-overlay :show="show" @click="change">
      <div class="wrapper" @click.stop>
        <div class="box">
          <header>
            <titleLine title="如何获得" size="large"></titleLine>
          </header>
          <div class="main">
            <p>1.买即送：凡在活动期间内下单，即可获得一次翻盘机会；</p>
            <p>
              2.分享送：凡在活动期间内，分享微信商友群，即可额外获得一份礼品
            </p>
          </div>
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
import titleLine from "@/components/titleLine";
import { Overlay } from "vant";
export default {
  name: "howGet",
  data() {
    return {
      show: this.$store.state.showHowGet
    };
  },
  components: {
    titleLine,
    [Overlay.name]: Overlay
  },
  computed: {
    state() {
      return this.$store.state.showHowGet;
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
      this.$store.commit("changeShowHowGet", false);
    }
  }
};
</script>

<style scoped lang="scss">
#howGet {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .box {
      width: 80%;
      min-height: 6.66rem;
      background: #ffefe9;
      border-radius: 0.266rem;
      header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.293rem;
        border-radius: 0.266rem 0.266rem 0 0;
        background-image: linear-gradient(#f15628, #ff712e);
      }
      .main {
        padding: 1.186rem 0.626rem 1.76rem;
        color: #343434;
        font-weight: 500;
        font-size: 0.4rem;
        p:not(:first-child) {
          margin-top: 0.4rem;
        }
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
