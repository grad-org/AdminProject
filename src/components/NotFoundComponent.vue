<template>
	<div style="height: 300px; ">
		<h1>Page Not Found，404！</h1>
		<button class="demo-raised-button" @click="goHome">返回首页</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'})
			}
		}
	}
</script>

<style scoped>
	* {
		text-align: center;
	}
</style>


