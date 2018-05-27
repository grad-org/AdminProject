
<template>
	<div :style="backgroundPic" class="container">
		<div class="main-content">
			<span style="display: block"><logo id="logo" height="48px" ></logo></span>
			<div style="margin: 36px 0 36px 0">
				<Input v-model="username" size="large" placeholder="请输入您的用户名" :autofocus="usernameFocus" >
					<span slot="prepend">账号</span>
				</Input>
				<div style="height: 36px"></div>
				<Input v-model="password" size="large" type="password" placeholder="请输入您的密码" :autofocus="passwordFocus">
					<span slot="prepend">密码</span>
					<Button slot="append" icon="android-arrow-forward" @click="login"></Button>
				</Input>
			</div>
		</div>
	</div>
</template>

<script>

	import Logo from '../assets/Logo'

	export default {
		components: {
			Logo
		},
		data () { 
			return {
				username: null,		// 用户名
				password: null,		// 密码
				usernameFocus: true,
				passwordFocus: false,

				backgroundPic: {
					backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					height: '',
					width: ''
				}
			}
		},
		mounted () {
			
			this.initHeight();
			this.setMapHeight();
		},
		methods: {
			login () {
				console.log('进行登录操作');
				if (this.username == null || this.username == '' || this.password == null || this.password == '') {
					console.log('不能为空');
					if (this.username == null || this.username == '') {
						this.$nextTick(() => {
							this.usernameFocus = true;
							this.passwordFocus = false;
						})
						console.log('这里');
					} else {
						this.passwordFocus = false;
						this.passwordFocus = true;
					}
				} else {
					this.$axios.post('/api/auth/login', {
						username: this.username,
						password: this.password
					}).then(
						(response) => {
							console.log(response);
							if (response.status == 200) {
								this.$store.dispatch('login', response.data.data.token);
								// this.$router.push({name: 'Home'});
								this.$axios.get('/api/auth/user').then((response) => {
									console.log('查询用户资料返回：', response);
									let data = response.data.data;
									let arr = response.data.data.authorities;
									let tmp = arr.indexOf('ROLE_ADMIN');
									if (tmp == -1) {
										console.log('该用户不是管理员');
										this.$Notice.error({
											title: '当前账号没有管理员权限！'
										});
									} else {
										// 可以跳转
										window.localStorage.setItem('UserInfo', JSON.stringify(data));
										this.$router.push({name: 'Home'});
									}
								}).catch((error) => {
									console.log('查询用户资料失败返回：', error);
								})
							}
						}
					).catch((error) => {
						console.log(error);
						if (error.status == 401) {
							this.$Notice.error({
								title: '登录密码错误！'
							});
						}
					})
				}
			},
			initHeight () {
				let _this = this
				// 注：window.onresize只能在项目内触发1次
				// 通过捕获系统的onresize事件触发我们需要执行的事件
				// 参考：https://blog.csdn.net/bai_riqiang/article/details/78749667
				window.onresize = function () {
					return (()=> {
						// 浏览器内容可视高度
						window.fullHeight = document.documentElement.clientHeight;
						window.fullWidth = document.documentElement.clientWidth;
						_this.backgroundPic.height = window.fullHeight + 'px';
						_this.backgroundPic.width = window.fullWidth + 'px';
					}) ()
				}
			},
			setMapHeight () {
				this.$nextTick (() => {
					this.backgroundPic.height = document.documentElement.clientHeight + 'px';
					this.backgroundPic.width = document.documentElement.clientWidth + 'px';
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: 100%;
		position: relative;
		padding: auto 0
	}
	.main-content {
		margin: auto;
		padding: 36px;
		background: #fff;
		width: 360px;
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
		/* border: 1px solid #999; */
		border-radius: 6px;
		-webkit-box-shadow: rgb(177, 177, 177) 0px 0px 1px 1px;
		-moz-box-shadow: rgb(177, 177, 177) 0px 0px 1px 1px;
		box-shadow: rgb(177, 177, 177) 0px 0px 1px 1px;
	}
</style>
