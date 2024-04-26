<template>
    <div>
        <el-row>
            <el-col :span="6">
                <PersonalSide></PersonalSide>
            </el-col>
            <el-col :span="18">
                <div class="Info">
                    <div>
                        <el-row>
                            <el-col :span="4">
                                <el-avatar :size="100" :src="circleUrl"></el-avatar>
                            </el-col>
                        </el-row>
                        <div class="infoForm">
                            <el-descriptions title="个人信息" column="2">
                                <el-descriptions-item label="用户名">{{this.infoForm.username}}</el-descriptions-item>
                                <el-descriptions-item label="等级">
                                    <el-tag size="small">{{this.infoForm.level}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label="绑定手机号">{{this.infoForm.phone}}</el-descriptions-item>
                                <el-descriptions-item label="绑定微信">{{this.infoForm.wechat}}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <div>
                            <el-button @click="changePassword()">修改密码</el-button>
                            <el-button @click="modifyInfo()">修改信息</el-button>
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
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import {useUserStore} from "@/stores/userStore.js"
export default {
    components: {PersonalSide},
    async created() {
        this.username = useUserStore();
        console.log("username:" + this.username)
        await this.axios({
            method: 'get',
            url: '/api/word/get-info/'
        }).then((res)=>{
            console.log(res)
            this.infoForm.avatar = res.data.avatar;
            //this.infoForm.username = res.data.username;
            this.infoForm.phone = res.data.phone;
            this.infoForm.wechat = res.data.wechat;
        })
    },
    data() {
        return {
            username: "",
            passwordDialog: false,
            infoDialog: false,
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
        submitPassword() {

        },
        submitInfo() {
            console.log(this.infoForm)
            this.axios({
                method: 'post',
                url: '/api/word/change-info',
                data: {
                    username: this.infoForm.username,
                    avatar: this.infoForm.avatar,
                    phone: this.infoForm.phone,
                    wechat: this.infoForm.wechat
                }
            }).then((res)=> {
                if (res.data.status == 200) {
                    this.$message({
						type: 'success',
						message: "修改个人信息成功"
					});
                }
            })
        }
    }
}
</script>

<style scoped>
.Info {
    margin-top: 100px;
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
</style>