<template>
	<div class="layout">
		<Layout>
			<Sider hide-trigger :style="{background: '#fff'}">
				<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
					<Submenu name="1">
						<template slot="title">
							<Icon type="ios-navigate"></Icon>
							车主审核
						</template>
					</Submenu>
				</Menu>
			</Sider>
		</Layout>
	</div>
</template>


<script>


	export default {
		data () {
			return {
			}
		},
		created () {
			
		},
		mounted () {

		},
		methods: {
			
		},
		destroyed () {
			
		}
	}
</script>

<style scoped>
	@import '../../assets/css/home.css';
</style>
