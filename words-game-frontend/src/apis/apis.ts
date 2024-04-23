import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
//登录表单
export interface LoginForm {
    username: string;
    password: string;
}
//注册表单
interface RegisterForm {
    username: string;//用户名
    role: string,//角色
    password: string;//密码
    confirmPassword: string;//确认密码
    phone:string
}
//用户信息
export interface UserInfo {
    userName:string;//用户名
    userPhone:string;//用户手机号
    userRole:string;//用户角色
    userPassword:string;//用户密码
}


export async function login(data: LoginForm) {
    const response = await axios.post('/api/word/login/', data);
    if (response.status === 200) {//状态码200，请求正确
        if (response.data.code === 0) {
            ElMessage({
                message: '登录成功',
                type: 'success'
            });
            const userinfo = {
                userId:response.data.id,
                userName:response.data.username,
                userRole:response.data.role,
            }
            router.push('/')
        } else if (response.data.code === -1) {
            ElMessage({
                message: '密码错误',
                type: 'warning'
            });
        } else {
            ElMessage({
                message: '用户名不存在',
                type: 'warning'
            });
        }
    } else {
        ElMessage({
            message: '请求失败',
            type: 'error'
        });
    }
}

export async function register(data: RegisterForm) {
    const response = await axios.post('/api/word/register/', data);
    if (response.status === 200) {//状态码200，请求正确
        if (response.data.code===200){
            ElMessage({
                message: '注册成功',
                type: 'success'
            });
            const userinfo = {
                userName:response.data.username,
                userPhone:response.data.phone,
                userRole:response.data.role,
                userPassword:response.data.password,
            }
            router.push('/')
        }else{
            ElMessage({
                message: '用户名已存在',
                type: 'error'
            });
        }
    }
}

