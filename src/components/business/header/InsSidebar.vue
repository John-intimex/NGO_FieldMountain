<template>
  <div class="siderbarContainer">
    <div id="sidebar" v-show="isShow">
      <a href="javascript:void(0);" @click="toTop"
        ><img src="/static/Images/sidebar/down.png"
      /></a>
      <!-- <a href="javascript:void(0);" @click="show = !show"
        ><img src="/static/Images/sidebar/down2.png"
      /></a> -->
      <span>
        <a
          href="https://api.whatsapp.com/send?phone=85296442888&text=我想查詢一下"
          target="_blank"
          ><img src="/static/Images/sidebar/whatsapp.png"
        /></a>
        <!-- <a href="javascript:;" class="livechat" @click="showLivechat"
          ><img src="/static/Images/sidebar/facebook.png"
        /></a> -->
        <a href="tel:85227283790" class="fb-button" target="_blank"
          ><img src="/static/Images/sidebar/phone.png"
        /></a>
        <a href="mailto:info@fmd.org.hk" class="fb-button"
          ><img src="/static/Images/sidebar/news.png"
        /></a>
      </span>
    </div>
    <!-- 显示livechat -->
    <div class="fb-livechat">
      <div class="ctrlq fb-overlay"></div>
      <div class="fb-widget">
        <div class="ctrlq fb-close"></div>
        <div
          class="fb-page"
          data-href="https://www.facebook.com/intimexhk/"
          data-tabs="messages"
          data-width="360"
          data-height="400"
          data-small-header="true"
          data-hide-cover="true"
          data-show-facepile="false"
        >
          <blockquote
            cite="https://www.facebook.com/intimexhk/"
            class="fb-xfbml-parse-ignore"
          ></blockquote>
        </div>
        <div class="fb-credit">
          <a href="https://www.facebook.com/intimexhk/" target="_blank"
            >Facebook Chat Widget by intimex</a
          >
        </div>
        <div id="fb-root"></div>
      </div>
      <a
        href="https://www.facebook.com/intimexhk/"
        title="Send us a message on Facebook"
        class="ctrlq fb-button"
      ></a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import $ from 'jquery';
@Component
export default class InsSidebar extends Vue {
  isShow: boolean = true;
  showFBMessenger: boolean = false;
  show: boolean = false;
  showLivechat () {
    $('.fb-livechat').fadeToggle();
  }
  toTop () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // window.addEventListener('scroll', () => {
    //   let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    //   let width = (document.documentElement.offsetWidth - 1100) / 2;

    //   if (scrollY > 500) {
    //     this.isShow = true;
    //     let element = document.getElementById('sidebar') as HTMLElement;
    //     if (element) {
    //       if (width > 80) {
    //         element.style.right = (width - 120) + 'px';
    //       } else {
    //         element.style.right = '10px';
    //       }
    //     }
    //   } else {
    //     this.isShow = false;
    //   }
    // });
  }

  mounted () {
    // this.showSidebar();
    $('.fb-close').on('click', function () {
      $('.fb-livechat').fadeOut();
    });
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.setAttribute('rel', 'preload');
    let local = this.$Storage.get('locale') || this.FrontE.defaultLang;
    let lang = {
      E: 'en_US',
      S: 'zh_CN',
      C: 'zh_HK'
    };
    s.src =
      'https://connect.facebook.net/' +
      lang[local] +
      '/sdk.js#xfbml=1&version=v3.0';
    document.body.appendChild(s);
  }
}
</script>
<style scoped lang="less">
.siderbarContainer {
  position: relative;
}
.fb-livechat {
  display: none;
  position: fixed;
  right: 0 !important;
  bottom: 60px;
  width: 4rem;
  z-index: 1000000;
  line-height: 0;
}
.fb-widget {
  background: #fff;
  z-index: 2;
  position: absolute;
  width: 360px;
  height: 435px;
  overflow: hidden;
  bottom: 0;
  right: 70px;
  border-radius: 6px;
  -o-border-radius: 6px;
  -webkit-border-radius: 6px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  -o-box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
}

.fb-credit {
  text-align: center;
  margin-top: 8px;
}
.fb-credit a {
  transition: none;
  color: #bec2c9;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  text-decoration: none;
  border: 0;
  font-weight: 400;
}

.fb-overlay {
  z-index: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  -webkit-transition: opacity 0.4s, visibility 0.4s;
  transition: opacity 0.4s, visibility 0.4s;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.05);
  display: none;
}

.fb-close {
  z-index: 4;
  padding: 0 6px;
  background: #365899;
  font-weight: 700;
  font-size: 11px;
  color: #fff;
  margin: 8px;
  border-radius: 3px;
  width: 10px;
  height: 20px;
  line-height: 20px;
  float: right;
  cursor: pointer;
}

.fb-close::after {
  content: "x";
  font-family: sans-serif;
}
#sidebar {
  img {
    width: 50px;
    margin-top: 5px;
  }
  position: fixed;
  right: 0 !important;
  bottom: 60px;
  width: 60px;
  // text-align: center;
  z-index: 997;
  line-height: 0;
  // display: none;

  // .fb-livechat,
  // .fb-widget {
  //     display: none;
  // }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-href {
  transform: translateY(20px);
  opacity: 0;
}
a {
  line-height: 0;
}
@media screen and (max-width: 768px) {
  #sidebar{
    width: 3rem;
    img{
      width: 3rem;
      margin-top: 5px;
    }
  }
  .fb-widget {
    width: 300px;
    height: 500px;
    right: 5rem;
  }
}
</style>
