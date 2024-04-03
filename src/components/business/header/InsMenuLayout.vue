<template>
    <div>
        <div class="header_logo">
            <!-- <ins-logo /> -->
            <InsLangSwitch/>

            <i class="el-icon-close" @click="closeSlideMenu"></i>
        </div>
        <div class="memberbox" v-click-outside="closeDialog">
            <div class="MemberLogin" v-if="!isLogin">
                <a href="/account/Register"><span class="Title" >{{$t('Register.BecomeMember')}}</span></a>
            </div>
            <div class="MemberLogin">
                <a href="javascript:;" @click.stop="menberCentral" :class="{'FontCn':currentlang!=='E'}"><span class="Title" v-if="!isLogin">{{$t('Login.MemberLogin')}}</span><span class="Title" v-else>{{UserName}}</span></a>
                <transition name="slide-fade">
                    <div class="lang_flow" v-show="showMenberCentral" @click="memberCentral">
                    <div @click="goUrl('/account/memberInfo')" class="ii">{{$t('MemberInfo.MemberInfoTitle')}}</div>
                    <div @click="goUrl('/account/forgetPassword')"  class="ii">{{$t('Forgetpassword.ForgetPassword')}}</div>
                    <div class="ii" @click="logout">{{$t('Account.Logout')}}</div>
                    </div>
                </transition>

            </div>

        </div>
        <!-- 搜索框开始 -->
        <div class="search-box">
          <input type="text" placeholder="Search ..." v-model="key" @keyup.enter="searchKeyChange" />
          <span class="searchBtn" @click="searchKeyChange"></span>
        </div>
        <div id="menu">
            <Menu :backColor="'@base_color'" :textColor="'#000'" :uniqueOpened="true" />
        </div>

        <!-- <ins-lang-switch /> -->
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
    Menu: () => import('@/components/business/header/InsElMenu.vue'),
    InsLangSwitch: () => import('@/components/business/header/InsLangSwitch.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  searchKey: string = '';
  key: string = '';
  private showMenberCentral:boolean = false;
  UserName:string='';

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeDialog () {
    this.showMenberCentral = false;
  }
  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
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
        if (data) _this.$message(_this.$t('Account.SucceedInOperating') as string);

        _this.$store.dispatch('Logout');
        window.location.href = '/';
        Cookie.remove('access_token');
        Auth.GetToken();
        _this.$HiddenLayer();
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

  // search () {
  //   this.closeSlideMenu();
  //   this.$router.push({ path: `/product/search/${this.searchKey}` });
  //   this.searchKey = '';
  // }
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

  get user () {
    return this.$store.state.user;
  }

  get isLogin () {
    return this.$store.state.isLogin;
  }

  get currentlang () {
    return this.$i18n.locale;
  }

  mounted () {
    this.getAccount();
  }
}
</script>

<style lang="less">
.sidebar-container {
    // background-color: @base_color !important;
}

#menu {
    margin-top: 1px;
    // border-top: 2px solid #e0ae2e;
    margin-bottom: 3.8rem;

    .el-submenu__icon-arrow {
        display: none;
    }

    .el-submenu__title {
        height: auto;
        line-height: unset;
        padding: 0 !important;
    }

    > .el-menu {
        background-color: transparent;
        border: 0;

        .el-submenu__icon-arrow {
            display: none;
        }

        > li {
            // border-top: 1px solid #eee;
            border-bottom: 1px solid #777777;
            // margin-bottom: 1rem;
            background-color: #fff !important;
            height: auto;
            line-height: unset;
            // text-align: center;

            >.el-submenu__title {
                background-color: #fff !important;
            }

            > a {
                color: #000;
            }

            span, a {
                padding: 1.4rem 2rem;
                display: block;
                font-size: 1.4rem;

                img {
                    width: 1.5rem;
                    margin-right: 1rem;
                }
            }

            a {
                text-decoration: none;
                color: #0a0606 !important;
            }

            > ul[role="menu"] {
                > li {
                    background-color: #434343 !important;
                    border-bottom: 1px solid #fff;
                    .el-submenu__title{
                        position: relative;

                        &:after {
                            content: "";
                            width: 1rem;
                            height: 100%;
                            background-color: @base_color;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                    }
                    a{
                        font-size: 1.3rem;
                        color: #fff !important;
                        padding-left: 3rem;
                    }
                }

                // >li {
                //     > ul {
                //         >li {
                //             > .el-submenu__title{
                //                 background-color: #313131 !important;
                //             }

                //             > ul {
                //                 li {
                //                     background-color: #313131 !important;
                //                     a{
                //                         font-size: 1.3rem;
                //                     }
                //                 }
                //             }

                //             > a {
                //                 background-color: #313131;
                //             }
                //         }
                //     }

                //     > .el-submenu__title{
                //         background-color: #434343 !important;
                //         .name{
                //             font-size: 1.3rem;
                //             color: #fff;
                //         }
                //     }
                // }
            }
        }

        .opened {
            &.is-opened {
                >.el-submenu__title {
                    border-bottom: 0;
                    span {
                        color: #000 !important;
                    }
                }
            }
        }

        ul[role="menu"] {
            li {
                .opened();
            }

        }

        li {
            line-height: unset;
            padding: 0 !important;
            min-width: unset;
            height: auto;
            .opened();

            i {
                color: #000 !important;
            }
        }
    }

    li[aria-haspopup="true"] {
        >.el-submenu__title {
            background-image: url(/static/Images/minus-arrow-down-w.png);
            background-repeat: no-repeat;
            background-position: right 1.5rem center;
            background-size: 1.2rem;
        }

        &.is-opened {
            >.el-submenu__title {
                background-image: url(/static/Images/close-w.png);
            }
        }
    }
}
</style>

<style scoped lang="less">
.header_logo {
    height: 6rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 1.5rem;
    border-bottom: 1px solid #777;
    background-color: #fff;

    .el-icon-close {
        color: #777777;
        font-size: 2.8rem;
    }

    a {
        width: 12rem;
    }

    .slide-menu {
        cursor: pointer;
    }

}
.search-box {
  width: 90%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        // border-radius: 30px;
        overflow: hidden;
        margin: 0 1.5rem;
        // background: #fff;

        .searchBtn{
          width: 3rem;
          height: 3rem;
          display: inline-block;
          background: url(/static/Images/search.png) no-repeat center center;
          background-size: 50%;
          flex-shrink: 0;
          cursor: pointer;
          background-color: @base_color;
          // border-radius: 50%;
          // margin-left: 5px;
        }

        input {
          width: 100%;
          height: 3rem;
          font-size: 1.2rem;
          color: #333;
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
/deep/ .langSwitch {
    font-size: 1.5rem;
    color: #106919;
    text-align: center;
    p {
        font-size: 1.5rem;
        display: inline-block;
        color: #fff;
        margin: 0 0.8rem;

        &.active {
            color: #127437;
            font-weight: bold;
        }
    }
}
.memberbox{
    display: flex;
    justify-content: center;
    margin: 0 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    .MemberLogin{

        margin-right: 1rem;

        &:last-child{
            margin-right: 0;
        }
        a{
            color: #000;
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            border: 1px solid #000;
            border-radius: 3px;
            padding: 0.8rem 1rem;
            img{
                margin-right: 0.5rem;
            }
            span.img{
              height: 21px;
            }
        }
    }
    .lang_flow{
      width: 90%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 5rem;
      background-color: #fff;
          z-index: 10;
      text-align: center;
      padding: 1rem 0;
      .ii{
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
      }
    }
}
.FontC{
  .memberbox .MemberLogin a{
    padding: 1rem 3rem;
    font-size: 1.4rem;
  }
  /deep/ .el-menu > li {
    a, span{
      font-family: 'SourceHanSans-Regular' !important;
      letter-spacing: 2px !important;
    }
  }
}
</style>
