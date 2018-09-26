<template>
  <div class="all">
    <!--头部背景色块-->
    <div class="topBg">
      <p>账单</p>
    </div>
    <!--上方白色矩形-->
    <div class="category">
      <!--时间选择-->
      <p class="time">
        <span>2018年5月6日<i class="arrow"></i></span>
        <span class="to">至</span>
        <span>2018年10月1日<i class="arrow"></i></span>
      </p>
      <!--收入支出展示-->
      <div class="money">
        <div>
          <span class="input">收入</span>
          <p class="number">{{inputMoney | moneyInitial}}</p>
        </div>
        <div>
          <span class="output">支出</span>
          <p class="number">{{outputMoney | moneyInitial}}</p>
        </div>
      </div>
    </div>
    <!--记录列表-->
    <div class="listLine">
      <div class="listItem" v-for="(item,index) in dataList">
        <div class="leftItem">
          <img :src="item.imgUrl" alt="">
        </div>
        <div class="rightItem">
          <div>
            <p class="categoryName">{{item.categoryName}}</p>
            <p>{{item.createTime}}</p>
          </div>
          <div :class="[item.category === '收入' ? 'green' : 'red']">
            <span v-if="item.category === '收入'">+</span>
            <span v-else="item.category === '收入'">-</span>
            {{item.money | moneyInitial}}
          </div>
        </div>
      </div>
    </div>
    <!--底部bar-->
    <buttomBar></buttomBar>
  </div>

</template>

<script>
    import buttomBar from '@/components/bottomBar'
    export default {
      name: "wallet",
      data(){
        return{
          dataList:[
            {
              imgUrl:require("@/assets/img/example.svg"),
              categoryName:'彩票',
              createTime:'2017年10月1日',
              category:'收入',
              money:'21.00',
              remarks:'发财'
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              categoryName:'娱乐',
              createTime:'2017年11月5日',
              category:'支出',
              money:'190.00',
              remarks:'KTV'
            }
          ]
        }
      },
      computed:{
        // 选择日期区间内的收入总额
        inputMoney:{
          get: function () {
            let sum = 0;
            for(let x of this.dataList){
              if(x.category === '收入'){
                sum += parseFloat(x.money);
              }
            }
            return sum;
          }
        },
        // 选择日期区间内的支出总额
        outputMoney:{
          get: function () {
            let sum = 0;
            for(let x of this.dataList){
              if(x.category === '支出'){
                sum += parseFloat(x.money);
              }
            }
            return sum;
          }
        }
      },
      components:{
        'buttomBar':buttomBar
      },
      mounted:function () {
        // 阻止滑动穿透
        document.querySelector(".topBg").addEventListener("touchmove", (event) => {
          event.preventDefault();  //阻止默认行为
          event.stopPropagation(); //阻止冒泡
        }, false);
        document.querySelector(".category").addEventListener("touchmove", (event) => {
          event.preventDefault();  //阻止默认行为
          event.stopPropagation(); //阻止冒泡
        }, false);
      }
    }
</script>

<style scoped lang="scss">
  .all {
    position: relative;
    height: 10rem;
    /*overflow: hidden;*/

    .topBg {
      height: 3rem;
      width: 100%;
      background: linear-gradient(to right, #fd8a65, #fd695e);
      position: fixed;
      top: 0;
      z-index: 900;
      p {
        color: #fff;
        font-size: 0.36rem;
        padding: 0.3rem 0 0 0.25rem;
      }
    }

    .category {
      position: fixed;
      top: 0;
      z-index: 1001;
      width: 6.3rem;
      margin-top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      box-shadow: 3px 3px 12px #c1c5d0;
      border-radius: 0.1rem;
      padding: 0.2rem;
      .time {
        padding: 0.2rem 0.2rem 0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.32rem;
        }
        .to {
          color: #fd695e;
          font-size: 0.36rem;
        }
        .arrow {
          display: inline-block;
          border-width: 0.1rem;
          border-style: solid;
          border-color: #000 transparent transparent transparent;
        }
      }
      .money {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0.5rem 0 0.5rem;
        .input {
          background-color: #92d043;
          color: #fff;
          border-radius: 0.2rem;
        }
        .output {
          background-color: #f97564;
          color: #fff;
          border-radius: 0.2rem;
        }
        .number {
          font-size: 0.4rem;
        }
        p {
          text-align: center;
        }
        span {
          position: relative;
          display: inline-block;
          width: 0.8rem;
          height: 0.35rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          vertical-align: middle;
          margin-bottom: 0.1rem;
        }
      }
    }
    .listLine {
      padding-top: 3.7rem;
      padding-bottom: 1.7rem;
      .listItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        margin: 0.3rem 0;
        .leftItem {
          width: 0.6rem;
          height: 0.6rem;
          position: relative;
          padding: 5px;
          background-color: #f8f9f9;
          border-radius: 50%;
          img {
            width: 0.5rem;
            height: 0.5rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .rightItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 85%;
          border-bottom: 0.025rem solid #f2f2f2;
          padding-bottom: 0.1rem;
          span {
            width: 0.2rem;
            display: inline-block;
            text-align: center;
          }
        }
        .red {
          color: #f97564;
        }
        .green {
          color: #92d043;
        }
        .categoryName {
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
