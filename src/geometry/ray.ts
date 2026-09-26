import { Vec2 } from '../vectors/vec2';

/** 2D ray intersection hit result. */
export interface RayHit2D {
  fraction: number;
  point: Vec2;
  normal: Vec2;
}
