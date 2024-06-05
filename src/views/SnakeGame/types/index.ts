
import { Ref } from 'vue';

export type Map = Array<Array<number>>;

export interface SnakeHead {
  x: number;
  y: number;
  status: number;
}

export type SnakeBody = SnakeHead;

export type SnakeBodies = SnakeBody[];

export interface StateType {
  map: Map;
}

export type IsLive = Ref<number>;
