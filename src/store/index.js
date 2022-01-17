import  Vue  from "vue";
import  Vuex  from "vuex";
import VuexPersistence from "vuex-persist"
Vue.use(Vuex);


import productsModule from "./modules/products.js";
import cartModule from "./modules/cart.js";

export default new Vuex.Store({
  state(){
    return {
      isLoggedIn:false,
    }
  },
  modules: {
    prods: productsModule,
    cart: cartModule,
  },
  getters:{
    isAuthenticated(state){
      return state.isLoggedIn 
    },
  },
  mutations:{
    login(state){
       state.isLoggedIn = true;
    },
    logout(state){
      console.log(state)
      state.isLoggedIn = false;
    }
  },
  actions:{
    login(context){
      context.commit('login')
    },
    logout(context){
       context.commit('logout')
    }
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage
    }).plugin
  ]
});

