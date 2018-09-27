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
        <span @click="showDatePicker(startTime,'start')">{{startTime | dateInitial}}<i class="arrow"></i></span>
        <span class="to">至</span>
        <span @click="showDatePicker(endTime,'end')">{{endTime | dateInitial}}<i class="arrow"></i></span>
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
      <div v-if="dataList.length < 1">
        <p class="topicTop">所选时间段没有记录哦~</p>
        <p class="topicBottom"><span @click="$router.push('/log/addLog')">立即添加</span></p>
      </div>
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
          startTime:'', //开始时间
          endTime:'', //结束时间
          dataList:[] //记录列表
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
      methods:{
        // 打开日期选择器
        showDatePicker:function (date,flag) {
          let self = this;
          this.$vux.datetime.show({
            value: date, //初始日期
            onHide () {

            },
            onShow () {

            },
            // 点击确定时
            onConfirm (){
              // 用户选择的开始日期不能大于结束日期
              let startTime = self.startTime;
              let endTime = self.endTime;
              if(flag === 'start'){
                startTime = this.value;
              } else if(flag === 'end'){
                endTime = this.value;
              }
              // 将日期转化为number类型
              let start = parseInt(startTime.split('-').join(''));
              let end = parseInt(endTime.split('-').join(''));
              // 比较两个日期的大小
              if((start - end) > 0){
                self.$alert.on('开始日期不能大于结束日期');
                return;
              } else {
                // 符合条件时更改页面上日期的值
                if(flag === 'start'){
                  self.startTime = this.value;
                } else if(flag === 'end'){
                  self.endTime = this.value;
                }
                // 开始发查询接口
                self.queryLog();
              }
              console.log(start);
              console.log(end);
            }
          })
        },

        // 检查月份和日期，不足两位前面补0
        dateCheck:function (arr) {
          if(arr[1].length < 2){
            arr[1] = '0' + arr[1];
          }
          if(arr[2].length < 2){
            arr[2] = '0' + arr[2];
          }
        },

        // 查询记录方法
        queryLog:function () {
          let self = this;
          self.$waitting.on();
          self.$cAxios.post(self.$constantIP.queryLog, {
            params:{
              startTime:self.startTime,
              endTime:self.endTime
            }
          })
            .then(function (response) {
              self.$waitting.off();
              if(response.data.returnCode === '000000'){
                self.dataList = response.data.dataList;
              }
            })
        }
      },
      beforeMount:function(){
        // 初始查询时间区间为当前日期往前数30天
        // 获取当前时间
        let endDate = new Date();
        // 往前推30天
        let startDate = new Date(endDate.getTime() - 1000*60*60*24*30);
        // 将时间对象转化成对应日期插件格式的字符串
        startDate = startDate.toLocaleDateString().split('/');
        endDate = endDate.toLocaleDateString().split('/');
        this.dateCheck(startDate);
        this.dateCheck(endDate);
        startDate = startDate.join('-');
        endDate = endDate.join('-');
        this.startTime = startDate;
        this.endTime = endDate;
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

        // 页面初始化时查询近30天的记录
        this.queryLog();
      }
    }
</script>

<style scoped lang="scss">
  .all {
    position: relative;
    height: 10rem;

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
      .topicTop {
        padding-top: 0.5rem;
        text-align: center;
        font-size: 0.36rem;
        color: #bfbfbf;
      }
      .topicBottom {
        padding-top: 0.3rem;
        text-align: center;
        font-size: 0.30rem;
        color: #f97564;
      }
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
