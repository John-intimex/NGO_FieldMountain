<template>
    <div class="copyright">
        <div v-if="isMobile">
            <p>© copyright {{year}}  Field & Mountain Division Limited powerby eventizer <a target="_blank" href="https://eventizer.hk/">
            <img src="/static/Images/ngo.png" />
        </a></p>

        </div>
        <div v-else>
            <p>© copyright {{year}}  Field & Mountain Division Limited powerby eventizer</p>

        <a target="_blank" href="https://eventizer.hk/">
            <img src="/static/Images/ngo.png" />
        </a>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsCopyright extends Vue {
    year: number = 0;

    get isMobile () {
      return this.$store.state.isMobile;
    }
    created () {
      let date = new Date();
      this.year = date.getFullYear();
    }
}
</script>
<style lang="less" scoped>
.copyright {
    // background-color: #535353;
}

.pc {
    .copyright {
        text-align: center;
        padding: 20px 0;
        p {
            color: #000;
            font-size: 14px;
            display: inline-block;
            vertical-align: middle;
        }

        img {
            vertical-align: middle;
            margin-left: 12px;
        }
    }
}

.mobile {
    .copyright {
        padding: 0.6rem 1rem 1rem;
        text-align: center;

        p {
            display: inline-block;
            color: #fff;
            font-size: 1.2rem;
            vertical-align: middle;
        }

        img {
            vertical-align: middle;
            margin-left: 0.5rem;
        }
    }
}
</style>
