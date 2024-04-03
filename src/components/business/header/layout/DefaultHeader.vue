<template>
    <div class="header-box" :class="{'ENG':$Storage.get('locale') === 'E'}">
        <div class="flex-box">
        <ins-logo />
        <ins-menu v-if="!isMobile" />
        <!-- <ins-menu :layout="1" /> -->
        <img class="slide-menu" src="/static/Images/nav-icon.png" @click="showSlideMenu" v-if="isMobile" />
        </div>

        <ins-lang-switch v-if="!isMobile" />
        <div v-if="!isMobile">
          <!-- 搜索框开始 -->
          <div class="search-box">
            <input type="text" placeholder="Search ..." v-model="key" @keyup.enter="searchKeyChange" />
            <span class="searchBtn" @click="searchKeyChange"></span>
          </div>
          <div class="Memberposition" v-click-outside="closeDialog">
          <div class="MemberLogin" v-show="!isLogin">
            <a href="/account/Register"><span class="Title" >{{$t('Register.BecomeMember')}}</span></a>
          </div>
          <div class="MemberLogin">
            <a href="javascript:;" @click.stop="menberCentral" :class="{'FontCn':currentlang!=='E'}"><span class="Title" v-if="!isLogin">{{$t('Login.MemberLogin')}}</span><span class="Title" v-else>{{UserName}}</span></a>
            <transition name="slide-fade">
              <div class="lang_flow" v-show="showMenberCentral" @click="memberCentral">
                <div @click="goUrl('/account/memberInfo')" class="ii">{{$t('MemberInfo.MemberInfoTitle')}}</div>
                <div @click="goUrl('/account/forgetPassword')"  class="ii">{{$t('Forgetpassword.ForgetPassword')}}</div>
                <div @click="logout()">{{$t('Account.Logout')}}</div>
              </div>
            </transition>
          </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import storage from '@/sdk/common/Storage';
import Auth from '@/sdk/common/Auth';
@Component({
  components: {
    InsLogo: () => import('@/components/base/InsLogo.vue'),
    InsLangSwitch: () => import('@/components/business/header/InsLangSwitch.vue'),
    InsMenu: () => import('@/components/business/header/InsMenu.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;

  key: string = '';
  private showMenberCentral:boolean = false;
  UserName:string='';
  isShowSearch: boolean = false;

  closeDialog () {
    this.showMenberCentral = false;
  }
  goUrl (val) {
    window.location.href = val;
    this.showMenberCentral = false;
  }
  menberCentral () {
    if (!this.$Storage.get('isLogin')) {
      window.location.href = '/account/login';
    } else {
      this.showMenberCentral = !this.showMenberCentral;
    }
  }
  memberCentral (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'ii' && target.dataset.to) {
      this.$router.push({
        path: target.dataset.to
      });
    }
  }

  logout () {
    let _this = this;
    sdk.api.member.logout().then(
      function (data) {
        if (data) _this.$message(_this.$t('Message.SucceedInOperating') as string);
        _this.$store.dispatch('Logout');
        window.location.href = '/';
        Cookie.remove('access_token');
        Auth.GetToken();
        _this.showMenberCentral = false;
      }
    );
  }
  getAccount () {
    let _this = this;
    sdk.api.member.getAccount().then(
      function (data) {
        if (data.Logined) {
          _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
          _this.$store.dispatch('doLogin');
          _this.UserName = data.FirstName + ' ' + data.LastName;
        } else {
          _this.$store.dispatch('Logout', true);
        }
      },
      function (data) {
        _this.$message({
          message: data,
          type: 'error',
          customClass: 'messageboxNoraml'
        });
      }
    );
  }

  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }

  searchKeyChange () {
    // alert('search!');
    this.$store.dispatch('isShowMenu', false);
    this.$router.push({
      path: '/cms/search',
      name: 'search',
      params: {
        key: this.key
      }
    });
  }

  get menuShow () {
    return this.$store.state.isShowMenu;
  }
  get currentlang () {
    return this.$i18n.locale;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get isLogin () {
    return this.$store.state.isLogin;
  }

  mounted () {
    this.getAccount();
  }
}
</script>

<style scoped lang="less">
.pc {
    .header-box {
      // background-color: @base_color;
      width: 1200px;
      margin: 0 auto;
      position: relative;

      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // min-height: 120px;
        // padding: 0 1.6% 0 4.2%;
        box-sizing: border-box;
        position: relative;

        .logo {
          width: 30%;
          min-width: 170px;
        }

      }
      .Memberposition{
          position: absolute;
          top: 4px;
          right: 0;
          display: flex;
          .MemberLogin {
          // border: 1px solid #000;
          padding: 2px 10px;
          position: relative;
          margin: 0 10px;
        &::after{
            height: 40%;
            width: 0px;
            content: '';
            position: absolute;
            right: 0px;
            background: #fff!important;
            top: 30%;
          }
        .lang_flow{
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          background: #FFF;
          z-index: 999;
          box-shadow: 0 0 3px #ccc;
          >div{
            color:#000;
            font-size: 16px;
            height: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #eee;
            padding-left: 10px;
            padding-right: 10px;
            cursor: pointer;
            &:first-child {
              border-top: 1px solid #eee;
            }
          }
        }
          a {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
        .img {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          img {
            width: 20px;
          }
        }
        .Title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #000;
        }
      }
        }

      /deep/ .langSwitch {
        position: absolute;
        font-size: 17px;
        color: #fff;
        top: 38px;
        right: 20px;
        p {
          &.active {
            color: #d5ee1f;
            font-weight: bold;
          }
        }
      }

      /deep/ .nav_menu {
        // padding-top: 70px;
        width: 75%;
        background-color: #e8e8e8;
        >ul {
          >li {
            width: auto;
            padding: 28px 20px;
            padding-top: 40px;
            padding-bottom: 20px;

            a {
              color: #000;
              font-size: 18px;
              padding: 0;
            }

            > ul {
              // left: calc(50% - 120px);
              left: 0;
              background-color: #fff;
            }

            ul {
              width: 100%;
              border: 0;
              box-shadow: 0 3px 5px 0 #c0c4cc;
              li {
                border-bottom: 1px solid #c0c4cc;
                > a {
                  padding: 10px 12px;
                  color: #000;
                  font-size: 14px;
                }

                &:hover {
                  background-color: @menu_hover;
                  > a {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }

    .search-box {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      // border-radius: 30px;
      overflow: hidden;
      margin: 0 8px;
      // background: #fff;
      position: absolute;
      right: 210px;
      top: 2px;

      .searchBtn{
        width: 25px;
        height: 25px;
        display: inline-block;
        background: url(/static/Images/search.png) no-repeat center center;
        background-size: 60%;
        flex-shrink: 0;
        cursor: pointer;
        background-color: @base_color;
        // border-radius: 50%;
        // margin-left: 5px;
      }

      input {
        width: 180px;
        height: 25px;
        font-size: 12px;
        color:#333;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance:none;
        outline: none;
        border: 0;
        background-repeat: no-repeat;
        background-position-y: 4px;
        padding: 0 15px;
        box-sizing: border-box;
        background-color: transparent;
        // border-radius: 30px;
        border: 1px solid @base_color;

        &:focus {
          border-color: @base_color;
        }
      }

      input::-webkit-input-placeholder{
        color: #666;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color: #666;
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color: #666;
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color: #666;
      }
    }
}

.mobile {
    .header-box {
      .flex-box {
        height: 6rem;
        background-color: #fff;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        border-bottom: 1px solid #000;

        .logo {
          width: 24rem;
        }

        .slide-menu {
          cursor: pointer;
        }
      }

      .search-box {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 30px;
        overflow: hidden;
        margin: 0 8px;
        background: #fff;

        .searchBtn{
          width: 25px;
          height: 25px;
          display: inline-block;
          background: url(/static/Images/search.png) no-repeat center center;
          background-size: 60%;
          flex-shrink: 0;
          cursor: pointer;
          background-color: @base_color;
          border-radius: 50%;
          margin-left: 5px;
        }

        input {
          width: 142px;
          height: 23px;
          font-size: 9px;
          color: @font_color;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance:none;
          outline: none;
          border: 0;
          background-repeat: no-repeat;
          background-position-y: 4px;
          padding: 0 15px;
          box-sizing: border-box;
          background-color: transparent;
          border-radius: 30px;
          border: 1px solid @base_color;

          &:focus {
            border-color: @base_color;
          }
        }

        input::-webkit-input-placeholder{
          color: #666;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color: #666;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color: #666;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color: #666;
        }
      }
    }
}
#header .ENG{

  .flex-box{
    /deep/ .nav_menu{
      >ul{
       > li{
          width: 17%;
          padding: 28px 4px;
          padding-top: 40px;
          padding-bottom: 15px;
          &:nth-child(1){
            width: 10%;
            padding-left: 10px;
          }
          &:nth-child(2){
            width: 12%;
          }
          &:nth-child(6){
            width: 12%;
          }
          >ul{
            width: auto;
            white-space: nowrap;
            background-color: #fff;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  /deep/ .langSwitch{
    top: 50px;
    right: 10px;
  }
  .search-box{
    right: 300px;
  }
}
</style>
