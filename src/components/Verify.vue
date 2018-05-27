<template>
	<div >
		<header-part></header-part>
		<div class="layout">
			<!-- <Button @click="error">Display error prompt</Button> -->
			<Layout>
				<Layout :style="{padding: '0 50px'}">
					<Breadcrumb :style="{margin: '16px 0'}">
						<BreadcrumbItem>首页</BreadcrumbItem>
						<BreadcrumbItem>车主审核</BreadcrumbItem>
						<BreadcrumbItem>列表</BreadcrumbItem>
						<BreadcrumbItem>{{driverName}}</BreadcrumbItem>
					</Breadcrumb>
					<Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
						<Layout>
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
								<h2>以下是车主（{{driverName}}）提交的认证资料：</h2>
								<br>
								<Form :model="formItem" :label-width="80">
									<h4>车主信息：</h4>
									<br>
									<FormItem label="真实姓名：" :label-width="labelWidth">
										<Input v-model="formItem.driverName" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem label="身份证号码：" :label-width="labelWidth">
										<Input v-model="formItem.driverIDNumber" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<h4>驾驶证信息：（驾驶证必须是车主本人的）</h4>
									<br>
									<FormItem label="初次领证日期：" :label-width="labelWidth">
										<Input v-model="formItem.initialLicenseDate" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem label="驾驶证图片：" :label-width="labelWidth">
										<Col :span="drivingLicenseGrid">
											<img :src="drivingLicenseLink" width="100%" height="100%" @click="toggleDriverGrid"/>
										</Col>
										<Col span="24">
											<div><h6>点击图片可放大（缩小）</h6></div>
										</Col>
									</FormItem>
									<h4>车辆信息：</h4>
									<br>
									<FormItem label="车辆所有人：" :label-width="labelWidth">
										<Input v-model="formItem.carOwner" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem label="车辆注册日期：" :label-width="labelWidth">
										<Input v-model="formItem.carRegisterDate" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem label="车牌号码：" :label-width="labelWidth">
										<Input v-model="formItem.carPlateNo" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem label="车辆品牌系列：" :label-width="labelWidth">
										<Input v-model="formItem.carBrandInfo" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem label="行驶证图片：" :label-width="labelWidth">
										<Col :span="vehicleLicenseGrid">
											<img :src="vehicleLicenseLink" width="100%" height="100%" @click="toggleVehicleGrid"/>
										</Col>
										<Col span="24">
											<div><h6>点击图片可放大（缩小）</h6></div>
										</Col>
									</FormItem>
									<h4>当前状态：</h4>
									<br>
									<FormItem label="车主认证状态：" :label-width="labelWidth">
										<Input v-model="formItem.driverStatus" placeholder="Enter something..." :readonly="true"></Input>
									</FormItem>
									<FormItem :label-width="labelWidth">
										<Button type="success" @click="approve">审核通过</Button>
										<Button type="error" style="margin-left: 8px" @click="unapprove">审核不通过</Button>
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
				// 显示属性
				driverName: null,
				labelWidth: 100,
				drivingLicenseLink: '',			// 驾驶证图片链接
				vehicleLicenseLink: '',			// 行驶证图片链接
				drivingLicenseGrid: 4,			// 驾驶证栅格控制
				vehicleLicenseGrid: 4,			// 行驶证栅格控制

				// 表单数据
				formItem: {
					driverName: '',				// 车主姓名
					driverIDNumber: '',			// 车主身份证号码
					initialLicenseDate: '',		// 初次领证日期
					drivingLicensePicture: '',	// 驾驶证图片
					carOwner: '',				// 车辆所有人
					carPlateNo: '',				// 车牌号码
					carRegisterDate: '',		// 车辆注册日期
					carBrandInfo: '',			// 车辆品牌信息
					carBrand: '',				// 车辆品牌
					carSeries: '',				// 车辆系列
					carColor: '',				// 车身颜色
					vehicleLicensePicture: '',	// 车辆驾驶证
					driverStatus: '',			// 车主当前认证状态
				}
			}
		},
		created () {
			let ls_driverId = window.localStorage.getItem('DriverVerifyInfo');
			console.log(ls_driverId);
			if ( ls_driverId == null) {
				this.$Message.error('操作有误，返回首页……');
				this.$router.push({name: 'Home'});
			} else {
				this.$axios.get('/api/driver/' + ls_driverId).then(
					(response) => {
						console.log('获取车主资料返回数据：', response);
						let data = response.data.data;
						this.driverName = data.drivingLicense.driverName;
						// 车主信息
						this.formItem.driverName = data.drivingLicense.driverName;
						this.formItem.driverIDNumber = data.drivingLicense.identification;
						// 驾驶证信息
						this.formItem.initialLicenseDate = data.drivingLicense.issueDate.slice(0, 10);
						this.formItem.drivingLicensePicture = '暂未获得';
						// 车辆信息
						this.formItem.carOwner = data.vehicleLicense.owner;
						this.formItem.carRegisterDate = data.vehicleLicense.registerDate.slice(0, 10);
						this.formItem.carPlateNo = data.car.plateNo;
						this.formItem.carBrand = data.car.brand;
						this.formItem.carSeries = data.car.series;
						this.formItem.carColor = data.car.color;
						this.formItem.carBrandInfo = data.car.brand + ' • ' + data.car.series + ' • ' + data.car.color;
						this.formItem.vehicleLicensePicture = '暂未获得';
						// 车主当前认证状态
						if (data.driverStatus == 'PENDING_REVIEW') {
							
							this.formItem.driverStatus = '待审核';
						} else if (data.driverStatus == 'UNAPPROVED') {
							this.formItem.driverStatus = '未通过认证';
						} else {
							this.formItem.driverStatus = '已通过认证'
						}
						
					}
				).catch((error) => {
						console.log('获取车主资料错误返回：', error);
						this.$Message.error('操作有误，返回首页……');
				});
			}
			this.drivingLicenseLink = this.$serverUrl + '/images/drivingLicense/' + ls_driverId + '.jpg';
			this.vehicleLicenseLink = this.$serverUrl + '/images/vehicleLicense/' + ls_driverId + '.jpg';
		},
		mounted () {

		},
		methods: {
			approve () {
				let driverId = window.localStorage.getItem('DriverVerifyInfo');
				this.$axios.post('/api/driver/reviewDriver', {
					driverId: driverId,
					driverStatus: 'APPROVED'
				}).then((response) => {
					console.log('通过审核返回：', response);
					if (response.status == 200) {
						this.$router.push({name: 'Home'})
					}
				}).catch((error) => {
					console.log(error);
				})
				console.log('审核通过');
			},
			unapprove () {
				console.log('审核不通过');
				let driverId = window.localStorage.getItem('DriverVerifyInfo');
				this.$axios.post('/api/driver/reviewDriver', {
					driverId: driverId,
					driverStatus: 'UNAPPROVED'
				}).then((response) => {
					console.log('不通过审核返回：', response)
					if (response.status == 200) {
						this.$router.push({name: 'Home'})
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			toggleDriverGrid() {
				switch (this.drivingLicenseGrid) {
					case 24:
						this.drivingLicenseGrid = 4;
						break;
					case 4:
						this.drivingLicenseGrid = 24;
						break;
					default:
						break;
				}
			},
			toggleVehicleGrid() {
				switch (this.vehicleLicenseGrid) {
					case 24:
						this.vehicleLicenseGrid = 4;
						break;
					case 4:
						this.vehicleLicenseGrid = 24;
						break;
					default:
						break;
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
			logout () {
				console.log('退出');
			}
		},
		destroyed () {
			// window.localStorage.removeItem('DriverVerifyInfo');
		}
	}
</script>

<style scoped>
	@import '../assets/css/home.css';
</style>