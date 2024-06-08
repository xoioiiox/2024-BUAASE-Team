/*
 * @Description:食物类
 */

import { randomIntegerInRange } from '../utils';
import { gameCol, gameRow } from './map';
import { Snake } from './Snake';

export class Food {
  // 食物的坐标
  x: number;
  y: number;
  status = -1;
  isRightAns: boolean;    // 是否是正确答案食物

  constructor(isRight: boolean) {
    this.x = randomIntegerInRange(0, gameCol - 1);
    this.y = randomIntegerInRange(0, gameRow - 1);
    this.isRightAns = isRight;
  }


  // 修改食物的位置
  change(snake: Snake) {
    // 生成一个随机的位置
    const newX = randomIntegerInRange(0, gameCol - 1);
    const newY = randomIntegerInRange(0, gameRow - 1);
    // 1.获取蛇头的坐标
    const x = snake.head.x;
    const y = snake.head.y;
    // 2.获取身体
    const bodies = snake.bodies;
    // 3.食物不可以和头部以及身体重合
    const isRepeatBody = bodies.some((body) => {
      return body.x === newX && body.y === newY;
    });
    const isRepeatHead = newX === x && newY === y;
    // 不满足条件重新随机
    if (isRepeatBody || isRepeatHead) {
      this.change(snake);
    } else {
      this.x = newX;
      this.y = newY;
      this.isRightAns = true;
    }
  }


  changeTwo(snake: Snake) {
    // 生成一个随机的位置
    const newX = randomIntegerInRange(0, gameCol - 1);
    const newY = randomIntegerInRange(0, gameRow - 1);
    // 1.获取蛇头的坐标
    const x = snake.head.x;
    const y = snake.head.y;
    // 2.获取身体
    const bodies = snake.bodies;
    // 3.食物不可以和头部以及身体重合
    const isRepeatBody = bodies.some((body) => {
      return body.x === newX && body.y === newY;
    });
    const isRepeatHead = newX === x && newY === y;
    // 不满足条件重新随机
    if (isRepeatBody || isRepeatHead) {
      this.changeTwo(snake);
    } else {
      this.x = newX;
      this.y = newY;
      this.isRightAns = false;
    }
  }
}
