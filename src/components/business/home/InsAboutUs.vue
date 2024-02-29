<template>
  <div class="about-main" :class="{'ENG':$Storage.get('locale') === 'E'}">
    <div class="main_1 fix">
      <p class="title">{{content.Title}}</p>
      <div class="content fix">
        <div class="left">
          <div class="cover">
            <img :src="content.Cover" />
          </div>
        </div>
        <div class="right">
          <div class="body" v-html="content.Body"></div>
        </div>
      </div>
      <router-link class="view-more" to="/CMS/content/20422">{{$t('Action.ViewMore')}}</router-link>
    </div>
    <div class="main_2">
      <!-- <p class="title">{{content2.Title}}</p> -->
      <div class="content">
          <div class="body" v-html="content2.Body"></div>
      </div>
      <router-link class="view-more" to="/CMS/content/20420">{{$t('Action.ViewMore')}}</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class CmxAboutUs extends Vue {
  content: object = {};
  content2: object = {};
  // 获取关于我们cms内容
  getContent () {
    // this.$Api.cms.getContentByKey({ key: 'k_ab' }).then((result) => {
    //   this.content = result;
    // });

    this.$Api.cms.getContentByDevice({ key: 'aboutus', IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
    });
    this.$Api.cms.getContentByDevice({ key: 'team', IsMobile: this.isMobile }).then(result => {
      this.content2 = result.CMS;
    });
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    this.getContent();
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getContent();
  }
}
</script>

<style lang="less" scoped>
.pc {
    .about-main {
        width: 1200px;
        margin: 0 auto;
        .title{
          font-size: 30px;
          color: #000;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
        }
      .main_1{
        margin-top: 50px;
        .content{
          .left{
            width: 135px;
            height: 170px;
            float: left;
            .cover{
              width: 100%;
              border: 1px solid #7d7d7d;
              box-sizing: border-box;
              img{
                width: 100%;
                display: block;
                object-fit: cover;
                object-position: 50% 50%;
              }
            }
          }
          .right{
            float: right;
            width: calc( 100% - 135px);
            // border: 1px solid #000;
            padding: 9px 15px;
            box-sizing: border-box;
            .body{
              height: 150px;
              overflow: hidden;

            }
          }
        }
      }

      .main_2{
        margin-top: 50px;
        .body{
          height: 175px;
          overflow: hidden;
          /deep/ h2{
            p{
              font-size: 30px;
            color: #000;
            margin-bottom: 20px;
            text-align: center;
            }

          }
        }
      }

        .content {

            .body {
            /deep/ p {
                font-size: 16px;
                color: #363636;
                // line-height: 36px;
                text-align: justify;
            }
          }

        }
        .view-more {
            font-size: 18px;
            color: #363636;
            padding: 12px 40px;
            border: 1px solid #7d7d7d;
            margin-top: 20px;
            display: table;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            border-radius: 10px;
          }
    }
}

.mobile {
    .about-main {
        margin: 2rem auto 2rem;
        padding: 0 0.8rem;
        box-sizing: border-box;
        .main_1{
          .title {
            font-size: 1.8rem;
            color: #000;
            font-weight: bold;
            margin-bottom: 2rem;
            text-align: center;
          }
          .left{
            img{
              display: block;
            }
          }
        }
        .content {
            padding: 0 0.5rem;

            .body {
              height: 30rem;
              overflow: hidden;
              /deep/ p {
                font-size: 1.2rem;
                color: #363636;
                line-height: 1.8rem;
                text-align: justify;
              }
            }

        }

        .cover {
            margin-bottom: 2rem;
            text-align: center;
            img {
              max-width: 100%;
              display: block;
                margin: 0 auto;
            }
        }
        .view-more {
            font-size: 1.2rem;
            color: #363636;
            border: 1px solid #7d7d7d;
            display: inline-block;
            font-size: 1.2rem;
            color: #363636;
            padding: 0.7rem 3.4rem;
            display: table;
            text-decoration: none;
            margin: 2rem auto;
            border-radius: 5px;
        }
            .main_2{
              .content{
                .body{
                  overflow: hidden;
                  height: 25rem;
                  /deep/ h2{
                      text-align: center;
                      p{
                        font-size: 1.8rem;
                        color: #000;
                        font-weight: bold;
                        margin-bottom: 2rem;
                        text-align: center;
                      }
                    }
                }
              }
            }
    }
}
.about-main.ENG{
  .main_1{
    .content{
      .right{
        .body{
            height: 118px;
            overflow: hidden;
        }
      }
    }
  }
  .main_2{
    .body{
      height: 238px;
      overflow: hidden;
    }
  }
}
</style>
