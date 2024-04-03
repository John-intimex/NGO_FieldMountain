<template>
  <div id="container" class="catDetail">
    <!-- <ins-banner data="http://lstrehacare.dev.in-store.hk:84/Images/forweb/about_banner.jpg" /> -->
    <div class="title">{{cmsTitlie}}</div>
    <div class="catContent">
        <template v-if="cmsCategory.PageStyle === '0' || cmsCategory.PageStyle === '1'">
          <div v-html="cmsCategory.Content" class="layer"></div>
          <div class="calendar" v-if="cmsCategory.Id===40195">
            <ins-calendar />
          </div>
        </template>

        <ins-cat-layout2 :catData="cmsCatTree" :cmsData="contentList" @changeCatSelect="changeCatSelect" v-if="cmsCategory.PageStyle === '2'" />

        <ins-cat-layout3 v-if="cmsCategory.PageStyle === '3'" />

        <ins-cat-layout4 :cmsData="contentList" :pager="pager" v-if="cmsCategory.PageStyle === '4'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    // InsBanner: () => import('@/components/base/InsBanner.vue'),
    InsCatLayout2: () => import('@/components/business/cms/InsCatLayout2.vue'),
    InsCatLayout3: () => import('@/components/business/cms/InsCatLayout3.vue'),
    InsCatLayout4: () => import('@/components/business/cms/InsCatLayout4.vue'),
    InsCalendar: () => import('@/components/business/home/InsCalendar.vue')
  }
})
export default class insNews extends Vue {
    cmsCategory: object = {}; // cms下单个目录的信息
    cmsCatTree: object[] = []; // cms目录
    contentList: object[] = []; // cms内容列表
    catId: number = 0; // Tree点击获取内容列表的目录id
    catstyleId: number = 0; //
    PageStyle: string = '0'; // catDetail页面类型
    pager: any = {
      currentPage: 1, // 当前页
      pageSize: 12, // 每页显示条目个数
      totalRecord: 0 // 总条目数
    }
    cmsTitlie: string='';

    // 根据设备类型获取CMSCategory信息
    getCategoryByDevice () {
      this.$Api.cms.getCategoryByDevice({ CatId: this.id, IsMobile: this.isMobile }).then((result) => {
        this.cmsCategory = result;
        this.PageStyle = result.PageStyle;
        this.cmsTitlie = result.Name;
        console.log(result, 'resultresult');
        switch (result.PageStyle) {
          case '2':
            this.getCategoryTree();
            break;
          case '3':
            this.getSubCatContents();
            break;
          case '4':
            this.getContentsByCatId();
            break;
        }

        this.$nextTick(() => {
          if (result.Name) document.title = result.Name;
          (document.getElementsByName('keywords')[0] as any).content = result.SeoKeyword;
          (document.getElementsByName('description')[0] as any).content = result.SeoDesc;
          (document.getElementsByName('twitter:description')[0] as any).content = result.SeoDesc;
          (document.getElementsByName('twitter:title')[0] as any).content = result.Name;
        });
      }).catch((error) => {
        console.log(error, 'error');
        this.$message({
          message: error,
          type: 'error'
        });
      });
    }

    // 获取cms该id下所有的Category
    getCategoryTree () {
      this.$Api.cms.getCategoryTree({ id: this.id }).then((result) => {
        if (result && result.length) {
          this.cmsCatTree = result;
          this.catId = result[0].Id;
          this.getContentsByCatId();
        } else {
          this.getContentsByCatId();
        }
      });
    }

    // 获取cms该id下所有的cms
    getContentsByCatId () {
      let catId = this.catId || this.id;
      this.$Api.cms.getContentsByCatId(catId, this.pager.currentPage, this.pager.pageSize).then((result) => {
        this.contentList = result.Data;

        result.Data.forEach(function (i) {
          var newDate = new Date(i.CreateDate.replace(/-/g, '/'));
          i.CreateDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        });
        this.pager.totalRecord = result.TotalRecord;
      });
    }

    // 获取 Category 和所有 SubCategory 的 cms 列表
    getSubCatContents () {
      this.$Api.cms.getSubCatContents({ CatId: this.id, IsMobile: this.isMobile }).then((result) => {
        console.log(result, ' 获取 Category 和所有 SubCategory 的 cms 列表');
        this.contentList = result.Data;
        this.catstyleId = result.Data.CatId;
        console.log(this.catstyleId, 'this.catstyleId');
      });
    }

    // 树形控件选择的cms目录改变
    changeCatSelect (Id) {
      this.catId = Id;
      this.getContentsByCatId();
    }

    get id () {
      return this.$route.params.id;
    }

    get isMobile () {
      return this.$store.state.isMobile;
    }

    mounted () {
      this.getCategoryByDevice();
    }

    @Watch('id', { deep: true })
    onKeyChange () {
      this.cmsCategory = {};
      this.cmsCatTree = [];
      this.contentList = [];
      this.catId = 0;
      this.getCategoryByDevice();
    }

    @Watch('isMobile', { deep: true })
    onMediaChange () {
      if (this.PageStyle === '0') {
        this.cmsCategory = {};
        this.cmsCatTree = [];
        this.contentList = [];
        this.catId = 0;
        this.getCategoryByDevice();
      }
    }

    @Watch('pager.currentPage', { deep: true })
    onPagerChange () {
      this.getContentsByCatId();
    }
}
</script>
<style scoped lang="less">
.pc {
    .catDetail {
      .title{
        font-size: 36px;
        color: #000;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 20px;
      }
        .catContent {
            width: 1200px;
            margin: 0 auto;
            // padding: 15px 0;

            .layer {
                font-size: 16px;
            }
            .calendar{
              margin-top: 50px;
              text-align: center;
            }
        }
    }
}

.mobile {
    .catDetail {
      .title{
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        text-align: center;
        margin-top: 3rem;
        color: #000;
      }
        .catContent {
          width: 100%;
          padding: 0 0.8rem;
          box-sizing: border-box;
          margin: 2rem auto;
            .layer {
                font-size: 1.2rem;
            }
        }
    }
}
</style>
