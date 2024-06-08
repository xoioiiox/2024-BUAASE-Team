/*
 * @Description:工具函数
 */

export * from './ticker';

// 时间累加器
export function intervalTimer(interval: number) {
  let t = 0;
  return (n: number) => {
    t += n;
    if (t >= interval) {
      t = 0;
      return true;
    }
    return false;
  };
}

// 生成随机数
export const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
