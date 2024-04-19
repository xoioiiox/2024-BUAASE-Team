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
                            <el-descriptions title="User Info">
                                <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
                                <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
                                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                                <el-descriptions-item label="Remarks">
                                    <el-tag size="small">School</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label="Address">
                                    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                                </el-descriptions-item>
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
                                    <el-form-item label="昵称" prop="nickname">
                                    <el-input v-model="infoForm.old_password" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号" prop="phonenum">
                                    <el-input v-model="infoForm.new_password" autocomplete="off"></el-input>
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
export default {
    components: {PersonalSide},
    data() {
        return {
            passwordDialog: false,
            infoDialog: false,
            passwordForm: {
                old_password: "",
                new_password: "",
                new_password_again: "",
            },
            infoForm: {
                nickname: "",
                phonenum: ""
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
    margin-left: 10px;
    margin-top: 20px;
}
.el-input {
    max-width: 200px;
}
</style>