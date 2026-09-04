
import {Trigonometry} from '../trigonometry';
import {Vector3} from '../vectors/vector3';
import { matrixToArray, transpose4, determinant4, invert4 } from './buffer';
import { setLookAtAxes } from './lookAt';

/** 4×4 matrix stored as a Float32Array. */
export class Matrix4x4 {

  private m: Float32Array;
  private xAxis: Vector3 | undefined;
  private yAxis: Vector3 | undefined;
  private zAxis: Vector3 | undefined;

  /** Identity if no arguments; otherwise the given sixteen entries. */
  constructor(  x1?:number, x2?:number, x3?:number, x4?:number,
                y1?:number, y2?:number, y3?:number, y4?:number,
                z1?:number, z2?:number, z3?:number, z4?:number,
                t1?:number, t2?:number, t3?:number, t4?:number
              ) {
    this.m = new Float32Array(16);
    if (arguments.length === 0)
      this.identity();
    else
      this.make(  x1, x2, x3, x4,
                  y1, y2, y3, y4,
                  z1, z2, z3, z4,
                  t1, t2, t3, t4
                );
  }

  /** Write sixteen entries, treating omitted values as 0. */
  private make( x1?:number, x2?:number, x3?:number, x4?:number,
                y1?:number, y2?:number, y3?:number, y4?:number,
                z1?:number, z2?:number, z3?:number, z4?:number,
                t1?:number, t2?:number, t3?:number, t4?:number
              ): void {
    this.m[ 0] = x1??0.0;
    this.m[ 1] = x2??0.0;
    this.m[ 2] = x3??0.0;
    this.m[ 3] = x4??0.0;
    this.m[ 4] = y1??0.0;
    this.m[ 5] = y2??0.0;
    this.m[ 6] = y3??0.0;
    this.m[ 7] = y4??0.0;
    this.m[ 8] = z1??0.0;
    this.m[ 9] = z2??0.0;
    this.m[10] = z3??0.0;
    this.m[11] = z4??0.0;
    this.m[12] = t1??0.0;
    this.m[13] = t2??0.0;
    this.m[14] = t3??0.0;
    this.m[15] = t4??0.0;
  }

  /** Copy another matrix into this one. */
  public copy(matrix4x4: Matrix4x4 ): Matrix4x4 {
    matrixToArray(matrix4x4.m, this.m);
    return this;
  }

  /** Live buffer, or a copy into target. */
  public toArray(target?: Float32Array): Float32Array {
    return matrixToArray(this.m, target);
  }

  /** Human-readable row string. */
  public toString(): string {
    return '('
      + this.m[ 0] + ',' + this.m[ 1] + ',' + this.m[ 2] + ',' + this.m[ 3] + ';'
      + this.m[ 4] + ',' + this.m[ 5] + ',' + this.m[ 6] + ',' + this.m[ 7] + ';'
      + this.m[ 8] + ',' + this.m[ 9] + ',' + this.m[10] + ',' + this.m[11] + ';'
      + this.m[12] + ',' + this.m[13] + ',' + this.m[14] + ',' + this.m[15] + ')';
  }

  /** Set this matrix to identity. */
  public identity(): Matrix4x4 {
    this.make(  1.0,  0.0,  0.0,  0.0,
                0.0,  1.0,  0.0,  0.0,
                0.0,  0.0,  1.0,  0.0,
                0.0,  0.0,  0.0,  1.0
              );
    return this;
  }

  /** Compose a 3D scale onto this matrix. */
  public scale(vector3: Vector3): Matrix4x4 {
    const m = this.m;
    const sx = vector3.x;
    const sy = vector3.y;
    const sz = vector3.z;
    m[0] *= sx; m[1] *= sx; m[ 2] *= sx; m[ 3] *= sx;
    m[4] *= sy; m[5] *= sy; m[ 6] *= sy; m[ 7] *= sy;
    m[8] *= sz; m[9] *= sz; m[10] *= sz; m[11] *= sz;
    return this;
  }

  /** Compose a rotation about X (radians). */
  public rotateX(angle: number): Matrix4x4 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const y0 = m[4], y1 = m[5], y2 = m[6], y3 = m[7];
    const z0 = m[8], z1 = m[9], z2 = m[10], z3 = m[11];
    m[ 4] =  c * y0 + s * z0;
    m[ 5] =  c * y1 + s * z1;
    m[ 6] =  c * y2 + s * z2;
    m[ 7] =  c * y3 + s * z3;
    m[ 8] = -s * y0 + c * z0;
    m[ 9] = -s * y1 + c * z1;
    m[10] = -s * y2 + c * z2;
    m[11] = -s * y3 + c * z3;
    return this;
  }

  /** Compose a rotation about Y (radians). */
  public rotateY(angle: number): Matrix4x4 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x0 = m[0], x1 = m[1], x2 = m[2], x3 = m[3];
    const z0 = m[8], z1 = m[9], z2 = m[10], z3 = m[11];
    m[ 0] =  c * x0 - s * z0;
    m[ 1] =  c * x1 - s * z1;
    m[ 2] =  c * x2 - s * z2;
    m[ 3] =  c * x3 - s * z3;
    m[ 8] =  s * x0 + c * z0;
    m[ 9] =  s * x1 + c * z1;
    m[10] =  s * x2 + c * z2;
    m[11] =  s * x3 + c * z3;
    return this;
  }

  /** Compose a rotation about Z (radians). */
  public rotateZ(angle: number): Matrix4x4 {
    const m = this.m;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x0 = m[0], x1 = m[1], x2 = m[2], x3 = m[3];
    const y0 = m[4], y1 = m[5], y2 = m[6], y3 = m[7];
    m[0] =  c * x0 + s * y0;
    m[1] =  c * x1 + s * y1;
    m[2] =  c * x2 + s * y2;
    m[3] =  c * x3 + s * y3;
    m[4] = -s * x0 + c * y0;
    m[5] = -s * x1 + c * y1;
    m[6] = -s * x2 + c * y2;
    m[7] = -s * x3 + c * y3;
    return this;
  }

  /** Compose a 3D translation onto this matrix. */
  public translate(vector3: Vector3): Matrix4x4 {
    const m = this.m;
    const tx = vector3.x;
    const ty = vector3.y;
    const tz = vector3.z;
    m[12] += m[0] * tx + m[4] * ty + m[ 8] * tz;
    m[13] += m[1] * tx + m[5] * ty + m[ 9] * tz;
    m[14] += m[2] * tx + m[6] * ty + m[10] * tz;
    m[15] += m[3] * tx + m[7] * ty + m[11] * tz;
    return this;
  }

  /** Multiply by another 4×4 matrix. */
  public multiply(matrix4x4: Matrix4x4): Matrix4x4 {
    const a = this.m;
    const b = matrix4x4.m;
    const a00 = a[ 0], a01 = a[ 1], a02 = a[ 2], a03 = a[ 3];
    const a10 = a[ 4], a11 = a[ 5], a12 = a[ 6], a13 = a[ 7];
    const a20 = a[ 8], a21 = a[ 9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = b[ 0], b01 = b[ 1], b02 = b[ 2], b03 = b[ 3];
    const b10 = b[ 4], b11 = b[ 5], b12 = b[ 6], b13 = b[ 7];
    const b20 = b[ 8], b21 = b[ 9], b22 = b[10], b23 = b[11];
    const b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
    a[ 0] = a00*b00 + a10*b01 + a20*b02 + a30*b03;
    a[ 1] = a01*b00 + a11*b01 + a21*b02 + a31*b03;
    a[ 2] = a02*b00 + a12*b01 + a22*b02 + a32*b03;
    a[ 3] = a03*b00 + a13*b01 + a23*b02 + a33*b03;
    a[ 4] = a00*b10 + a10*b11 + a20*b12 + a30*b13;
    a[ 5] = a01*b10 + a11*b11 + a21*b12 + a31*b13;
    a[ 6] = a02*b10 + a12*b11 + a22*b12 + a32*b13;
    a[ 7] = a03*b10 + a13*b11 + a23*b12 + a33*b13;
    a[ 8] = a00*b20 + a10*b21 + a20*b22 + a30*b23;
    a[ 9] = a01*b20 + a11*b21 + a21*b22 + a31*b23;
    a[10] = a02*b20 + a12*b21 + a22*b22 + a32*b23;
    a[11] = a03*b20 + a13*b21 + a23*b22 + a33*b23;
    a[12] = a00*b30 + a10*b31 + a20*b32 + a30*b33;
    a[13] = a01*b30 + a11*b31 + a21*b32 + a31*b33;
    a[14] = a02*b30 + a12*b31 + a22*b32 + a32*b33;
    a[15] = a03*b30 + a13*b31 + a23*b32 + a33*b33;
    return this;
  }

  /** Perspective projection; fovy is in degrees. */
  public perspective(fovy:number, aspect:number, znear:number, zfar:number): Matrix4x4 {
    let f = Math.tan(Trigonometry.halfpi - 0.5 * fovy * Trigonometry.pi / 180);
    let rangeInv = 1.0 / (znear - zfar);

    this.make( f/aspect, 0.0, 0.0, 0.0,
               0.0, f, 0.0,  0.0,
               0.0, 0.0, (znear+zfar)*rangeInv,-1.0,
               0.0, 0.0, znear*zfar*rangeInv*2, 0.0
            );
    return this;

  }

  /** Orthographic projection. */
  public orthographic(left:number, right:number, top:number, bottom:number, near:number, far:number ): Matrix4x4 {

    const w = right - left;
    const h = top - bottom;
    const p = far - near;

    const x = ( right + left ) / w;
    const y = ( top + bottom ) / h;
    const z = ( far + near ) / p;

    this.make(  2/w, 0.0, 0.0,  0.0,
                0.0, 2/h, 0.0,  0.0,
                0.0, 0.0, -2/p, 0.0,
                -x,  -y,  -z,   1.0
             );

    return this;

  }

  /** Transpose in place. */
  public transpose(): Matrix4x4 {
    transpose4(this.m);
    return this;
  }

  /** Determinant. */
  public determinant(): number {
    return determinant4(this.m);
  }

  /** Invert in place; unchanged if singular. */
  public invert(): Matrix4x4 {
    invert4(this.m);
    return this;
  }

  /** Right-handed look-at view matrix; identity if eye equals target. */
  public lookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix4x4 {
    const zAxis = this.zAxis ??= new Vector3();
    const xAxis = this.xAxis ??= new Vector3();
    const yAxis = this.yAxis ??= new Vector3();
    if (!setLookAtAxes(eye, target, up, xAxis, yAxis, zAxis))
      return this.identity();

    this.make( xAxis.x, yAxis.x, zAxis.x, 0.0,
               xAxis.y, yAxis.y, zAxis.y, 0.0,
               xAxis.z, yAxis.z, zAxis.z, 0.0,
              -xAxis.dotProduct(eye), -yAxis.dotProduct(eye), -zAxis.dotProduct(eye), 1.0
              );
    return this;
  }

}
