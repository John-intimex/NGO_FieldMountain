<template>
<div>
    <div class="fff" v-if="this.id == 40193">
        <p class="pls">{{$t('Cms.PlsChoose')}}</p>
        <ul class="cmsList" v-if="fileList.Data && fileList.Data.length>0">
        <li v-for="(file,index) in fileList.Data" :key="index">
            <!-- <a :href="bookLinks[index]" class="fileCover" target="_blank"><img :src="file.ImgUrl"></a> -->
            <div class="fileDes">
                <p v-if="curLang==='C'&& file.Name[0].Desc">{{file.Name[0].Desc}}</p>
                <p v-if="curLang==='E'&& file.Name[1].Desc">{{file.Name[1].Desc}}</p>
                <a :href="file.Url" target="_blank">Download PDF ({{file.FileSize}})</a>
            </div>
        </li>
        </ul>
    </div>
    <div class="ddd" v-if="this.id == 40194">
        <p class="pls">{{$t('Cms.PlsChoose')}}</p>
        <ul class="cmsList" v-if="fileList2.Data && fileList2.Data.length>0">
        <li v-for="(file,index) in fileList2.Data" :key="index">
            <!-- <a :href="bookLinks[index]" class="fileCover" target="_blank"><img :src="file.ImgUrl"></a> -->
            <div class="fileDes">
                <p v-if="curLang==='C'&& file.Name[0].Desc">{{file.Name[0].Desc}}</p>
                <p v-if="curLang==='E'&& file.Name[1].Desc">{{file.Name[1].Desc}}</p>
                <a :href="file.Url" target="_blank">Download PDF ({{file.FileSize}})</a>
            </div>
        </li>
        </ul>
    </div>
    <div v-else>
        <p class="pls">{{$t('Cms.PlsChoose')}}</p>
        <ul class="cmsList">
            <li v-for="(cms,index) in cmsData" :key="index">
                <router-link :to="'/cms/content/'+cms.Id">{{cms.Title}}</router-link>
            </li>
        </ul>
    </div>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCatLayout3 extends Vue {
    @Prop({ default: () => [] }) private cmsData!: object[]; // cms内容数据
    @Prop({ default: () => [] }) private catId!:number

    fileList: object[] = [];
    fileList2: object[] = [];
    curLang: any;
    bookLinks: string[] =[
      '/publications/HKF&DA_design1/mobile/index.html', '/publications/HKF&DA_60th_booklet_lo/mobile/index.html', '/publications/HKF&DA_booklet26092016/mobile/index.html'
    ];

    get id () {
      return this.$route.params.id;
    }

    getFile () {
      this.$Api.file.getFile(22).then((result) => {
        if (result.FileList) {
          this.fileList = result.FileList;
        }
        this.curLang = localStorage.getItem('locale');
      }).catch((error) => {
        console.log(error, 'error');
      });

      this.$Api.file.getFile(23).then((result) => {
        if (result.FileList) {
          this.fileList2 = result.FileList;
        }
        this.curLang = localStorage.getItem('locale');
      }).catch((error) => {
        console.log(error, 'error');
      });
    }
    created () {
      this.getFile();
      console.log(this.id, 'ID');
    }
}
</script>

<style scoped lang="less">
.pc {
    .pls {
        margin-bottom: 20px;
    }

    .cmsList {
        li {
            font-size: 16px;
            margin-bottom: 15px;

            a {
                padding: 5px;
                color: #535353;
                display: inline-block;
                text-decoration: underline;
            }

            &:hover {
                a {
                    color: @base_color;
                }
            }
        }
    }
}

.mobile {
    .pls {
        margin-bottom: 2rem;
        font-size: 1.3rem;
    }

    .cmsList {
        li {
            font-size: 1.3rem;
            margin-bottom: 1rem;

            a {
                padding: 0.5rem;
                color: #535353;
                display: inline-block;
                text-decoration: underline;
            }

            &:hover {
                a {
                    color: @base_color;
                }
            }
        }
    }
}
</style>
