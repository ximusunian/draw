<!--
 * @Description: 
 * @version: 
 * @Author: ximusunian
 * @Date: 2020-09-27 10:33:23
 * @LastEditors: ximusunian
 * @LastEditTime: 2020-09-30 09:55:35
-->
<template>
   <div id="titleLine">
     <img src="@/assets/images/line.png" />
     <span :class="size === 'large'? 'large': '' ">{{title}}</span>
   </div>
</template>

<script>
export default {
  name: "titleLine",
  data() {
    return {

    }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    }
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
#titleLine {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 4.8rem;
  }
  span {
    position: absolute;
    font-size: 0.453rem;
    color: #FFF;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
  }
  .large {
    font-size: 0.533rem;
  }
}
</style>
