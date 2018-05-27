<template>
	<div >
		<header-part></header-part>
		<div class="layout">
			<Layout>
				<Layout :style="{padding: '0 50px'}">
					<Breadcrumb :style="{margin: '16px 0'}">
						<BreadcrumbItem>首页</BreadcrumbItem>
						<BreadcrumbItem>车主列表</BreadcrumbItem>
						<BreadcrumbItem>待审核车主</BreadcrumbItem>
					</Breadcrumb>
					<Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
						<Layout>
							<!-- <sider-part></sider-part> -->
							<Sider hide-trigger :style="{background: '#fff'}">
								<Menu active-name="verifyDriver" :open-names="['driverManagement']" accordion width="auto" @on-select="selectMenu">
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
								<h2>以下是提交车主认证申请的相关信息：</h2>
								<br>
								<h4>温馨提示：点击某项可对该车主进行审核。</h4>
								<br>
								<Table border :columns="tableHeader" :data="tableData" @on-row-click="selectItem"></Table>
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

	import Logo from '../assets/Logo'
	import HeaderPart from './layout/Header'
	import SiderPart from './layout/Sider'

	export default {
		components: {
			Logo, HeaderPart, SiderPart
		},
		data () {
			return {
				tableHeader: [
					{
						title: '序号',
						key: 'index',
					},
					{
						title: '用户ID',
						key: 'userId'
					},
					{
						title: '申请人',
						key: 'name'
					},
					{
						title: '当前认证状态',
						key: 'driverStatus'
					},
					{
						title: '车主ID',
						key: 'driverId'
					},
					{
						title: '操作',
						key: 'edit',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.index)
										}
									}
								}, '去审核')
							]);
						}
					}
				],
				tableData: [],
				driverList: null
			}
		},
		created () {
			// this.$axios.get('/api/auth/user').then((response) => {
			// 	console.log('用户数据返回：', response);
			// });
			// 
			this.$axios.get('/api/driver/search/findPendingReviewDriver').then((response) => {
				console.log('待审核的车主资料返回：', response);
				let Lists = response.data.data;
				this.driverList = Lists;
				if (Lists.length != 0) {
					Lists.forEach ((item, index) => {
						this.tableData.push({index: index + 1 ,userId: item.userId, name: item.drivingLicense.driverName, driverId: item.driverId, driverStatus: '待审核'})
					})
					// this.tableData.edit = '编辑'
				} else {
					this.tableData = [];
				}
				
				
			}).catch((error) => {
				console.log(error);
			})
		},
		mounted () {

		},
		methods: {
			// 选中表格
			selectItem (rol, index) {
				console.log('rol：', rol);
				// console.log(index);
				window.localStorage.setItem('DriverVerifyInfo', rol.driverId);
				this.$router.push({name: 'Verify'});
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
			show (index) {
				this.$Modal.info({
					title: this.tableData[index].name + '车主资料：',
					content: `Name：${this.tableData[index].userId}<br>Age：${this.tableData[index].name}<br>Address：${this.tableData[index].driverId}`
				})
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
	@import '../assets/css/home.css';
</style>
