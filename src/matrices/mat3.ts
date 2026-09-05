import type {Vec2} from '../vectors/vec2';
import { matrixToArray, transposeLinear3, determinantLinear3, invertLinear3 } from './buffer';

/** 3×3 affine matrix stored in a Float32Array. */
export class Mat3 {

  private m: Float32Array;

  /** Identity if no arguments; otherwise the given nine entries. */
  constructor(  x1?:number, x2?:number, x3?:number,
                y1?:number, y2?:number, y3?:number,
                t1?:number, t2?:number, t3?:number
              ) {
    this.m = new Float32Array(9);
    if (arguments.length === 0)
      this.identity();
    else
      this.make(  x1, x2, x3,
                  y1, y2, y3,
                  t1, t2, t3
                );
  }

  /** Write nine entries, treating omitted values as 0. */
  private make( x1?:number, x2?:number, x3?:number,
                y1?:number, y2?:number, y3?:number,
                t1?:number, t2?:number, t3?:number
              ): void {
    this.m[0] = x1??0.0;
    this.m[1] = x2??0.0;
    this.m[2] = x3??0.0;
    this.m[3] = y1??0.0;
    this.m[4] = y2??0.0;
    this.m[5] = y3??0.0;
    this.m[6] = t1??0.0;
    this.m[7] = t2??0.0;
    this.m[8] = t3??0.0;
  }

  /** Copy another matrix into this one. */
  public copy(matrix3x3: Mat3 ): Mat3 {
    matrixToArray(matrix3x3.m, this.m);
    return this;
  }

  /** Live buffer, or a copy into target. */
  public toArray(target?: Float32Array): Float32Array {
    return matrixToArray(this.m, target);
  }

  /** Human-readable row string. */
  public toString(): string {
    return '(' +  this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ';' +
                  this.m[3] + ',' + this.m[4] + ',' + this.m[5] + ';' +
                  this.m[6] + ',' + this.m[7] + ',' + this.m[8] + ')';
  }

  /** Set this matrix to identity. */
  public identity(): Mat3 {
    this.make(  1.0,  0.0,  0.0,
                0.0,  1.0,  0.0,
                0.0,  0.0,  1.0
              );
    return this;
  }

  /** Compose a 2D scale onto this matrix. */
  public scale(vector2: Vec2): Mat3 {
    const m = this.m;
    const sx = vector2.x;
    const sy = vector2.y;
    m[0] *= sx; m[1] *= sx; m[2] *= sx;
    m[3] *= sy; m[4] *= sy; m[5] *= sy;
    return this;
  }

  /** Compose a 2D rotation (radians) onto this matrix. */
  public rotate(angle: number): Mat3 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x0 = m[0], x1 = m[1], x2 = m[2];
    const y0 = m[3], y1 = m[4], y2 = m[5];
    m[0] = c * x0 + s * y0;
    m[1] = c * x1 + s * y1;
    m[2] = c * x2 + s * y2;
    m[3] = -s * x0 + c * y0;
    m[4] = -s * x1 + c * y1;
    m[5] = -s * x2 + c * y2;
    return this;
  }

  /** Compose a 2D translation onto this matrix. */
  public translate(vector2: Vec2): Mat3 {
    const m = this.m;
    const tx = vector2.x;
    const ty = vector2.y;
    m[6] += m[0] * tx + m[3] * ty;
    m[7] += m[1] * tx + m[4] * ty;
    m[8] += m[2] * tx + m[5] * ty;
    return this;
  }

  /** Multiply by another 3×3 matrix. */
  public multiply(matrix3x3: Mat3): Mat3 {
    const a = this.m;
    const b = matrix3x3.m;
    const a0 = a[0], a1 = a[1], a2 = a[2];
    const a3 = a[3], a4 = a[4], a5 = a[5];
    const a6 = a[6], a7 = a[7], a8 = a[8];
    a[0] = a0*b[0] + a3*b[1] + a6*b[2];
    a[1] = a1*b[0] + a4*b[1] + a7*b[2];
    a[2] = a2*b[0] + a5*b[1] + a8*b[2];
    a[3] = a0*b[3] + a3*b[4] + a6*b[5];
    a[4] = a1*b[3] + a4*b[4] + a7*b[5];
    a[5] = a2*b[3] + a5*b[4] + a8*b[5];
    a[6] = a0*b[6] + a3*b[7] + a6*b[8];
    a[7] = a1*b[6] + a4*b[7] + a7*b[8];
    a[8] = a2*b[6] + a5*b[7] + a8*b[8];
    return this;
  }

  /** Transpose in place. */
  public transpose(): Mat3 {
    transposeLinear3(this.m, 3);
    return this;
  }

  /** Determinant. */
  public determinant(): number {
    return determinantLinear3(this.m, 3);
  }

  /** Invert in place; unchanged if singular. */
  public invert(): Mat3 {
    invertLinear3(this.m, 3);
    return this;
  }

};
