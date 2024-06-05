/*
 * @Description:地图
 */

import type { Map } from '../types/index';

const clientWidth = document.documentElement.clientWidth - 400;
//获取浏览器窗口的宽度，并从中减去400像素
const clientHeight = document.documentElement.clientHeight - 40;
//获取浏览器窗口的高度，并从中减去40像素

// 行数
export const gameRow = clientWidth > 700 ? Math.floor(clientHeight / 54) : Math.floor(clientHeight / 34);
//根据clientWidth的值来确定游戏地图的行数。如果clientWidth大于700像素，就将clientHeight除以54，否则除以34，
// 然后使用Math.floor()函数向下取整，得到行数。

// 列数
export const gameCol = clientWidth > 700 ? Math.floor(clientWidth / 54) : Math.floor(clientWidth / 34);

// 初始化地图  现在所有的位置type都是0
export function initMap(map: Map) {
  for (let i = 0; i < gameRow; i++) {
    const arr: Array<number> = [];
    for (let j = 0; j < gameCol; j++) {
      arr.push(0);
    }
    map.push(arr);
  }
  return map;
}
