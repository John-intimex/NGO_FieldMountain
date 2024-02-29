<template>
    <div class="header-box" :class="{'ENG':$Storage.get('locale') === 'E'}">
        <div class="flex-box">
        <ins-logo />
        <ins-menu v-if="!isMobile" />
        <!-- <ins-menu :layout="1" /> -->
        <img class="slide-menu" src="/static/Images/nav-icon.png" @click="showSlideMenu" v-if="isMobile" />
        </div>

        <ins-lang-switch v-if="!isMobile" />

        <!-- 搜索框开始 -->
        <!-- <div class="search-box">
          <input type="text" placeholder="Search ..." v-model="key" @keyup.enter="searchKeyChange" />
          <span class="searchBtn" @click="searchKeyChange"></span>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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

  get isMobile () {
    return this.$store.state.isMobile;
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

        .logo {
          width: 30%;
          min-width: 170px;
        }
      }

      /deep/ .langSwitch {
        position: absolute;
        font-size: 17px;
        color: #fff;
        top: 20px;
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
            padding: 22px 20px;

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
      border-radius: 30px;
      overflow: hidden;
      margin: 0 8px;
      background: #fff;
      position: absolute;
      right: 15%;
      top: 10px;

      .searchBtn{
        width: 25px;
        height: 25px;
        display: inline-block;
        background: url(/static/Images/search.png) no-repeat center center;
        background-size: 40%;
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
          background-size: 40%;
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
          padding: 22px 4px;
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
    top: 31px;
  }
}
</style>
