<template>
  <div id="container">

    <div class="CmsContent">
      <div class="rightContent">
        <Location LocationTips="您的当前位置：" Homepage="首页" :Column="content.Category.Name" :Title="content.Title"></Location>
        <!-- <div class="title">
          {{cmstitle}}
        </div> -->
        <!-- 联络我们页面 -->
        <div v-if="content.Key=='ContactUs'">
          <h1 class="CmsContentTitle">{{content.Title}}</h1>
          <div v-html="content.Body"></div>

          <!-- <hr> -->

          <div class="Form">
            <RNPForm formKey="ContactUs" />
          </div>
        </div>
        <div v-if="content.Key=='onlineform'">
          <h1 class="CmsContentTitle">{{content.Title}}</h1>
          <div v-html="content.Body"></div>

          <!-- <hr> -->

          <div class="Form">
            <RNPForm formKey="onlineform" />
          </div>
        </div>

        <!-- 其他页面 -->
        <div v-else>
          <h1 class="CmsContentTitle">{{content.Title}}</h1>
          <p v-html="content.Body"></p>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    Location: () => import('@/components/base/InsLocation.vue'),
    RNPForm: () => import('@/views/regNPay/regNPayForm.vue')
  }
})
export default class InsCmsContent extends Vue {
  content: object={};
  cmstitle: string = '';

  // 获取关于我们cms内容
  getContent () {
    this.$Api.cms.getContentByDevice({ ContentId: this.id, IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
      this.cmstitle = result.CMS.Title;
      // this.$HiddenLayer();

      this.$nextTick(() => {
        if (result.CMS.Title) document.title = result.CMS.Title;
        (document.getElementsByName('keywords')[0] as any).content = result.CMS.SeoKeyword;
        (document.getElementsByName('description')[0] as any).content = result.CMS.SeoDesc;
        (document.getElementsByName('twitter:description')[0] as any).content = result.CMS.SeoDesc;
        (document.getElementsByName('twitter:title')[0] as any).content = result.CMS.Title;
      });
    });
  }

  get id () {
    return this.$route.params.id;
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

  @Watch('id', { deep: true })
  onKeyChange () {
    this.content = {};
    this.getContent();
  }
}
</script>
<style scoped lang="less">
.pc {
  .title{
    font-size: 36px;
    color: #000;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .CmsContent {
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .CmsContentTitle {
    font-size: 36px;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
  }
  .rightContent {
    // width: 70%;
    // float: left;
    // position: relative;
    margin-bottom: 30px;
    min-height: 700px;
    /deep/ .left{
        float: left;
        width: 50%;
        margin-bottom: 15px;
      }
      /deep/ .right{
        float: right;
        width: 50%;
        margin-bottom: 15px;
      }
    /deep/ p {
        font-size: 18px;
        color: #363636;
        // line-height: 36px;
        text-align: center;

    }
    /deep/ .maps{

        iframe{
          border: none;
          display: block;
        }
      }
  }

  .Form {
    width: 80%;
    margin: 0 auto;

    /deep/ .RNPForm.default {
      background-color: #fff;
      .FormMain {
        min-width: auto;

        #content {
          .btn.save {
            border: 0;
            width: 100%;
            background-color: @base_color;
            border-radius: 0;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .form-group {
              padding: 0;
              border: 0;
              width: 100%;

              .control-label-remark {
                display: none;
              }

              ::-webkit-input-placeholder{
                color: #000000;
              }
              ::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #000000;
              }
              :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #000000;
              }
              :-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #000000;
              }

              fieldset {
                &.text {
                  input[type="text"] {
                    border: 1px solid #ccc;
                    padding: 10px 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                  }
                }

                &.email {
                  input[type="email"] {
                    border: 1px solid #ccc;
                    padding: 10px 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                  }
                }

                &.textarea {
                  textarea {
                    height: 165px;
                    border: 1px solid #ccc;
                    padding: 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                  }
                }
              }
            }
          }
        }

        #preview {
          padding: 0;
        }
      }
    }
  }

  .clear {
    clear: both;
  }
}

.mobile {
  .CmsContentTitle {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    margin-top: 2rem;
    color: #000;
  }
  .rightContent {
    width: 100%;
    position: relative;
    margin-bottom: 3rem;
    padding: 0 0.8rem;
    box-sizing: border-box;
    .title{
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      text-align: center;
      margin-top: 2rem;
      color: #000;
    }
    /deep/ p {
                font-size: 1.2rem;
                color: #363636;
                line-height: 1.8rem;
            }
    /deep/ .left{
      width: 100%;
      margin-bottom: 2rem;
      text-align: center;
      p {
                font-size: 1.3rem;
                color: #363636;
                line-height: 1.8rem;
                margin-bottom: 1rem;
            }
    }
    /deep/ .right{
      width: 100%;
      margin-bottom: 2rem;
      text-align: center;
    }
    /deep/ .maps{
      iframe{
        border: none;
        display: block;
      }
    }

  }

  .Form {
    /deep/ .RNPForm.default {
      background-color: #fff;
      .FormMain {
        min-width: auto;

        #content {
          .btn.save {
            border: 0;
            width: 100%;
            background-color: @base_color;
            border-radius: 0;
            font-size: 1.1rem;
            height: 3.2rem;
            margin: 0;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .form-group {
              padding: 0;
              border: 0;
              width: 100%;

              .control-label-remark {
                display: none;
              }

              ::-webkit-input-placeholder{
                color: #000000;
              }
              ::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #000000;
              }
              :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #000000;
              }
              :-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #000000;
              }

              fieldset {
                &.text {
                  input[type="text"] {
                    border: 1px solid #ccc;
                    padding: 0.8rem 1.3rem;
                    font-size: 1rem;
                    box-sizing: border-box;
                  }
                }

                &.email {
                  input[type="email"] {
                    border: 1px solid #ccc;
                    padding: 0.8rem 1.3rem;
                    font-size: 1rem;
                    box-sizing: border-box;
                  }
                }

                &.textarea {
                  textarea {
                    height: 9rem;
                    border: 1px solid #ccc;
                    padding: 1.3rem;
                    font-size: 1rem;
                    box-sizing: border-box;
                  }
                }
              }
            }
          }
        }

        #preview {
          padding: 0;

          input[type="button"] {
            font-size: 1.1rem;
            height: 3.2rem;

            &:first-of-type {
              margin-top: 2rem;
            }
          }
        }
      }
    }
  }

  .clear {
    clear: both;
  }
}
</style>
