import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Store } from 'vuex';
import { Api } from '@/sdk/InstoreSdk';
// 扩充
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter;
        $route: Route;
        $store: Store<any>;
        $Api: any;
        $Inform : any;
        $Notice : any;
        $Confirm : any;
        $ShowLayer : any;
        $HiddenLayer : any;
        $SingtonConfirm : any;
        $ClearSingtonConfirm : any;
        $Storage : any;
        $LoadScript: any;
        vw : number;
        Shake : Function;
        FrontE : any;
    }
}
