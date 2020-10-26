import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: '',
	cartNum: 0,
  },
  mutations: {
    increment (state,n) {
      state.count = n;
    },
	setCartNum (state,n) {
	  state.cartNum = n;
	  console.log("cart",state.cartNum);
	},
  },
  getters:{
	  getCartNum(state){
		  return state.cartNum;
	  }
  },
  actions: {
	  getCount(){
		  
	  }
  }
})

export default store;