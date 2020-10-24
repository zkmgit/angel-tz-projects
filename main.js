import Vue from 'vue'
import App from './App'
// import Vuex from 'vuex';

// Vue.use(Vuex);
import store from './store/store.js'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
