
import {Vec3} from '../vectors/vec3';
import { matrixToArray, transposeLinear3, determinantLinear3, invertLinear3 } from './buffer';
import { setLookAtAxes } from './lookAt';

/** 4×3 affine transform stored in a 4×4 Float32Array. */
export class Mat4x3 {

  private m: Float32Array;
  private xAxis: Vec3 | undefined;
  private yAxis: Vec3 | undefined;
  private zAxis: Vec3 | undefined;

  /** Identity if no arguments; otherwise the given affine entries. */
  constructor(  x1?:number, x2?:number, x3?:number,
                y1?:number, y2?:number, y3?:number,
                z1?:number, z2?:number, z3?:number,
                t1?:number, t2?:number, t3?:number
              ) {
    this.m = new Float32Array(16);
    if (arguments.length === 0)
      this.identity();
    else
      this.make(  x1, x2, x3,
                  y1, y2, y3,
                  z1, z2, z3,
                  t1, t2, t3
                );
  }

  /** Write affine entries; last column is (0, 0, 0, 1). */
  private make( x1?:number, x2?:number, x3?:number,
                y1?:number, y2?:number, y3?:number,
                z1?:number, z2?:number, z3?:number,
                t1?:number, t2?:number, t3?:number
              ): void {
    this.m[ 0] = x1??0.0;
    this.m[ 1] = x2??0.0;
    this.m[ 2] = x3??0.0;
    this.m[ 3] = 0.0;
    this.m[ 4] = y1??0.0;
    this.m[ 5] = y2??0.0;
    this.m[ 6] = y3??0.0;
    this.m[ 7] = 0.0;
    this.m[ 8] = z1??0.0;
    this.m[ 9] = z2??0.0;
    this.m[10] = z3??0.0;
    this.m[11] = 0.0;
    this.m[12] = t1??0.0;
    this.m[13] = t2??0.0;
    this.m[14] = t3??0.0;
    this.m[15] = 1.0;
  }

  /** Copy another matrix into this one. */
  public copy(matrix4x3: Mat4x3 ): Mat4x3 {
    matrixToArray(matrix4x3.m, this.m);
    return this;
  }

  /** Live buffer, or a copy into target. */
  public toArray(target?: Float32Array): Float32Array {
    return matrixToArray(this.m, target);
  }

  /** Human-readable row string. */
  public toString(): string {
    return  '('
      + this.m[ 0] + ',' + this.m[ 1] + ',' + this.m[ 2] + ',' + this.m[ 3] + ';'
      + this.m[ 4] + ',' + this.m[ 5] + ',' + this.m[ 6] + ',' + this.m[ 7] + ';'
      + this.m[ 8] + ',' + this.m[ 9] + ',' + this.m[10] + ',' + this.m[11] + ';'
      + this.m[12] + ',' + this.m[13] + ',' + this.m[14] + ',' + this.m[15] + ')';
  }

  /** Set this matrix to identity. */
  public identity(): Mat4x3 {
    this.make(  1.0,  0.0,  0.0,
                0.0,  1.0,  0.0,
                0.0,  0.0,  1.0,
                0.0,  0.0,  0.0
              );
    return this;
  }

  /** Compose a 3D scale onto this matrix. */
  public scale(vector3: Vec3): Mat4x3 {
    const m = this.m;
    const sx = vector3.x;
    const sy = vector3.y;
    const sz = vector3.z;
    m[0] *= sx; m[1] *= sx; m[ 2] *= sx;
    m[4] *= sy; m[5] *= sy; m[ 6] *= sy;
    m[8] *= sz; m[9] *= sz; m[10] *= sz;
    return this;
  }

  /** Compose a rotation about X (radians). */
  public rotateX(angle: number): Mat4x3 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const y0 = m[4], y1 = m[5], y2 = m[6];
    const z0 = m[8], z1 = m[9], z2 = m[10];
    m[ 4] =  c * y0 + s * z0;
    m[ 5] =  c * y1 + s * z1;
    m[ 6] =  c * y2 + s * z2;
    m[ 8] = -s * y0 + c * z0;
    m[ 9] = -s * y1 + c * z1;
    m[10] = -s * y2 + c * z2;
    return this;
  }

  /** Compose a rotation about Y (radians). */
  public rotateY(angle: number): Mat4x3 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x0 = m[0], x1 = m[1], x2 = m[2];
    const z0 = m[8], z1 = m[9], z2 = m[10];
    m[ 0] =  c * x0 - s * z0;
    m[ 1] =  c * x1 - s * z1;
    m[ 2] =  c * x2 - s * z2;
    m[ 8] =  s * x0 + c * z0;
    m[ 9] =  s * x1 + c * z1;
    m[10] =  s * x2 + c * z2;
    return this;
  }

  /** Compose a rotation about Z (radians). */
  public rotateZ(angle: number): Mat4x3 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x0 = m[0], x1 = m[1], x2 = m[2];
    const y0 = m[4], y1 = m[5], y2 = m[6];
    m[0] =  c * x0 + s * y0;
    m[1] =  c * x1 + s * y1;
    m[2] =  c * x2 + s * y2;
    m[4] = -s * x0 + c * y0;
    m[5] = -s * x1 + c * y1;
    m[6] = -s * x2 + c * y2;
    return this;
  }

  /** Compose a 3D translation onto this matrix. */
  public translate(vector3: Vec3): Mat4x3 {
    const m = this.m;
    const tx = vector3.x;
    const ty = vector3.y;
    const tz = vector3.z;
    m[12] += m[0] * tx + m[4] * ty + m[ 8] * tz;
    m[13] += m[1] * tx + m[5] * ty + m[ 9] * tz;
    m[14] += m[2] * tx + m[6] * ty + m[10] * tz;
    return this;
  }

  /** Multiply by another affine 4×3 matrix. */
  public multiply(matrix4x3: Mat4x3): Mat4x3 {
    const a = this.m;
    const b = matrix4x3.m;
    const a0 = a[0], a1 = a[1], a2 = a[2];
    const a4 = a[4], a5 = a[5], a6 = a[6];
    const a8 = a[8], a9 = a[9], a10 = a[10];
    const a12 = a[12], a13 = a[13], a14 = a[14];
    a[ 0] = a0*b[ 0] + a4*b[ 1] + a8*b[ 2];
    a[ 1] = a1*b[ 0] + a5*b[ 1] + a9*b[ 2];
    a[ 2] = a2*b[ 0] + a6*b[ 1] + a10*b[ 2];
    a[ 4] = a0*b[ 4] + a4*b[ 5] + a8*b[ 6];
    a[ 5] = a1*b[ 4] + a5*b[ 5] + a9*b[ 6];
    a[ 6] = a2*b[ 4] + a6*b[ 5] + a10*b[ 6];
    a[ 8] = a0*b[ 8] + a4*b[ 9] + a8*b[10];
    a[ 9] = a1*b[ 8] + a5*b[ 9] + a9*b[10];
    a[10] = a2*b[ 8] + a6*b[ 9] + a10*b[10];
    a[12] = a0*b[12] + a4*b[13] + a8*b[14] + a12;
    a[13] = a1*b[12] + a5*b[13] + a9*b[14] + a13;
    a[14] = a2*b[12] + a6*b[13] + a10*b[14] + a14;
    return this;
  }

  /** Right-handed look-at view matrix; identity if eye equals target. */
  public lookAtRH(eye: Vec3, target: Vec3, up: Vec3): Mat4x3 {
    const zAxis = this.zAxis ??= new Vec3();
    const xAxis = this.xAxis ??= new Vec3();
    const yAxis = this.yAxis ??= new Vec3();
    if (!setLookAtAxes(eye, target, up, xAxis, yAxis, zAxis))
      return this.identity();

    this.make( xAxis.x, yAxis.x, zAxis.x,
               xAxis.y, yAxis.y, zAxis.y,
               xAxis.z, yAxis.z, zAxis.z,
              -xAxis.dotProduct(eye), -yAxis.dotProduct(eye), -zAxis.dotProduct(eye)
              );
    return this;
  }

  /** Transpose the linear 3×3 part. */
  public transposeLinear(): Mat4x3 {
    transposeLinear3(this.m, 4);
    return this;
  }

  /** Determinant of the linear 3×3 part. */
  public determinantLinear(): number {
    return determinantLinear3(this.m, 4);
  }

  /** Invert as an affine transform; unchanged if the linear part is singular. */
  public invertAffine(): Mat4x3 {
    const m = this.m;
    const tx = m[12], ty = m[13], tz = m[14];
    if (!invertLinear3(m, 4))
      return this;
    m[12] = -(m[0] * tx + m[4] * ty + m[8] * tz);
    m[13] = -(m[1] * tx + m[5] * ty + m[9] * tz);
    m[14] = -(m[2] * tx + m[6] * ty + m[10] * tz);
    return this;
  }

};
