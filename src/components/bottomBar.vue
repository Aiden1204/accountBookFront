<template>
  <div>
    <div class="bottomBar">
      <div class="item" @click="shiftPage('wallet')">
        <img :src="walletIcon" alt="">
        <p :class="{active:walletActive}">钱包</p>
      </div>
      <div class="item" @click="shiftPage('chart')">
        <img :src="chartIcon" alt="">
        <p :class="{active:chartActive}">图表</p>
      </div>
      <div class="addBtnBox" @click="toAddLog()">
        <div class="addBtnBg">
          <img src="@/assets/img/add.svg" alt="" class="addBtn">
        </div>
      </div>
      <div class="item" @click="shiftPage('timebook')">
        <img :src=timebookIcon alt="">
        <p :class="{active:timebookActive}">时间簿</p>
      </div>
      <div class="item" @click="shiftPage('me')">
        <img :src=meIcon alt="">
        <p :class="{active:meActive}">我的</p>
      </div>
    </div>
    <div class="addBtnShadow">

    </div>
  </div>

</template>

<script>
    export default {
      name: "bottomBar",
      data() {
        return{
          // 底部四个默认图标路径
          walletIcon:require('../assets/img/wallet-grey.svg'),
          chartIcon:require('../assets/img/chart-grey.svg'),
          timebookIcon:require('../assets/img/timebook-grey.svg'),
          meIcon:require('../assets/img/me-grey.svg'),
          // 底部四个图标激活状态控制
          walletActive:false,
          chartActive:false,
          timebookActive:false,
          meActive:false
        }
      },
      methods:{
        // 底部按钮跳转方法
        shiftPage:function (text) {
          // 用vuex记录入口
          this.$store.commit('changeRouterParama',{
              text:text
          });
          // 跳转到对应页面
          this.$router.push('/mainPage/' + text);
        },
        // 增加记录
        toAddLog:function () {
          this.$router.push('/log/addLog');
        }
      },
      mounted:function () {
        // 根据当前url判断哪个按钮高亮
        switch (this.$route.path){
          case '/mainPage/wallet':
            this.walletIcon = require('../assets/img/wallet-orange.svg');
            this.walletActive = true;
            break;
          case '/mainPage/chart':
            this.chartIcon = require('../assets/img/chart-orange.svg');
            this.chartActive = true;
            break;
          case '/mainPage/timebook':
            this.timebookIcon = require('../assets/img/timebook-orange.svg');
            this.timebookActive = true;
            break;
          case '/mainPage/me':
            this.meIcon = require('../assets/img/me-orange.svg');
            this.meActive = true;
            break;
        }
      }
    }
</script>

<style scoped lang="scss">
  .bottomBar {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    height: 1.25rem;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem 0 0.2rem;
    border-top: 1px solid #c1c5d0;
    box-shadow: 0 -1px 10px #c1c5d0;
    z-index: 1005;
  }

  .item {
    img {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
    }
    p {
      text-align: center;
      vertical-align: middle;
      color: #c1c5d0;
    }
  }

  .item .active {
    color: #f3605f;
  }

  .addBtnBox{
    background-color: #fff;
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
    top: -0.2rem;
    z-index: 1002;
    border-radius: 50%;
  }

  .addBtnBg {
    background: linear-gradient(to right, #fd8a65 , #fd695e);
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1003;
  }

  .addBtn{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 1rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .addBtnShadow {
    position: fixed;
    bottom: 0.15rem;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1003;
    border-top: 1px solid #c1c5d0;
    box-shadow: 0 -1px 10px #c1c5d0;
  }
</style>
