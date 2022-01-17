import  Vue  from 'vue';

import router from './router/index.js';
import store from './store/index.js';
import App from './App.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import VuePaginateSrcoll from "vue-paginate-scroll";


Vue.component('base-badge', BaseBadge )
Vue.component("VuePaginateScroll", VuePaginateSrcoll);


new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
  
