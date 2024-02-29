<template>
    <div id="footer">
        <div class="footer-container">
            <div class="company-info">
                <div class="footer-nav">
                    <ul>
                        <li v-for="(n,index) in $store.state.footerMenus" :key="index">
                        <!-- <router-link :to="n.Type === 0 ? n.Url : n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 ? '/product/CatProduct?catId=' + n.Value.Id : n.Type === 5 ? '/product/search?key=&attr=' + n.Value.Id : '/product/search?key=&attr=' + n.ParentId + '&attrId=' + n.Value.Id">{{n.Name}}</router-link> -->
                        <a href="javascript:;" v-if="n.Type < 0">{{n.Name}}</a>
                        <a href="javascript:;" v-else-if="n.Type === 0" @click="toUrl(n)">{{n.Name}}</a>
                        <router-link :to="{path: To(n)}" v-else>{{n.Name}}</router-link>
                        <ul>
                            <li v-for="(c,index2) in n.Childs" :key="index2">
                                <a href="javascript:;" v-if="c.Type < 0">{{c.Name}}</a>
                                <a href="javascript:;" v-else-if="c.Type === 0" @click="toUrl(c)">{{c.Name}}</a>
                                <router-link :to="{path: To(c)}" v-else>{{c.Name}}</router-link>
                            </li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <ins-copyright />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class InsFooterLayout extends Vue {
  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/cms/content/' + n.Value.Id : n.Type === 3 ? '/regnpay/form/' + n.Value.Id : '/';
  }
}
</script>

<style scoped lang="less">
#footer {
//   background-color: #535353;
}
.footer-container {
    .company-info {
        width: 1200px;
        // min-width: 900px;
        margin: 0 auto;
        // padding: 70px 0 20px;
        .footer-nav {
            // width: 100%;
            margin-top: 30px;
            margin-bottom: 15px;
            > ul {
                display: flex;
                justify-content: center;
                text-align: center;
                > li {
                        padding: 0 45px;
                    a {
                        font-size: 16px;
                        color: #000;
                        // text-decoration: underline;
                    }

                    > a {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
