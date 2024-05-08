<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6">
				<PersonalSide ref="side"></PersonalSide>
			</el-col>
			<el-col :span="18">
				<h2>个人信息</h2>
				<div class="Info">
					<div>
						<el-row>
							<el-col :span="3">
								<el-avatar :size="100" :src="this.infoForm.avatar"></el-avatar>
							</el-col>
							<el-col :span="4" class="upload_avatar">
								<!--el-tooltip
									class="box-item"
									effect="dark"
									content="上传头像"
									placement="top">
								</el-tooltip-->
								<el-button type="text" @click="uploadAvatar()">
									<el-icon><Upload /></el-icon>上传头像
								</el-button>
							</el-col>
						</el-row>
						<div class="infoForm">
							<el-descriptions column="2" size="large">
								<el-descriptions-item label="用户名">{{this.infoForm.username}}</el-descriptions-item>
								<el-descriptions-item label="等级">
									<el-tag size="small">{{this.infoForm.level}}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="绑定手机号">{{this.infoForm.phone}}</el-descriptions-item>
								<el-descriptions-item label="绑定微信">{{this.infoForm.wechat}}</el-descriptions-item>
							</el-descriptions>
						</div>
						<div class="modify">
							<el-button size="large" @click="changePassword()">修改密码</el-button>
							<el-button size="large" @click="modifyInfo()">修改信息</el-button>
						</div>
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
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import {useUserStore} from "@/stores/userStore.js"
import axios from "axios"
export default {
	components: {PersonalSide},
	async created() {
		await axios.get('/api/word/get-info/')
		.then((res)=>{
			console.log(res)
			this.infoForm.avatar = res.data.avatar;
			this.infoForm.username = res.data.username;
			this.infoForm.phone = res.data.phone;
			this.infoForm.wechat = res.data.wechat;
		})
	},
	data() {
		return {
			passwordDialog: false,
			infoDialog: false,
			uploadDialog: false,
			imageUrl: '',
			image_formData: new FormData(),
			infoForm: {
				avatar: "",
				username: "",
				level: "1",
				phone: "",
				wechat: ""
			},
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
			this.infoDialog = true
		},
		submitInfo() {
			console.log('info-form: ' + this.infoForm)
			axios.put('/api/word/change-info/', {
					//username: this.infoForm.username,
					avatar: this.infoForm.avatar,
					phone: this.infoForm.phone,
					wechat: this.infoForm.wechat
			}).then((res)=> {
				console.log('submit-info: ' + res)
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
				console.log('submit-res: ' + res)
				if (res.status == 200) {
					this.$message({
						type: 'success',
						message: "修改密码成功"
					});
				}
				else {
					if (res.errors[0].code == 400) {
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
				}
			})
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
				console.log('avatar: ' + res)
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
		}
	}
}
</script>

<style scoped>
.Info {
	margin-top: 80px;
	margin-left: 30px;
}
.el-card {
	width: 180px;
	height: 220px;
}
.infoForm {
	width: 600px;
	margin-left: 10px;
	margin-top: 20px;
}
.el-input {
	max-width: 200px;
}
.modify {
	margin-top: 30px;
}
.upload_avatar {
	margin-top: 80px;
}
/deep/.el-descriptions__label {
	font-size: medium;
	font-weight: normal;
}
/*/deep/.el-descriptions__content {
	font-size: medium;
}*/
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