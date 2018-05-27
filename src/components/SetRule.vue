<template>
	<div >
		<header-part></header-part>
		<div class="layout">
			<Layout>
				<Layout :style="{padding: '0 50px'}">
					<Breadcrumb :style="{margin: '16px 0'}">
						<BreadcrumbItem>首页</BreadcrumbItem>
						<BreadcrumbItem>计费管理</BreadcrumbItem>
						<BreadcrumbItem>设定规则</BreadcrumbItem>
					</Breadcrumb>
					<Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
						<Layout>
							<Sider hide-trigger :style="{background: '#fff'}">
								<Menu active-name="setRule" :open-names="['ruleManagement']" accordion width="auto" @on-select="selectMenu">
									<Submenu name="driverManagement">
										<template slot="title">
											<Icon type="android-car"></Icon>
											车主管理
										</template>
										<MenuItem name="verifyDriver">车主审核</MenuItem>
									</Submenu>
									<Submenu name="ruleManagement">
										<template slot="title">
											<Icon type="ios-compose"></Icon>
											计费管理
										</template>
										<MenuItem name="setRule">设定规则</MenuItem>
									</Submenu>
								</Menu>
							</Sider>
							<Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
								<h2>设定计费规则：</h2>
								<br>
								<Form :model="formItem" :label-width="80">
									<FormItem label="起步价（元）：" :label-width="labelWidth">
										<Input v-model="formItem.initialPrice" span="8" :placeholder="placeholder1" ></Input>
									</FormItem>
									<FormItem label="起步里程（元）：" :label-width="labelWidth">
										<Input v-model="formItem.initialMileage" :placeholder="placeholder2" ></Input>
									</FormItem>
									<FormItem label="里程费（元/公里）：" :label-width="labelWidth">
										<Input v-model="formItem.unitPricePerKilometer" :placeholder="placeholder3" ></Input>
									</FormItem>
									<FormItem label="时长费（元/分钟）：" :label-width="labelWidth">
										<Input v-model="formItem.unitPricePerMinute" :placeholder="placeholder4" ></Input>
									</FormItem>
									<FormItem :label-width="labelWidth">
										<Button type="success" @click="reset">修改</Button>
									</FormItem>
								</Form>
							</Content>
						</Layout>
					</Content>
				</Layout>
				<Footer class="layout-footer-center">2017-2018 &copy; 蔚蓝出行后台管理系统</Footer>
			</Layout>
		</div>
	</div>
</template>

<script>

	import HeaderPart from './layout/Header'

	export default {
		components: {
			HeaderPart
		},
		data () {
			return {
				labelWidth: 130,

				placeholder1: 'Enter something...',
				placeholder2: 'Enter something...',
				placeholder3: 'Enter something...',
				placeholder4: 'Enter something...',

				// 表单数据
				formItem: {
					initialPrice: '',			// 起步价
					initialMileage: '',			// 起步里程
					unitPricePerKilometer: '',	// 里程费
					unitPricePerMinute: '',		// 时长费
				}
			}
		},
		computed: {

		},
		created () {

		},
		mounted () {

		},
		methods: {
			reset () {
				// console.log('设定规则');
				if (this.formItem.initialPrice == '' || this.formItem.initialMileage == '' || this.formItem.unitPricePerKilometer == '' || this.formItem.unitPricePerMinute == '') {
					this.$Notice.warning({
						title: '请输入数据！'
					});
				} else {
					this.$axios.post('/api/fareRule', {
						initialPrice: this.formItem.initialPrice,
						initialMileage: this.formItem.initialMileage,
						unitPricePerKilometer: this.formItem.unitPricePerKilometer,
						unitPricePerMinute: this.formItem.unitPricePerMinute
					}).then((response) => {
						if (response.status == 200) {
							this.$Notice.success({
								title: '计费规则修改成功！',
							});
							this.$router.push({name: 'SetRule'});
						}
					}).catch((error) => {
						if (error.status == 400) {
							this.formItem.initialPrice = '';
							this.formItem.initialMileage = '';
							this.formItem.unitPricePerKilometer = '';
							this.formItem.unitPricePerMinute = '';
							this.placeholder1 = '仅可输入数字或小数...';
							this.placeholder2 = '仅可输入数字或小数...';
							this.placeholder3 = '仅可输入数字或小数...';
							this.placeholder4 = '仅可输入数字或小数...';
							this.$Notice.error({
								title: '计费规则修改失败！',
							});
						}
					})
				}
			},
			// 选中侧栏
			selectMenu (name) {
				console.log(name);
				if (name == 'verifyDriver') {
					this.$router.push({name: 'Home'})
				};
				if (name == 'setRule') {
					this.$router.push({name: 'SetRule'})
				};
			},
		}
	}
</script>

<style scoped>
	@import '../assets/css/home.css';
</style>