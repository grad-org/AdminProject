import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import NotFoundComponent from '@/components/NotFoundComponent'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Verify from '@/components/Verify'
import SetRule from '@/components/SetRule'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '*',
			component: NotFoundComponent
		},
		{
			path: '/',
			name: 'Home',
			meta: {
				requireAuth: true,
			},
			component: Home
		},
		{
			path: '/driver-management/review/verify',
			name: 'Verify',
			meta: {
				requireAuth: true,
			},
			component: Verify
		},
		{
			path: '/rule-management/set',
			name: 'SetRule',
			meta: {
				requireAuth: true,
			},
			component: SetRule
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		
	],
	mode: 'history'
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('Token')) {
	let ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'))
	store.dispatch('login', window.localStorage.getItem('Token'));
}


router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {		// 判断该路由是否需要登录权限
		if (store.state.token) {	// 通过vuex state获取当前的token是否存在
			next();
		} else {
			next({
				path: '/login',
				query: {redirect: to.fullPath}	 // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})

export default router;
