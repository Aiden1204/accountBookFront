<template>
  <div class="main">
    <!--logo-->
    <img src="../../assets/img/logo.png" alt="" class="loginLogo">
    <!--账号密码输入框-->
    <div class="myInputBox cl">
      <label for="username">Username</label>
      <div class="myInput">
        <input type="text" name="username" id="username" maxlength="10" v-model="username" @focus="onFocus('usernameBottom')" @blur="outFocus('usernameBottom')">
        <div class="underLine"></div>
        <div class="underLineActive" :class="usernameBottom ? 'underLineActive2' : ''"></div>
        <img src="../../assets/img/x.png" :class="usernameIcon ? 'iconHide' : ''" @click="clearInput('username')"/>
      </div>
      <label for="password">Password</label>
      <div class="myInput">
        <input type="password" name="password" id="password" maxlength="10" v-model="password" @focus="onFocus('passwordBottom')" @blur="outFocus('passwordBottom')">
        <div class="underLine"></div>
        <div class="underLineActive" :class="passwordBottom ? 'underLineActive2' : ''"></div>
        <img src="../../assets/img/x.png" :class="passwordIcon ? 'iconHide' : ''" @click="clearInput('password')"/>
      </div>
      <label for="rePassword">RePassword</label>
      <div class="myInput">
        <input type="password" name="rePassword" id="rePassword" maxlength="10" v-model="rePassword" @focus="onFocus('rePasswordBottom')" @blur="outFocus('rePasswordBottom')">
        <div class="underLine"></div>
        <div class="underLineActive" :class="rePasswordBottom ? 'underLineActive2' : ''"></div>
        <img src="../../assets/img/x.png" :class="rePasswordIcon ? 'iconHide' : ''" @click="clearInput('rePassword')"/>
      </div>
    </div>
    <!--注册按钮-->
    <span class="loginBtn noSelect" @click="registerSubmit()">注册</span>
    <!--返回登陆-->
    <p class="loginP noSelect">已有账号？<span class="login" @click="goLogin()">立即登录</span></p>
  </div>
</template>

<script>

  export default {
    name: "register",
    data() {
      return{
        username:"",
        password:"",
        rePassword:"",
        usernameBottom:false,
        passwordBottom:false,
        rePasswordBottom:false
      }
    },
    components:{

    },
    computed:{
      // 判断用户名是否输入
      usernameIcon() {
        return (this.username === "" || this.username === undefined || this.username === null);
      },
      // 判断密码是否输入
      passwordIcon() {
        return (this.password === "" || this.password === undefined || this.password === null);
      },
      // 判断重复密码是否输入
      rePasswordIcon() {
        return (this.rePassword === "" || this.rePassword === undefined || this.rePassword === null);
      }
    },
    methods:{
      // 清空输入框的内容
      clearInput(value) {
        switch (value){
          case "username":
            this.username = "";
            break;
          case "password":
            this.password = "";
            break;
          case "rePassword":
            this.rePassword = "";
            break;
        }
      },
      // 注册提交
      registerSubmit() {
        // 字段验证
        if(this.usernameIcon){
          this.$alert.on('请输入用户名');
        } else if(this.passwordIcon){
          this.$alert.on('请输入密码');
        } else if(this.rePasswordIcon){
          this.$alert.on('请重复密码');
        } else if(!(this.password === this.rePassword)){
          this.$alert.on('两次密码不一致');
        } else {
          let self = this;
          // 开始提交
          this.$waitting.on();
          this.$cAxios.post(self.$constantIP.register, {
            params:{
              username:this.username,
              password:this.$md5(this.password),
              rePassword:this.$md5(this.rePassword)
            }
          })
            .then(function (response) {
              self.$waitting.off();
              if(response.data.returnCode === '999999'){
                // 报错时清空输入框
                self.username = "";
                self.password = "";
                self.rePassword = "";
              } else if(response.data.returnCode === '000000'){
                self.$alert.on('注册成功',() => {
                  self.$router.push('/account/login');
                });
              }
            })
        }
      },
      // 返回登录
      goLogin() {
        this.$router.push('/account/login');
      },
      // input聚焦时
      onFocus(value) {
        switch (value) {
          case 'usernameBottom':
            this.usernameBottom = true;
            break;
          case 'passwordBottom':
            this.passwordBottom = true;
            break;
          case 'rePasswordBottom':
            this.rePasswordBottom = true;
            break;
        }

      },
      // input丢失焦点时
      outFocus(value) {
        switch (value) {
          case 'usernameBottom':
            this.usernameBottom = false;
            break;
          case 'passwordBottom':
            this.passwordBottom = false;
            break;
          case 'rePasswordBottom':
            this.rePasswordBottom = false;
            break;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    font-size: 0.36rem;
  }

  .loginLogo {
    width: 1.98rem;
    height: 1.98rem;
    display: block;
    margin: 1.68rem auto 0 auto;
  }

  .myInputBox {
    width: 5.25rem;
    margin: 0 auto;
  }

  .myInputBox label {
    display: block;
    color: #777;
    margin-top: 0.2rem;
  }

  .myInput {
    position: relative;
    width: 5.25rem;
    margin-top: 0.2rem;
  }


  .myInput input {
    display: inline-block;
    color: #777;
    width: 4.75rem;
    border: none;
    outline:medium;
    margin-bottom: 0.1rem;
    font-size: 0.36rem;
  }

  .myInput img {
    position: absolute;
    width: 0.24rem;
    height: 0.24rem;
    top: 50%;
    margin-top: -0.12rem;
    right: 0;
  }

  .iconHide {
    display: none;
  }

  .loginBtn {
    display: block;
    width: 5.28rem;
    height: 0.87rem;
    line-height: 0.87rem;
    text-align: center;
    margin: 0.6rem auto 0 auto;
    background: -webkit-linear-gradient(left, #fd9a66 , #fd5b5f); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #fd9a66, #fd5b5f); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #fd9a66, #fd5b5f); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #fd9a66 , #fd5b5f); /* 标准的语法 */
    border-radius: 0.435rem;
    color: #fff;
    box-shadow: -0.05rem 0.15rem 0.5rem #fd9a66;
  }

  .loginP {
    font-size: 0.24rem;
    text-align: center;
    color: #777;
    margin-top: 0.6rem;
  }

  .login {
    color: #fd5b5f;
  }

  .underLine {
    width: 5.25rem;
    position: absolute;
    height: 2px;
    background-color: #ccc;
    bottom: 0;
  }

  .underLineActive {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #fd5b5f;
    transition-duration: 0.3s;
    -moz-transition-duration: 0.3s; /* Firefox 4 */
    -webkit-transition-duration: 0.3s; /* Safari 和 Chrome */
    -o-transition-duration: 0.3s; /* Opera */
  }

  .underLineActive2 {
    width: 5.25rem;
  }
</style>
