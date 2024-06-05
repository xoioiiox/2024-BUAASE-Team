<template>
	<div class="bg">
		<img
			class="shrink-0 image_2 pos_74"
			src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=ab4179d6056f986189aeff77097e5805.png"
		/>
		<img
			class="shrink-0 image_2 pos_68"
			src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=ab4179d6056f986189aeff77097e5805.png"
		/>
	<div>
		<div class="back-home" @click="goBackHome()">
			<span class="font_13">乐词不疲</span>
		</div>
		<el-row :gutter="20">
			<div class="header">
				<div class="text-wrapper_10">
					<span class="font_16 text_22">个人信息</span>
				</div>
			</div>
			<div class="Personalside">
				<div class="text-wrapper_14 pos_79" @click="toChooseBook">
					<span class="font_18 text_40">选择词书</span>
				</div>
				<div class="text-wrapper_14 pos_80" @click="toStatistics">
					<span class="font_18 text_40">统计信息</span>
				</div>
				<div class="text-wrapper_14 pos_81" @click="toAchieve">
					<span class="font_18 text_40">成就展示</span>
				</div>
				<div class="text-wrapper_14 pos_82" @click="toRank">
					<span class="font_18 text_40">排行榜</span>
				</div>
				<div class="section_1 pos_83" @click="toEditInfo">
					<img
						class="image_1"
						src="https://ide.code.fun/api/image?token=665d8464a16e9e001251394b&name=c3ecd12054e7bd3b61b232611bff59d9.png"
					/>
					<span class="font_19 text_2 ml-11">个人信息</span>
				</div>
			</div>
				<div class="card-container">
					<div class="inner-card-container">
						<div class="section_10"></div>
							<!--el-avatar :size="100" :src="this.infoForm.avatar"></el-avatar-->
							<el-button type="text" @click="uploadAvatar()" style="margin-top: 200px;">
								<el-icon style="color:#888888"><Upload /></el-icon>
								<span class="upload-text">upload</span>
							</el-button>
							<div class="mt-16 section_12">
								<span class="text-name">{{this.infoForm.username}}</span>
							</div>
						<div class="right-area">
							<div class="section_11"><span class="text-name">LV.{{this.infoForm.level}}</span></div>
							<div class="section_11"><span class="text-name">手机号 {{this.infoForm.phone}}</span></div>
							<div class="section_11"><span class="text-name">微信号 {{this.infoForm.wechat}}</span></div>
							<div style="display:flex; margin-left: 100px;">
								<div class="section_14" @click="changePassword"><span class="text-name">修改密码</span></div>
								<div class="section_14" @click="modifyInfo"><span class="text-name">修改信息</span></div>	
							</div>
						</div>
					</div>
				</div>
				<!--以下是对话框信息-->
				<div>
					<div>
						<el-dialog title="修改密码" v-model="passwordDialog" width="30%">
							<el-form :model="passwordForm" label-width="auto" :rules="rules">
								<el-form-item label="原密码" prop="old_password">
								<el-input v-model="passwordForm.old_password" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="新密码" prop="new_password">
								<el-input v-model="passwordForm.new_password" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="确认密码" prop="new_password_again">
								<el-input v-model="passwordForm.new_password_again" autocomplete="off"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="passwordDialog = false">取 消</el-button>
								<el-button type="primary" @click="submitPassword()">确 定</el-button>
							</div>
						</el-dialog>
					</div>
					<div>
						<el-dialog title="修改信息" v-model="infoDialog" width="30%">
							<el-form :model="infoForm" label-width="auto" :rules="rules">
								<!--el-form-item label="用户名" prop="username">
								<el-input v-model="infoForm.username" autocomplete="off"></el-input>
								</el-form-item-->
								<el-form-item label="绑定手机号" prop="phone">
								<el-input v-model="infoForm.phone" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="绑定微信" prop="wechat">
								<el-input v-model="infoForm.wechat" autocomplete="off"></el-input>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="infoDialog = false">取 消</el-button>
								<el-button type="primary" @click="submitInfo()">确 定</el-button>
							</div>
						</el-dialog>
					</div>
					<div class="avatarDialog">
						<el-dialog title="上传头像" v-model="uploadDialog" width="30%">
							<el-upload
								class="avatar-uploader"
								action="#"
								:http-request="upload"
								:show-file-list="false"
								:on-change="handleAvatarPreview"
								:before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							</el-upload>
							<div style="margin-top:20px">
								<el-button type="primary" @click="submitAvatar()">确认</el-button>
								<el-button @click="uploadDialog=false">取消</el-button>
							</div>
						</el-dialog>
					</div>
				</div>
		</el-row>
	</div>
	</div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import axios from "axios"
import yaml from 'js-yaml'

export default {
	async created() {
		await axios.get('/api/word/get-info/').then((res)=>{
			this.infoForm.avatar = res.data.avatar;
			this.infoForm.username = res.data.username;
			this.infoForm.phone = res.data.phone;
			this.infoForm.wechat = res.data.wechat;
		})
	},
	data() {
		return {
			infoForm: {
				avatar: "",
				username: "xoioiiox",
				phone: "18000000000",
				wechat: "2133324324",
				level: "1",
			},
			passwordDialog: false,
			infoDialog: false,
			uploadDialog: false,
			imageUrl: '',
			image_formData: new FormData(),
			passwordForm: {
				old_password: "",
				new_password: "",
				new_password_again: "",
			},
			rules: {
				old_password: [
					{ required: true, message: "请输入原密码", trigger: "blur" },
				],
				new_password: [
					{ required: true, message: "请输入新密码", trigger: "blur" },
				],
				new_password_again: [
					{ required: true, message: "请再次输入新密码", trigger: "blur" },
				],
			},
		}
	},
	methods: {
		changePassword() {
			this.passwordDialog = true
		},
		modifyInfo() {
			console.log(1)
			this.infoDialog = true
		},
		submitInfo() {
			console.log('info-form: ', this.infoForm)
			axios.put('/api/word/change-info/', {
					//username: this.infoForm.username,
					avatar: this.infoForm.avatar,
					phone: this.infoForm.phone,
					wechat: this.infoForm.wechat
			}).then((res)=> {
				console.log('submit-info: ', res)
				if (res.status == 200) {
					this.$message({
						type: 'success',
						message: "修改个人信息成功"
					});
				}
			})
			this.infoDialog = false
		},
		submitPassword() {
			console.log(this.passwordForm)
			axios.post('/api/word/reset-password/', {
					original_password: this.passwordForm.old_password,
					password: this.passwordForm.new_password,
					password_again: this.passwordForm.new_password_again
			}).then((res)=> {
				console.log('submit-res: ', res)
				if (res.status == 200) {
					this.$message({
						type: 'success',
						message: "修改密码成功"
					});
				}
			}).catch((error) => {
				console.log(error);
				if (error.code == 400) {
					this.$message({
						type: 'error',
						message: '新密码输入不一致'
					});
				}
				else {
					this.$message({
						type: 'error',
						message: '原密码错误'
					});
				}
			});
		},
		uploadAvatar() {
			this.uploadDialog = true
		},
		handleAvatarPreview(file) {

			let fd = new FormData()
			fd.append('smfile', file.raw)
			this.image_formData = fd

			axios.post('/api/word/uploadAvatar/', this.image_formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
					/*'Authorization': "u6OmOCWVF8lXN6tN2rP8zaJWbWOWRatv",*/
					// 'Content-Type': 'application/json'
				}
			}).then(response => {
			}).catch(err => {
				console.log(err)
			});

      axios.get('/api/word/get-info/')
          .then((res)=>{
            console.log(res)
            this.imageUrl = res.data.avatar
          })

		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt5M = file.size / 1024 / 1024 < 5;

			if (!isJPG) {
				this.$message.error('只可上传 JPG 格式图片');
			}

			if (!isLt5M) {
      			this.$message.error('图片大小不能超过 5MB!');
    		}
			return isJPG && isLt5M;
		},
		submitAvatar() {
			this.infoForm.avatar = this.imageUrl
			console.log("in" + this.infoForm.avatar)
			axios.put('/api/word/change-info/', {
					avatar: this.infoForm.avatar,
					phone: this.infoForm.phone,
					wechat: this.infoForm.wechat
			}).then((res)=> {
				console.log('avatar: ', res)
				if (res.status == 200) {
					this.$message({
						type: 'success',
						message: "修改头像成功"
					});
				}
			})
			this.$refs.side.changeAvatar(this.imageUrl);
			this.imageUrl = '';
			this.uploadDialog = false
		},
		goBackHome() {
			this.$router.push('/')
		},
		toChooseBook() {
			this.$router.push({ path: "/PersonalBook/" });
		},
		toEditInfo() {
			this.$router.push({ path: "/PersonalInfo/" });
		},
		toAchieve() {
			this.$router.push({ path: "/PersonalAchieve/" });
		},
		toSavedWords() {
			this.$router.push({ path: "/SavedWords" });
		},
		toRank() {
			this.$router.push({ path: "/PersonalRank" });
		},
		toStatistics() {
			this.$router.push({ path: "/Statistics" });
		},
	}
}
</script>

<style scoped>
.bg {
	height: 100vh;
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(180deg, #2c0b6c 30.1%, #974fc7 100%);
}
.image_2 {
	width: 876px;
	height: 546px;
}
.pos_74 {
	position: absolute;
	left: 90px;
	top: 100px;
}
.pos_68 {
	position: absolute;
	right: 90px;
	top: 100px;
}
.setting {
	margin-left: 800px;
}
/*home*/
.back-home {
	position: absolute;
	margin-top: 20px;
	margin-left: 50px;
	cursor: pointer;
	z-index: 99; /*绝对定位下，需要设置高优先级*/
}
.font_13 {
	font-size: 38px;
	font-family: Poppins;
	line-height: 44.5px;
	color: #ffffff;
	text-shadow: 0px 4px 10px #fbdd6f;
}
/*header*/
.header {
	display: flex;
	justify-content: center;
	width: 100%;
}
.text-wrapper_10 {
	position: absolute;
	display: flex;
	justify-content: center;
	margin-top: 40px;
	margin-left: 100px;
	padding: 16px 0;
	background-image: linear-gradient(180deg, #fbdd6f 0%, #ffd217 100%);
	border-radius: 12px;
	width: 280px;
}
.font_16 {
	font-size: 40px;
	font-family: Poppins;
	line-height: 46px;
	font-weight: 800;
	color: #2c0b6c;
}
.text_22 {
	line-height: 45.5px;
}
/*高亮标签*/
.section_1 {
	padding: 20px 0;
	background-color: #fffefe;
	border-radius: 10px 0px 0px 10px;
	box-shadow: 0px 4px 4px #ffd217;
	width: 200px;
	border: solid 2px #fbdd6f;
	position: absolute;
	cursor: pointer;
	z-index: 99;
}
.image_1 {
	margin-left: 20px;
	width: 30px;
	height: 30px;
}
.text_2 {
	line-height: 34px;
	font-size: 30px;
	font-family: Poppins;
	line-height: 34px;
	font-weight: 800;
	color: #ffd033;
	margin-left: 10px;
}
/*灰色标签*/
.text-wrapper_14 {
	padding: 20px 0;
	background-color: #f5f0f8;
	border-radius: 10px 0px 0px 10px;
	width: 150px;
	cursor: pointer;
	z-index: 99;
}
.pos_79 {
	position: absolute;
	left: 150px;
	top: 180px;
}
.pos_80 {
	position: absolute;
	left: 150px;
	top: 270px;
}
.pos_81 {
	position: absolute;
	left: 150px;
	top: 360px;
}
.pos_82 {
	position: absolute;
	left: 150px;
	top: 450px;
}
.pos_83 {
	position: absolute;
	left: 100px;
	top: 535px;
}
.font_18 {
	font-size: 26px;
	font-family: Poppins;
	line-height: 30.5px;
	font-weight: 800;
	color: #888888;
	line-height: 30.5px;
	margin-left: 30px;
}
/*选择容器*/
.card-container {
	margin-top: 80px;
	margin-left: 300px;
	margin-right: 120px;
	padding: 28px 0;
	background-color: #fce6c6;
	border-radius: 80px;
	width: 1000px;
	height: 560px;
}
.inner-card-container {
	padding: 60px 50px;
	background-color: #fff9ed;
	border-radius: 80px;
	width: 820px;
	height: 440px;
	margin: 0 40px;
	display: flex; /*解决块级元素不能一行显示*/
}
/*头像*/
.section_10 {
	background-color: #9d9bf4;
	border-radius: 50%;
	height: 160px;
	width: 160px;
	border: solid 10px #d8a8aa;
	margin-top: 50px;
}
.upload-text {
	font-size: 22px;
	font-family: Poppins;
	font-weight: 600;
	color: #888888;
}
/*信息*/
.section_12 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 250px -270px;
	background-color: #ffe9d4;
	border-radius: 20px;
	height: 35px;
	width: 160px;
	border: solid 4px #d8a8aa;
}
.text-name {
	font-size: 22px;
	font-family: Poppins;
	font-weight: 600;
	color:#2c0b6c
}
.section_11 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	background-color: #ffe9d4;
	border-radius: 24px;
	height: 60px;
	width: 350px;
	border: solid 4px #d8a8aa;
}
.right-area {
	width: 400px;
	margin-left: 500px;
	margin-top: 50px;
}
.section_14 {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	margin-left: 10px;
	background-color: #ffd4ad;
	border-radius: 12px;
	width: 120px;
	height: 40px;
	border: solid 1px #d8a8aa;
	cursor: pointer;
}
/*原样式*/
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.avatarDialog {
	text-align: center
}
</style>