<template>
  <!--<transition name="">-->
    <div class="all">
      <!--头部背景色块-->
      <div class="topBg"></div>
      <!--头部交互文字-->
      <div class="topTopic">
        <div class="cl">
          <div class="fl topicItem noSelect" @click="changeStatus('支出')">
            <span :class="{active:textAcive}">支出</span>
          </div>
          <div class="fl topicItem noSelect" @click="changeStatus('收入')">
            <span :class="{active:!textAcive}">收入</span>
          </div>
          <div class="fr topicItem noSelect" @click="goBack()">
            <span>取消</span>
          </div>
        </div>
        <div class="topicUnder" :class="[textAcive?'moveLeft':'moveRight']"></div>
      </div>
      <!--类别选择-->
      <!--支出类别-->
      <div class="category" v-if="textAcive">
        <h2>类别</h2>
        <div class="categoryContent">
          <div class="categoryItem" v-for="(item,index) in expensesList" @click="chooseCategory(index,item.imgUrl)">
            <div class="imgBox">
              <img :src="item.imgUrl" alt="" :class="{choiceCircle:index==expensiveIndex}">
            </div>
            <h3 :class="{choiceText:index==expensiveIndex}">{{item.title}}</h3>
          </div>
        </div>
      </div>
      <!--收入类别-->
      <div class="category" v-if="!textAcive">
        <h2>类别</h2>
        <div class="categoryContent">
          <div class="categoryItem" v-for="(item,index) in incomeList" @click="chooseCategory(index)">
            <div class="imgBox">
              <img :src="item.imgUrl" alt="" :class="{choiceCircle:index==incomeIndex}">
            </div>
            <h3 :class="{choiceText:index==incomeIndex}">{{item.title}}</h3>
          </div>
        </div>
      </div>
      <!--底部键盘部分-->
      <div class="bottom">
        <p class="remarks" @click="goRemarks()">{{remarks}}</p>
        <p class="money">
          <span class="">{{keyValue}}</span>
          <span class="imgBox">
          <img src="@/assets/img/x.png" alt="" v-if="this.clBtnShow" @click="clearAll()">
        </span>
        </p>
        <div class="keyboard">
          <div class="fg3">
            <div class="leftLine">
              <div class="keyItem fg1 nbl" @click="clickKey('1')">
                <div>1</div>
              </div>
              <div class="keyItem fg1" @click="clickKey('2')">
                <div>2</div>
              </div>
              <div class="keyItem fg1" @click="clickKey('3')">
                <div>3</div>
              </div>
            </div>
            <div class="leftLine">
              <div class="keyItem fg1 nbl" @click="clickKey('4')">
                <div>4</div>
              </div>
              <div class="keyItem fg1" @click="clickKey('5')">
                <div>5</div>
              </div>
              <div class="keyItem fg1" @click="clickKey('6')">
                <div>6</div>
              </div>
            </div>
            <div class="leftLine">
              <div class="keyItem fg1 nbl" @click="clickKey('7')">
                <div>7</div>
              </div>
              <div class="keyItem fg1" @click="clickKey('8')">
                <div>8</div>
              </div>
              <div class="keyItem fg1" @click="clickKey('9')">
                <div>9</div>
              </div>
            </div>
            <div class="leftLine">
              <div class="keyItem fg1 nbl"  @click="clickKey('.')">
                <div>.</div>
              </div>
              <div class="keyItem fg2"  @click="clickKey('0')">
                <div>0</div>
              </div>
            </div>
          </div>
          <div class="fg1 right">
            <!--back按钮-->
            <div class="keyItem nbr back" @click="backKey()">
              <img src="@/assets/img/back.svg" alt="">
            </div>
            <!--确定按钮-->
            <div class="keyItem nbr sure" @click="makeSure()">
              <div>确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!--</transition>-->


</template>

<script>
    export default {
      name: "addLog",
      data(){
        return{
          status:"支出", //提交的是“支出”或“收入”
          expensiveIndex:-1, //当前页面选择的支出类别
          incomeIndex:-1, //当前页面选择的收入类别
          keyValue:"0", //数字键盘的值
          remarks:"添加备注信息", //备注栏的内容
          reload:false, //判断是否需要发接口获取类别
          expensiveImgUrl:'', //所选支出图片的地址
          incomeImgUrl:'', //所选收入图片的地址
          // 后台返回的支出类别
          expensesList:[
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
          ],
          // 后台返回的收入类别
          incomeList:[
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"工资"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"彩票"
            },
            {
              imgUrl:require("@/assets/img/example.svg"),
              title:"红包"
            }
          ]
        }
      },
      computed:{
        // 判断状态是“支出”或“收入”
        textAcive() {
          return(this.status === "支出");
        },
        clBtnShow() {
          return(!(this.keyValue === '0'));
        }
      },
      methods:{
        // 切换支出和收入
        changeStatus(status) {
          this.status = status;
        },
        // 取消按钮
        goBack() {
          // 根据进入的页面，原路返回
          this.$router.push('/mainPage/' + this.$store.state.routerParama);
        },

        // 选择支出类别
        chooseCategory(index,imgUrl) {
          if(this.status === '支出'){
            this.expensiveIndex = index;
            this.expensiveImgUrl = imgUrl;
          } else if (this.status === '收入'){
            this.incomeIndex = index;
            this.incomeImgUrl = imgUrl;
          }
          this.imgUrl = imgUrl;
          console.log(index);
        },

        // 点击数字键盘
        clickKey(keyValue) {
          this.keyValue += keyValue;
          // 键入时判断，头部为0且第二位不为小数点时，消除头部的0
          if(this.keyValue.length === 2 && this.keyValue.slice(0,1) === '0' && !(keyValue === '.')){
              this.keyValue = this.keyValue.slice(1)
          }
          // 键入时判断，字段是否含有小数点
          if(this.keyValue.indexOf('.') > -1){
            // 键入时判断，小数点数量是否超过两位
            if(this.keyValue.split('.').length > 2){
              this.backKey();
            }
            // 键入时判断，小数点后的数字是否超过两位
            if(this.keyValue.split('.')[1].length > 2){
              this.backKey();
            }
          }
          // 键入时判断，过长不予输入
          if(this.keyValue.length > 12){
            this.backKey();
          }
          console.log(this.keyValue);
        },

        // 数字键盘回退键
        backKey() {
          this.keyValue = this.keyValue.slice(0,-1);
          if(this.keyValue.length < 1){
            this.keyValue = '0';
          }
        },

        // 数字键盘清空
        clearAll() {
          this.keyValue = '0';
        },

        // 跳转到备注
        goRemarks() {
          // 收入或支出类别都未选择时进行提示
          if(this.expensiveIndex === -1 && this.incomeIndex === -1){
            this.$alert.on('请选择类别');
            return;
          }
          if(this.remarks === '添加备注信息'){
            this.remarks = '';
          }
          this.$router.push({
            name:"addLogRemarks",
            params:{
              remarks:this.remarks, //备注
              status:this.status, //收入or支出
              expensiveIndex:this.expensiveIndex, //支出选项的index
              incomeIndex:this.incomeIndex, //收入选项的index
              expensesList:this.expensesList, //支出类别列表
              incomeList:this.incomeList, //收入类别列表
              expensiveImgUrl:this.expensiveImgUrl, //所选支出图片的地址
              incomeImgUrl:this.incomeImgUrl, //所选收入图片的地址
              money:this.keyValue //金额
            }
          });
        },

        // 确认按钮
        makeSure() {
          console.log("makeSure");
          // 收入或支出类别都未选择时进行提示
          if(this.expensiveIndex === -1 && this.incomeIndex === -1){
            this.$alert.on('请选择类别');
            return;
          }
          // 提交开始
          let self = this;
          let categoryName = "";
          let imgUrl = "";
          if(this.status === '支出'){
            categoryName = self.expensesList[self.expensiveIndex].title;
            imgUrl = self.expensesList[self.expensiveIndex].imgUrl;
          } else if(this.status === '收入'){
            categoryName = self.incomeList[self.incomeIndex].title;
            imgUrl = self.incomeList[self.incomeIndex].imgUrl;
          }
          let remarks = '';
          if(self.remarks === '添加备注信息'){
            remarks = '';
          } else {
            remarks = self.remarks;
          }
          this.$cAxios.post(self.$constantIP.submitLog, {
            params:{
              category:self.status, //收入or支出
              categoryName:categoryName, //类别名字
              money:self.keyValue, //金额
              remarks:remarks, //备注
              imgUrl:imgUrl //图片地址
            }
          })
          .then(function (response) {
            self.$waitting.off();
            if(response.data.returnCode === '000000'){
              self.$alert.on('添加成功',() => {
                  status = "支出"; //提交的是“支出”或“收入”
                  self.expensiveIndex = -1; //当前页面选择的支出类别
                  self.incomeIndex = -1; //当前页面选择的收入类别
                  self.keyValue = "0"; //数字键盘的值
                  self.remarks = "添加备注信息"; //备注栏的内容
                  self.reload = false; //判断是否需要发接口获取类别
                  self.expensiveImgUrl = ''; //所选支出图片的地址
                  self.incomeImgUrl = ''; //所选收入图片的地址
              });
            }
          })
        }
      },
      mounted() {
        // 如果从备注页面跳转过来，记录备注内容
        if(this.$route.params.remarks){
          this.remarks = this.$route.params.remarks;
        }
      },
      // 判断跳转到这个页面的路由
      beforeRouteEnter(to, from, next) {
        // console.log(to);
        // console.log(from);
        // console.log(next);
        next(vm => {
          if(from.name === "addLogRemarks"){
            vm.reload = false;
            vm.status = vm.$route.params.status; //收入or支出
            vm.expensiveIndex = vm.$route.params.expensiveIndex; //支出选项的index
            vm.incomeIndex = vm.$route.params.incomeIndex; //收入选项的index
            vm.expensiveImgUrl = vm.$route.params.expensiveImgUrl; //所选支出图片的地址
            vm.incomeImgUrl = vm.$route.params.incomeImgUrl; //所选收入图片的地址
            vm.expensesList = vm.$route.params.expensesList;//支出类别列表
            vm.incomeList = vm.$route.params.incomeList; //收入类别列表
            vm.keyValue = vm.$route.params.money; //金额
            console.log("不发请求");
          } else {
            vm.reload = true;
            console.log("发接口请求类别");
          }
        });

      }
    }
</script>

<style scoped lang="scss">
  .all{
    position: relative;
    /*height: 10rem;*/
    overflow: hidden;
  }

  .topBg {
    height: 3rem;
    width: 100%;
    background: linear-gradient(to right, #fd8a65 , #fd695e);
    position: absolute;
    top: 0;
    z-index: 900;
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
    margin: 0.3rem auto 0 auto;
    background-color: #fff;
    box-shadow: 3px 3px 12px #c1c5d0;
    border-radius: 0.1rem;
    padding: 0.2rem;
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
        border: 0.05rem solid #fd7469;
      }
      .choiceText {
        color: #fd7469
      }
    }
    .categoryItem {
      width: 25%;
      height: 1.4rem;
      margin: 0.1rem 0 0.1rem 0;
      .imgBox {
        width: 0.8rem;
        height: 0.9rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px;
      }
      img {
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
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

  .bottom{
    position: fixed;
    width: 100%;
    bottom: 0;
    .remarks {
      color: #b6b6b6;
      padding: 0.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .money {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-top:1px solid #b6b6b6;
      background-color: #fff;
      span {
        display: inline-block;
      }
      span:first-child {
        font-size: 0.55rem;
      }
      .imgBox {
        width: 0.5rem;
        height: 0.5rem;
        position: relative;
      }
      img {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%,-50%);
      }
    }
    .keyboard {
      display: flex;
      .keyItem {
        background-color: #fff;
        border-top:1px solid #b6b6b6;
        border-left:1px solid #b6b6b6;
        box-sizing: border-box;
        position: relative;
        div {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 0.48rem;
        }
      }
      .fg1 {
        flex-grow: 1;
      }
      .fg2 {
        flex-grow: 2;
      }
      .fg3 {
        flex-grow: 3;
      }
      .nbl {
        border-left: none;
      }
      .nbt {
        border-top: none;
      }
      .leftLine {
        display: flex;
        .keyItem {
          height: 0.9rem;
        }
      }
      .right {
        .keyItem{
          height: 50%;
        }
      }
      .sure {
        background: linear-gradient(to right, #fd8a65 , #fd695e);
        div{
          width: 1.3rem;
          text-align: center;
          color: #fff;
        }
      }
      .back {
        img{
          position: absolute;
          display: block;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 0.75rem;
          height: 0.75rem;
        }
      }
    }
  }

</style>
