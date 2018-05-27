
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

	// 定义状态
	state: {
		token: null,
		userId: null,
	},
	mutations: {
		// 其中第一个参数 state 就是 $store.state，第二个参数 payload 需要另外传入
		login: (state, payload) => {
			window.localStorage.Token = payload;
			state.token = payload;
		},
		logout: (state) => {
			window.localStorage.removeItem('Token');
			window.localStorage.removeItem('UserId');
			window.localStorage.removeItem('DriverId');
			window.localStorage.removeItem('Nickname');
			window.localStorage.removeItem('UserInfo');
			state.token = null;
			state.userId = null;
			state.driverId = null,
			state.outset = null;
			state.destination = null
		},
		userId: (state, payload) => {
			window.localStorage.UserId = payload;
			state.userId = payload;
		},
	},
	actions: {
		login: (context, token) => {
			context.commit('login', token);
		},
		logout: (context) => {
			context.commit('logout');
		},
		userId: (context, userId) => {
			context.commit('userId', userId);
		},
	}
})

export default store