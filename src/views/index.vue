<!--
 * @Description: 首页
 * @version: 1.0
 * @Author: ximusunian
 * @Date: 2020-09-09 11:31:36
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-30 10:55:03
-->
<template>
  <div id="index">
    <header>
      <img
        src="https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/app/1457471a92eb43abb2b0d663e77319a0.png"
        class="header-bg"
      />
    </header>

    <!-- 我的奖品 -->
    <div class="my-prize" @click="getMyGoods">我的奖品</div>

    <!-- 主体部分 -->
    <div class="container">
      <!-- 翻拍次数 -->
      <div class="title">
        <span>您还有{{ drewCount }}次翻牌机会</span>
        <div class="title-right" @click="showHowGet">
          <span>如何获得奖品</span>
        </div>
      </div>

      <!-- 奖品九宫格 -->
      <div class="sudoku">
        <div class="box">
          <div
            v-for="(item, index) in gifts"
            :key="index"
            class="sudoku-item aniLeft"
          >
            <img
              :src="item.giftsImage"
              :class="['side', !item.slot ? 'translateFace' : '']"
            />
            <img
              :src="item.backImage"
              @click="getWinning(index)"
              :class="['side tips', item.slot ? 'translateBack' : '']"
            />
          </div>
        </div>
      </div>

      <!-- 开始按钮 -->
      <div class="start-btn" @click="start">
        <img src="@/assets/images/start-btn.png" />
      </div>

      <!-- 分享 -->
      <div class="share-btn" @click="share">
        <img
          src="https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/app/f17fdc0920804718a42a9bb76db6fafa.gif"
        />
      </div>

      <!-- 获奖名单 -->
      <div class="winners">
        <titleLine title="获奖名单"></titleLine>
        <div class="winners-main">
          <div class="winners-main-title">
            <span>手机号</span>
            <span>奖品</span>
          </div>
          <div class="winners-main-box">
            <div class="no-tips" v-if="winningList.length === 0">活动时间：2020-10-10 10:00:00 至 2020-10-13 23:59:59</div>
            <div class="swiper" v-if="winningList.length !== 0">
              <swiper :options="swiperOption">
                <swiper-slide
                  style="height:auto;"
                  v-for="(item, index) in winningList"
                  :key="index"
                >
                  <p class="stop-swiping txt">
                    <span>{{ item.phone }}</span>
                    <span>{{ item.giftName }}</span>
                  </p>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>

      <!-- 活动规则 -->
      <div class="activity-rules">
        <titleLine title="活动规则"></titleLine>
        <div class="activity-rules-main">
          <p v-for="(item, index) in activityInfo.activityRule" :key="index">
            {{ index + 1 }}、{{ item }}
          </p>
        </div>
      </div>
    </div>

    <!-- 如何获得奖品弹框 -->
    <howGet></howGet>

    <!-- 提示未登录弹框 -->
    <!-- <login></login> -->
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

    <!-- 我的奖品 -->
    <myPrize></myPrize>

    <!-- 获得的奖品 -->
    <winning :src="src"></winning>

    <!-- 分享回流弹框 -->
    <shareSuccess :result="shareResult"></shareSuccess>

    <van-overlay :show="shareGuide">
      <div class="guide">
        <img
          src="https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/h5/images/arrow.png"
          class="guide-image2"
        />
        <div class="guide-text">
          <span>点击</span>
          <img
            src="https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/h5/images/wechat.png"
            class="guide-image1"
          />
          <span>选择发送给朋友</span>
        </div>
        <div class="iknow" @click="know">我知道了</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import titleLine from "@/components/titleLine";
import howGet from "@/components/howGet";
import myPrize from "@/components/myPrize";
import shareSuccess from "@/components/shareSuccess";
import winning from "@/components/winning";
import backImage from "@/assets/images/back.png";
import { Overlay } from "vant";
export default {
  name: "index",
  components: {
    titleLine,
    howGet,
    myPrize,
    shareSuccess,
    winning,
    [Overlay.name]: Overlay
  },
  data() {
    return {
      show: false,
      isShow: "",
      weChat: 0,
      drewCount: 0,
      token: "",
      startDate: "",
      activityInfo: {},
      winningList: [],
      gifts: [],
      showFace: true,
      showAnimation: false,
      canClick: false, // 是否可以翻牌
      throttle: true, // 节流
      result: {},
      shareResult: "0.00", // 分享活动的奖励
      src: "", // 获奖图片链接
      swiperOption: {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        // speed: 500,
        // autoplay:{
        //   delay:1,
        //   autoplayDisableOnInteraction:false
        // },
        // loop: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping"
      },
      shareGuide: false
    };
  },
  created() {
    this.getToken();
    this.getEvn();
    this.getDrewCount();
    this.getActiveInfo();
    this.getAllPrize();
    this.isShow = this.$route.query.isShare;
    if (
      this.isShow !== null &&
      this.isShow !== "" &&
      this.isShow !== undefined
    ) {
      this.addChance();
    }
  },
  mounted() {
    window.addChance = this.addChance;
  },
  methods: {
    // 获取token
    getToken() {
      let token = this.$route.query.token;
      if (this.$route.query.token != undefined) {
        this.token = token;
        localStorage.setItem("token", token);
      } else {
        this.show = true;
      }
    },

    // 获得当前环境
    getEvn() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
        this.weChat = 1;
      } else {
        this.weChat = 0;
      }
    },

    // 获取活动详情
    getActiveInfo() {
      this.$api.getActiveInfo({ type: 2 }).then(res => {
        if (res.result === 100) {
          this.activityInfo = res.data;
          this.startDate = Date.parse(res.data.startTime.replace(/-/g, "/"));
          res.data.gifts.map(item => {
            this.gifts.push({
              giftsImage: item.gitImage,
              backImage: backImage,
              giftNo: item.giftNo,
              slot: true
            });
          });
        } else {
          this.$toast(res.message);
        }
      });
    },

    // 获取抽奖次数
    getDrewCount() {
      if (
        this.token !== "" &&
        this.token !== null &&
        this.token !== undefined
      ) {
        this.$api
          .getDrewCount({ type: 2, wechat: this.weChat, token: this.token })
          .then(res => {
            if (res.result === 100) {
              this.drewCount = res.data.drewCount;
            } else {
              this.$toast(res.message);
            }
          });
      }
    },

    // 获取总的获奖列表
    getAllPrize() {
      this.$api.getAllPrize({ type: 2 }).then(res => {
        if (res.result === 100) {
          this.winningList = res.data;
        } else {
          this.$toast(res.message);
        }
      });
    },

    // 显示如何获得商品
    showHowGet() {
      this.$store.commit("changeShowHowGet", true);
    },

    // 显示我的奖品
    // TODO: 未登录跳转登录
    getMyGoods() {
      if (
        this.token !== "" &&
        this.token !== null &&
        this.token !== undefined
      ) {
        this.$store.commit("changeShowMyPrize", true);
      } else {
        this.show = true;
      }
    },

    // 点击开始洗牌
    // TODO: 未登录跳转登录
    start() {
      // let newDate = Date.parse(new Date())
      // if(Number(this.startDate) > newDate) {
      //   this.$toast("活动未开始")
      // } else {
      if (this.throttle) {
        if (
          this.token !== "" &&
          this.token !== null &&
          this.token !== undefined
        ) {
          let newDate = Date.parse(new Date());
          if (Number(this.startDate) > newDate) {
            this.throttle = true;
            this.$toast("活动未开始");
          } else {
            if (this.drewCount !== 0) {
              this.throttle = false;
              this.gifts.map(item => {
                item.slot = false;
              });
              this.getDom();
            } else {
              this.throttle = true;
              this.$toast("当前翻牌机会为0，快去下单获得吧~");
            }
          }
        } else {
          this.show = true;
        }
      }
      // }
    },

    // 乱序
    shuffle(arr) {
      var l = arr.length;
      var index, temp;
      while (l > 0) {
        index = Math.floor(Math.random() * l);
        temp = arr[l - 1];
        arr[l - 1] = arr[index];
        arr[index] = temp;
        l--;
      }
      return arr;
    },

    // 插入动画规则
    insertStyleSheetRule(ruleText) {
      let sheets = document.styleSheets;
      if (sheets.length == 0) {
        let style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
      }
      let ss = null;
      let st = null;
      if (name) {
        for (let i in sheets) {
          for (let k in sheets[i].rules) {
            if (sheets[i].rules[k].name == name) {
              ss = parseInt(i);
              st = parseInt(k); //每次只传一个属性，所有表里只能有一个同名
            }
          }
        }
        if (ss !== null) {
          sheets[ss].deleteRule(st);
        }
      }
      let sheet = sheets[ss ? ss : sheets.length - 1];
      sheet.insertRule(
        ruleText,
        sheet.rules ? sheet.rules.length : sheet.cssRules.length
      );
    },

    // 绑定animation
    getDom() {
      let dom = document.getElementsByClassName("sudoku-item");
      let list = [];
      for (let i = 0; i < dom.length; i++) {
        list.push({
          x: dom[4].offsetLeft - dom[i].offsetLeft,
          y: dom[4].offsetTop - dom[i].offsetTop
        });
        if (i % 2 === 0) {
          this.insertStyleSheetRule(`@keyframes hor-animation${i} {
            0% { 
              transform: translate(0, 0); 
              -ms-transform: translate(0, 0);
              -moz-transform: translate(0, 0);
              -webkit-transform: translate(0, 0);
              -o-transform: translate(0, 0);
            } 
            20% { 
              transform: translate(${list[i].x}px, ${list[i].y}px)
              -ms-transform: translate(${list[i].x}px, ${list[i].y}px);
              -moz-transform: translate(${list[i].x}px, ${list[i].y}px);
              -webkit-transform: translate(${list[i].x}px, ${list[i].y}px);
              -o-transform: translate(${list[i].x}px, ${list[i].y}px);
            }
            40% {
              transform: translate(30px, ${list[i].y}px)
              -ms-transform: translate(30px, ${list[i].y}px);
              -moz-transform: translate(30px, ${list[i].y}px);
              -webkit-transform: translate(30px, ${list[i].y}px);
              -o-transform: translate(30px, ${list[i].y}px); 
            }
            60% {
              transform: translate(-30px, ${list[i].y}px)
              -ms-transform: translate(-30px, ${list[i].y}px);
              -moz-transform: translate(-30px, ${list[i].y}px);
              -webkit-transform: translate(-30px, ${list[i].y}px);
              -o-transform: translate(-30px, ${list[i].y}px);
            }
            80% { 
              transform: translate(${list[i].x}px, ${list[i].y}px)
              -ms-transform: translate(${list[i].x}px, ${list[i].y}px);
              -moz-transform: translate(${list[i].x}px, ${list[i].y}px);
              -webkit-transform: translate(${list[i].x}px, ${list[i].y}px);
              -o-transform: translate(${list[i].x}px, ${list[i].y}px);
            }
            100% { 
              transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop}); 
              -ms-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
              -moz-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
              -webkit-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
              -o-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
            } 
          }`);
        } else {
          this.insertStyleSheetRule(`@keyframes hor-animation${i} {
            0% { 
              transform: translate(0, 0); 
              -ms-transform: translate(0, 0);
              -moz-transform: translate(0, 0);
              -webkit-transform: translate(0, 0);
              -o-transform: translate(0, 0);
            } 
            20% { 
              transform: translate(${list[i].x}px, ${list[i].y}px)
              -ms-transform: translate(${list[i].x}px, ${list[i].y}px);
              -moz-transform: translate(${list[i].x}px, ${list[i].y}px);
              -webkit-transform: translate(${list[i].x}px, ${list[i].y}px);
              -o-transform: translate(${list[i].x}px, ${list[i].y}px);
            }
            40% {
              transform: translate(-30px, ${list[i].y}px)
              -ms-transform: translate(-30px, ${list[i].y}px);
              -moz-transform: translate(-30px, ${list[i].y}px);
              -webkit-transform: translate(-30px, ${list[i].y}px);
              -o-transform: translate(-30px, ${list[i].y}px);
            }
            60% {
              transform: translate(30px, ${list[i].y}px)
              -ms-transform: translate(30px, ${list[i].y}px);
              -moz-transform: translate(30px, ${list[i].y}px);
              -webkit-transform: translate(30px, ${list[i].y}px);
              -o-transform: translate(30px, ${list[i].y}px); 
            }
            80% { 
              transform: translate(${list[i].x}px, ${list[i].y}px)
              -ms-transform: translate(${list[i].x}px, ${list[i].y}px);
              -moz-transform: translate(${list[i].x}px, ${list[i].y}px);
              -webkit-transform: translate(${list[i].x}px, ${list[i].y}px);
              -o-transform: translate(${list[i].x}px, ${list[i].y}px);
            }
            100% { 
              transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop}); 
              -ms-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
              -moz-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
              -webkit-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
              -o-transform: translate(d${dom[i].offsetLeft}, ${dom[i].offsetTop});
            } 
          }`);
        }
        setTimeout(() => {
          this.gifts = this.shuffle(this.gifts);
          dom[i].style.animation = `hor-animation${i} 2s 1`;
          this.canClick = true;
          setTimeout(() => {
            this.throttle = true;
            dom[i].style.animation = "";
          }, 3500);
        }, 1000);
      }
    },

    // 翻牌，获取结果
    getWinning(index) {
      let idx = index;
      if (this.canClick) {
        this.$api
          .getResult({
            type: 2,
            wechat: this.weChat,
            token: this.token
          })
          .then(res => {
            if (res.result === 100) {
              this.gifts.map((item, index) => {
                if (item.giftNo === res.data.giftNo) {
                  [this.gifts[idx], this.gifts[index]] = [
                    this.gifts[index],
                    this.gifts[idx]
                  ];
                }
              });
              this.getDrewCount();
              this.src = this.gifts[idx].giftsImage;
              setTimeout(() => {
                this.gifts[idx].slot = true;
              }, 100);
              setTimeout(() => {
                this.$store.commit("changeShowWining", true);
              }, 1000);
              setTimeout(() => {
                this.gifts.map(item => {
                  item.slot = true;
                });
              }, 1500);
            } else {
              this.$toast(res.message);
            }
          });
      }
    },

    // 分享
    // TODO: 未登录跳转登录
    share() {
      if (
        this.token !== "" &&
        this.token !== null &&
        this.token !== undefined
      ) {
        if (this.weChat === 1) {
          this.shareGuide = true;
        } else {
          let url = window.location.href;
          let u = navigator.userAgent;
          let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isIOS) {
            window.webkit.messageHandlers.shareActiveRed.postMessage({
              type: 1, //vue给iOS传值
              url: url
            });
          }
          if (isAndroid) {
            let strParameter = JSON.stringify({
              type: 1,
              url: url
            });
            window.shareActiveRed.OnClick(strParameter);
          }
        }
      } else {
        this.show = true;
      }
    },

    // 分享增加抽奖次数
    addChance() {
      this.$api
        .addCount({
          token: this.token,
          wechat: this.weChat
        })
        .then(res => {
          if (res.result === 100) {
            if (res.data.shareSign) {
              this.shareResult = res.data.giftName;
              this.$store.commit("changeShowShareBox", true);
            }
          } else {
            this.$toast(res.message);
          }
        });
    },

    // 登录
    login() {
      if (this.$route.query.appType == "IOS") {
        window.webkit.messageHandlers.goLoginJumpToPay.postMessage({});
      } else {
        window["reLoad"] = function(url) {
          location.replace(url);
          location.reload();
        };
        window.goLoginJumpToPay.OnClick("");
      }
    },

    change() {
      this.show = false;
    },

    // 我知道了
    know() {
      this.shareGuide = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#index {
  background: #eb5e20;
  header {
    .header-bg {
      width: 100%;
    }
  }

  // 我的奖品
  .my-prize {
    position: fixed;
    right: 0;
    top: 4.986rem;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 0 0.2rem;
    height: 0.68rem;
    color: #d84200;
    font-size: 0.4rem;
    border: 1px solid #d74d11;
    border-right: 0;
    border-radius: 0.68rem 0 0 0.68rem;
    background: #ffda9d;
    z-index: 1;
  }
  .container {
    padding: 0 0.4rem 0.253rem;
    // 翻拍次数
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 0.32rem;
      &-right {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.266rem;
        width: 1.92rem;
        height: 0.48rem;
        background: #ffe8c3;
        border-radius: 0.066rem;
        color: #e04400;
      }
    }

    // 九宫格
    .sudoku {
      .box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0.2rem;
        .sudoku-item {
          position: relative;
          height: 3.33rem;
          -webkit-perspective: 500px;
          -moz-perspective: 500px;
          -ms-perspective: 500px;
          perspective: 500px;
          margin-bottom: 0.2rem;
          .side {
            width: 2.946rem;
            height: 3.33rem;
            transition: all 1.2s ease;
            -moz-transition: all 1.2s ease; /* Firefox 4 */
            -webkit-transition: all 1.2s ease; /* Safari 和 Chrome */
            -o-transition: all 1.2s ease; /* Opera */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden; /* Chrome 和 Safari */
            -moz-backface-visibility: hidden; /* Firefox */
            -ms-backface-visibility: hidden;
            -webkit-transform-style: preserve-3d;
            -moz-transform-style: preserve-3d;
            -ms-transform-style: preserve-3d;
          }
          .tips {
            transition: all 1.2s ease;
            -moz-transition: all 1.2s ease; /* Firefox 4 */
            -webkit-transition: all 1.2s ease; /* Safari 和 Chrome */
            -o-transition: all 1.2s ease; /* Opera */
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0.5;
          }
          .translateFace {
            transform: rotateY(-180deg);
            -ms-transform: rotateY(-180deg); /* IE 9 */
            -moz-transform: rotateY(-180deg); /* Firefox */
            -webkit-transform: rotateY(-180deg); /* Safari 和 Chrome */
            -o-transform: rotateY(-180deg);
          }
          .translateBack {
            transform: rotateY(180deg);
            -ms-transform: rotateY(180deg); /* IE 9 */
            -moz-transform: rotateY(180deg); /* Firefox */
            -webkit-transform: rotateY(180deg); /* Safari 和 Chrome */
            -o-transform: rotateY(180deg);
          }
        }
      }
    }

    // 开始按钮
    .start-btn {
      display: flex;
      justify-content: center;
      // margin-top: 0.2rem;
      img {
        width: 1.786rem;
        height: 1.866rem;
      }
    }

    // tag: 分享按钮
    .share-btn {
      display: flex;
      justify-content: center;
      margin-top: 0.4rem;
      img {
        height: 1.8rem;
      }
    }

    // tag: 获奖名单
    .winners {
      padding: 0.64rem 0.45rem 1.066rem;
      margin-top: 0.7rem;
      min-height: 5.933rem;
      background-image: url("https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/app/b98e66d97e694cf0b6cd68977fa53a86.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &-main {
        padding: 0.73rem 0 0;
        &-title {
          display: flex;
          color: #fff;
          font-size: 0.4rem;
          font-weight: 500;
          span {
            width: 50%;
            text-align: center;
          }
        }
        &-box {
          p {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 0.37rem;
            span {
              width: 50%;
              text-align: center;
            }
          }
        }
      }
    }

    // tag: 活动规则
    .activity-rules {
      padding: 0.64rem 0.6rem 0.933rem;
      margin-top: 0.8133rem;
      background-image: url("https://huitongyi-mall.oss-cn-hangzhou.aliyuncs.com/app/721b9e8707ab455394ab4366d8846bfd.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &-main {
        margin-top: 0.68rem;
        min-height: 9.173rem;
        p {
          color: #fff;
          font-size: 0.373rem;
        }
        p:not(:last-child) {
          margin-bottom: 0.3rem;
        }
      }
    }

    .swiper-container {
      width: 100%;
    }
    .swiper-slide {
      margin-top: 0.45rem;
    }
    .no-tips {
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      color: #ffffff;
      font-size: 0.2rem;
    }
    .swiper {
      padding-top: 0.2rem;
      height: 5rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
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
  .guide {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .guide-image1 {
      width: 2rem;
      height: 0.8rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
    .guide-image2 {
      width: 1.5rem;
      margin-right: 1.3rem;
      margin-top: 0.2rem;
    }
    .guide-text {
      color: #fff;
      font-size: 0.4rem;
      margin-right: 1rem;
    }
    .iknow {
      width: 2.5rem;
      height: 0.8rem;
      border: 1px solid #fff;
      color: #fff;
      font-size: 0.35rem;
      text-align: center;
      line-height: 0.8rem;
      border-radius: 0.2rem;
      margin: 1.5rem auto;
    }
  }
}
</style>
