<template>
    <div class="bottomBar">
        <div class="item" @click="shiftPage('wallet')">
          <img :src="walletIcon" alt="">
          <p :class="{active:walletActive}">钱包</p>
        </div>
        <div class="item" @click="shiftPage('chart')">
          <img :src="chartIcon" alt="">
          <p :class="{active:chartActive}">图表</p>
        </div>
        <div>

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
</template>

<script>
    export default {
      name: "bottomBar",
      data() {
        return{
          walletIcon:require('../assets/img/wallet-grey.svg'),
          chartIcon:require('../assets/img/chart-grey.svg'),
          timebookIcon:require('../assets/img/timebook-grey.svg'),
          meIcon:require('../assets/img/me-grey.svg'),
          walletActive:false,
          chartActive:false,
          timebookActive:false,
          meActive:false
        }
      },
      methods:{
        // 底部按钮跳转方法
        shiftPage:function (text) {
          this.$router.push('/mainPage/' + text);
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
</style>
