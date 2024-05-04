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
    phone:string;//手机号
    password: string;//密码
    confirmPassword: string;//确认密码
}
//用户信息
export interface UserInfo {
    userName:string;//用户名
    userPhone:string;//用户手机号
    userPassword:string;//用户密码
}


export async function login(data: LoginForm) {
    const response = await axios.post('/api/word/login/', data);
    //const response = {status: 200, data:{code:0, id:1, username:"123", role:"user"}}
    if (response.status === 200) {//状态码200，请求正确
        ElMessage({
            message: '登录成功',
            type: 'success'
        });
        const userinfo = {
            userName:response.data.username,
        }
        router.push('/') //跳转到首页
    } else {
        ElMessage({
            message: '登录失败',
            type: 'error'
        });
    }
}

export async function register(data: RegisterForm) {
    const response = await axios.post('http://60.205.14.77:8998/api/word/register/', data);
    if (response.status === 200) { //状态码200，请求正确
        ElMessage({
            message: '注册成功',
            type: 'success'
        });
        const userinfo = {
            userName:response.data.username,
            userPhone:response.data.phone,
            userPassword:response.data.password,
        }
        router.push('/') //跳转到首页
    }else{
        ElMessage({
            message: '注册失败',
            type: 'error'
        });
    }
}

