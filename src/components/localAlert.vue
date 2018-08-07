<template>
  <div class="all" v-if="ifShow">
    <div class="bg"></div>
    <div class="messageBox">
      <div class="picBox">
        <div class="line"></div>
        <img src="../assets/img/remind.svg" alt="" class="remind">
        <div class="line"></div>
      </div>
      <p class="text">{{message}}</p>
      <div class="cutOff"></div>
      <div class="confirm" @click="off()">
        确定
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "localAlert",
      data() {
        return{
          ifShow:false  //控制提示框是否显示
        }
      },
      props:{
        message:String,  //提示语
        callback:Function  //点击确定时的回调函数，默认为空
      },
      methods:{
        // 打开提示框
        on:function () {
          this.ifShow = true;
        },
        // 关闭提示框
        off:function () {
          this.ifShow = false;
          if(typeof this.callback === "function"){
            this.callback();
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .all {
    width: 100%;
    height: 100%;
  }

  .bg {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
  }

  .messageBox {
    height: 3.5rem;
    width: 5rem;
    background-color: #fff;
    position: absolute;
    z-index: 1001;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid #777777;
    border-radius: 0.1rem;
  }

  .picBox {
    display: flex;
    justify-content:center;
    align-items:center;
    margin-top: 0.3rem;
  }

  .line {
    height: 0;
    width: 0.9rem;
    border: 1px solid #dddddd;
    margin: 0 0.2rem;
  }

  .remind {
    height: 1.2rem;
    width: auto;
    display: block;
  }

  .text {
    text-align: center;
    vertical-align: middle;
    font-size: 0.36rem;
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
  }

  .cutOff {
    box-sizing: border-box;
    height: 0;
    width: 100%;
    border: 0.5px solid #dddddd;
    margin: 0 auto;
  }

  .confirm {
    margin: 0 auto;
    width: 5rem;
    text-align: center;
    height: 0.89rem;
    line-height: 0.89rem;
    font-size: 0.36rem;
  }
</style>
