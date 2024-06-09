// globalState.ts
import { reactive } from 'vue';

// 创建响应式状态对象
export const state = reactive({
  myGlobalVariable: 'store'
});

// 提供一个方法来更新状态
export function updateGlobalVariable(newValue: string) {
  state.myGlobalVariable = newValue;
}