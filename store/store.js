import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: ''
  },
  mutations: {
    increment (state,n) {
      state.count = n;
    }
  },
  actions: {
	  getCount(){
		  
	  }
  }
})

export default store;