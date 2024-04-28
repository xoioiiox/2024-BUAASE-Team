// userStore.js

import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {},
        isLoggedIn: true,
    }),
    actions: {
        login(userInfo) {
            // 假设这里是登录逻辑，验证用户信息等
            this.user = userInfo;
            this.isLoggedIn = true;
        },
        logout() {
            // 退出登录，清除用户信息
            this.user = null;
            this.isLoggedIn = false;
        },
        register(userInfo) {
            // 假设这里是注册逻辑，保存用户信息等
            // 注册成功后直接登录
            this.login(userInfo);
        },
    },
});
