<template>
  <div class="all">
    <div class="topBg"></div>
    <div class="topTopic">
      <div class="cl">
        <div class="fl topicItem" @click="changeStatus('支出')">
          <span :class="{active:textAcive}">支出</span>
        </div>
        <div class="fl topicItem" @click="changeStatus('收入')">
          <span :class="{active:!textAcive}">收入</span>
        </div>
        <div class="fr topicItem" @click="goBack()">
          <span>取消</span>
        </div>
      </div>
      <div class="topicUnder" :class="[textAcive?'moveLeft':'moveRight']"></div>
    </div>
    <div class="category">
      <h2>类别</h2>
      <div class="categoryContent">
        <div class="categoryItem" v-for="(item,index) in categoryList" @click="chooseCategory(index)">
          <img :src="item.imgUrl" alt="" :class="{choiceCircle:index==categoryIndex}">
          <h3 :class="{choiceText:index==categoryIndex}">{{item.title}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "addLog",
      data(){
        return{
          status:"支出", //提交的是“支出”或“收入”
          categoryIndex:-1,// 当前页面选择的支出类别
          // 后台返回的支出类别
          categoryList:[
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"娱乐"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"饮食"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"日用品"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"出行"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"通讯"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"购物"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"其它"
            }
          ]
        }
      },
      computed:{
        textAcive:function () {
          if(this.status === "支出"){
            return true;
          } else {
            return false;
          }
        }
      },
      methods:{
        // 切换支出和收入
        changeStatus:function (status) {
          this.status = status;
        },
        // 返回主页
        goBack:function () {
          this.$router.push('/mainPage/wallet');
        },
        // 选择支出类别
        chooseCategory:function (index) {
          this.categoryIndex = index;
          console.log(index);
        }
      }
    }
</script>

<style scoped lang="scss">
  .all{
    position: relative;
  }

  .topBg {
    height: 3rem;
    width: 100%;
    background: linear-gradient(to right, #fd8a65 , #fd695e);
    position: absolute;
    top: 0;
    z-index: 999;
  }

  .topTopic {
    position: relative;
    z-index: 1001;
    .topicItem{
      width: 1.5rem;
      height: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem 0 0 0;
      position: relative;
    }
    div>span {
      color: #fff;
      font-size: 0.28rem;
      display: block;
      transition: font-size 0.3s;
    }
    .topicUnder {
      width: 0.4rem;
      height: 0.1rem;
      border-bottom: 0.03rem solid #fff;
      position: relative;
      transition: left 0.3s;
    }
    .moveLeft {
      left: 0.55rem;
    }
    .moveRight {
      left: 2.045rem;
    }
    .active {
      font-size: 0.36rem;
    }
  }

  .category {
    position: relative;
    z-index: 1001;
    width: 6.3rem;
    /*height: 3rem;*/
    margin: 0.5rem auto 0 auto;
    background-color: #fff;
    box-shadow: 3px 3px 12px #c1c5d0;
    border-radius: 0.1rem;
    padding: 0.3rem;
    h2 {
      font-size: 0.32rem;
      font-weight: normal;
      color: #b6b6b6;
    }
    .categoryContent {
      display: flex;
      justify-content: flex-start;
      flex-wrap:wrap;
      .choiceCircle {
        border: 1px solid #fd7469;
      }
      .choiceText {
        color: #fd7469
      }
    }
    .categoryItem {
      width: 25%;
      margin: 0.1rem 0 0.1rem 0;
      img {
        width: 0.8rem;
        height: 0.8rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #b6b6b6;
        border-radius: 50%;
        padding: 5px;
      }
      h3 {
        font-size: 0.24rem;
        font-weight: normal;
        color: #b6b6b6;
        text-align: center;
        margin-top: 0.05rem;
      }
    }
  }
</style>
