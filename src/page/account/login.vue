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
      <span class="forgetPass">忘记密码</span>
    </div>
    <!--登录按钮-->
    <span class="loginBtn" @click="loginSubmit()">登录</span>
    <!--注册按钮-->
    <p class="newUser">新用户？<span class="register" @click="goRegister()">注册</span></p>
  </div>
</template>

<script>

  export default {
      name: "login",
      data() {
        return{
          username:"",
          password:"",
          usernameBottom:false,
          passwordBottom:false
        }
      },
      computed:{
        // 判断用户名是否输入
        usernameIcon:function() {
          return (this.username === "" || this.username === undefined || this.username === null);
        },
        // 判断密码是否输入
        passwordIcon:function() {
          return (this.password === "" || this.password === undefined || this.password === null);
        }
      },
      methods:{
        // 清空账号密码输入框的内容
        clearInput:function (value) {
          switch (value){
            case "username":
              this.username = "";
              break;
            case "password":
              this.password = "";
              break;
          }
        },
        // 点击登录
        loginSubmit:function () {
          let self = this;
          if(self.usernameIcon){
            self.$alert.on('请输入用户名');
          } else if(self.passwordIcon){
            self.$alert.on('请输入密码');
          } else {
            self.$waitting.on();
            this.$cAxios.post(self.$constantIP.login, {
              params:{
                username:this.username,
                password:this.$md5(this.password)
              }
            }).then(function (response) {
              console.log(response);
              self.$waitting.off();
              if(response.data.returnCode === '000000'){
                self.$alert.on('登录成功');
              }
            }).catch(function (error) {
              self.$waitting.off();
              console.log(error);
            });
          }
        },
        // 点击注册
        goRegister:function () {
          this.$router.push('/account/register');
        },
        // input聚焦时
        onFocus:function (value) {
          switch (value) {
            case 'usernameBottom':
              this.usernameBottom = true;
              break;
            case 'passwordBottom':
              this.passwordBottom = true;
              break;
          }

        },
        // input丢失焦点时
        outFocus:function (value) {
          switch (value) {
            case 'usernameBottom':
              this.usernameBottom = false;
              break;
            case 'passwordBottom':
              this.passwordBottom = false;
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

  .forgetPass {
    color: #777;
    font-size: 0.24rem;
    display: block;
    float: right;
    margin-top: 0.2rem;
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

  .newUser {
    font-size: 0.24rem;
    text-align: center;
    color: #777;
    margin-top: 0.6rem;
  }

  .register {
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
