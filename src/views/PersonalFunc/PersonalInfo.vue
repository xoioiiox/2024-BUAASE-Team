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
									<el-form-item label="用户名" prop="username">
									<el-input v-model="infoForm.username" autocomplete="off"></el-input>
									</el-form-item>
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
		await axios({
			method: 'get',
			url: '/api/word/get-info/'
		}).then((res)=>{
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
				username: "viola",
				level: "12",
				phone: "18000000000",
				wechat: "12345"
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
			console.log(this.infoForm)
			axios({
				method: 'put',
				url: '/api/word/change-info/',
				data: {
					username: this.infoForm.username,
					avatar: this.infoForm.avatar,
					phone: this.infoForm.phone,
					wechat: this.infoForm.wechat
				}
			}).then((res)=> {
			})
			this.$message({
				type: 'success',
				message: "修改个人信息成功"
			});
			this.infoDialog = false
		},
		submitPassword() {
			axios({
				method: 'post',
				url: '/api/word/reset-password/',
				data: {
					original_password: this.passwordForm.old_password,
					password: this.passwordForm.new_password,
					password_again: this.passwordForm.new_password_again
				}
			}).then((res)=> {
			})
      this.$message({
        type: 'success',
        message: "修改密码成功"
      });
		},
		uploadAvatar() {
			this.uploadDialog = true
		},
		handleAvatarPreview(file) {
			console.log(true);
			let fd = new FormData()
			fd.append('smfile', file.raw)
			this.image_formData = fd
			console.log(file.raw instanceof File)
			axios.post('https://smmsapi/api/v2/upload/', this.image_formData, { // todo 此url不需要固定前缀
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': "u6OmOCWVF8lXN6tN2rP8zaJWbWOWRatv",
					// 'Content-Type': 'application/json'
				}
			}).then(response => {
				console.log(response)
				if(response.data.data) {
					this.imageUrl = response.data.data.url
				} else {
					this.imageUrl = response.data.images
				}
				console.log(this.imageUrl)
			}).catch(err => {
				console.log(err)
			});
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			if (!isJPG) {
				this.$message.error('只可上传 JPG 格式图片');
			}
			return isJPG;
		},
		submitAvatar() {
			this.infoForm.avatar = this.imageUrl
			console.log("in" + this.infoForm.avatar)
			axios({
				method: 'put',
				url: '/api/word/change-info/',
				data: {
					username: this.infoForm.username,
					avatar: this.infoForm.avatar,
					phone: this.infoForm.phone,
					wechat: this.infoForm.wechat
				}
			}).then((res)=> {
			})
			this.$message({
				type: 'success',
				message: "修改头像成功"
			});
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