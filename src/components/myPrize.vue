<!--
 * @Description: 我的奖品
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-27 18:04:15
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-30 10:57:40
-->
<template>
  <div id="myPrize">
    <van-overlay :show="show" @click="change" :lock-scroll="false">
      <div class="wrapper" @click.stop>
        <div class="box">
          <header>
            <titleLine title="我的奖品" size="large"></titleLine>
          </header>
          <div class="main">
            <div class="main-title">
              <span>获得奖品</span>
              <span>获得时间</span>
            </div>
            <div class="main-box">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text=""
                @load="onLoad"
              >
                <div v-if="list.length !== 0">
                  <p v-for="(item, index) in list" :key="index">
                    <span>{{ item.giftName }}</span>
                    <span>{{ item.gmtCreate }}</span>
                  </p>
                </div>
                <van-empty
                  v-else
                  class="custom-image"
                  image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                  description="暂无"
                />
              </van-list>
            </div>
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
import { Overlay, List, Empty } from "vant";
export default {
  name: "myPrize",
  data() {
    return {
      show: false,
      list: [],
      loading: false,
      finished: false,
      params: {
        type: 2,
        wechat: 0,
        token: localStorage.getItem("token"),
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  components: {
    titleLine,
    [Overlay.name]: Overlay,
    [List.name]: List,
    [Empty.name]: Empty
  },
  computed: {
    state() {
      return this.$store.state.showMyPrize;
    }
  },
  watch: {
    state(newVal, oldVal) {
      this.show = newVal;
      if (newVal) {
        this.list = [];
        this.onLoad();
      }
    }
  },
  created() {
    this.getEvn()
  },
  mounted() {},
  methods: {
    // 获得当前环境
    getEvn() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
        this.params.wechat = 1;
      } else {
        this.params.wechat = 0;
      }
    },
    change() {
      this.$store.commit("changeShowMyPrize", false);
    },
    onLoad() {
      this.getMyPrize();
    },
    // 获取我的奖品
    getMyPrize() {
      let token = localStorage.getItem("token");
      if (token != null) {
        this.$api.getMyPrize(this.params).then(res => {
          if (res.result === 100) {
            if (res.data.pageNum <= res.data.pages) {
              this.loading = true;
              this.finished = true;
            } else {
              this.loading = false;
              this.finished = false;
            }
            this.list = this.list.concat(res.data.list);
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
#myPrize {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .box {
      width: 80%;
      min-height: 10rem;
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
        padding: 0.4rem 0.626rem 1rem;
        &-title {
          display: flex;
          // justify-content: space-around;
          color: #e14108;
          font-size: 0.4rem;
          font-weight: 500;
          span {
            width: 50%;
            text-align: center;
          }
        }
        &-box {
          height: 7rem;
          overflow: hidden;
          overflow-y: scroll;
          p {
            display: flex;
            // justify-content: space-around;
            color: #666666;
            font-size: 0.32rem;
            margin-top: 0.45rem;
            span {
              width: 50%;
              text-align: center;
            }
            span:last-child {
              width: 60%;
            }
          }
          p:not(:first-child) {
            margin-top: 0.5rem;
          }
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
