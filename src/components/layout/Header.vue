<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="" @on-select="click1">
					<div class="layout-logo" style="background: rgba(91, 98, 112, 0)" @click="goHome">
						<div style="margin-top: -10px">
							<logo id="logo"></logo>
						</div>
						<!-- 蔚蓝出行 -->
					</div>
					<div class="layout-nav" >
						<MenuItem name="logout" style="float: right" >
							<Icon type="android-exit"></Icon>
							退出
						</MenuItem>
						<MenuItem name="username" style="float: right" >
							<Icon type="person"></Icon>
							{{username}}
						</MenuItem>
					</div>
				</Menu>
			</Header>
		</Layout>
	</div>
</template>


<script>

	import Logo from '../../assets/LogoWhite'

	export default {
		components: {
			Logo
		},
		data () {
			return {
				username: ''
			}
		},
		created () {
			let ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'));
			this.username = ls_userinfo.username;
		},
		mounted () {

		},
		methods: {
			click1 (name) {
				console.log(name);
				if (name == 'logout') {
					this.$store.dispatch('logout');
					this.$router.push({name: 'Login'})
				}
			},
			goHome () {
				this.$router.push({name: 'Home'});
			},
			logout () {
				console.log('退出');
			}
		},
		destroyed () {
			
		}
	}
</script>

<style scoped>
	@import '../../assets/css/home.css';
</style>
