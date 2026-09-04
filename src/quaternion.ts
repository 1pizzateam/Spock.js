import { Vector3 } from './vectors/vector3';
import { Matrix4x3 } from './matrices/matrix4x3';
import { Matrix4x4 } from './matrices/matrix4x4';
import { Utils } from './utils';

/** Unit quaternion as w plus a vector (x, y, z). */
export class Quaternion {
  public w: number;
  public vector: Vector3;

  /** Identity by default: (1, 0, 0, 0). */
  constructor(w: number = 1, x: number = 0, y: number = 0, z: number = 0) {
    this.vector = new Vector3(x, y, z);
    this.w = w;
  }

  /** Set w, x, y, z. */
  public set(w: number, x: number, y: number, z: number): Quaternion {
    this.w = w;
    this.vector.setScalar(x, y, z);
    return this;
  }

  /** Set to identity. */
  public identity(): Quaternion {
    return this.set(1, 0, 0, 0);
  }

  /** Rotation of angle radians about a (possibly unnormalized) axis. */
  public setAxisAngle(axis: Vector3, angle: number): Quaternion {
    this.vector.copy(axis);
    const length = this.vector.getMagnitude();
    if (!length) {
      return this.identity();
    }
    const half = angle * 0.5;
    this.vector.scale(Math.sin(half) / length);
    this.w = Math.cos(half);
    return this;
  }

  /** Set from x, y, and z Euler angles in radians. */
  public setFromEuler(x: number, y: number, z: number): Quaternion {
    const hx = x * 0.5;
    const hy = y * 0.5;
    const hz = z * 0.5;
    const cx = Math.cos(hx);
    const cy = Math.cos(hy);
    const cz = Math.cos(hz);
    const sx = Math.sin(hx);
    const sy = Math.sin(hy);
    const sz = Math.sin(hz);
    this.w = cx * cy * cz - sx * sy * sz;
    this.vector.x = sx * cy * cz + cx * sy * sz;
    this.vector.y = cx * sy * cz - sx * cy * sz;
    this.vector.z = cx * cy * sz + sx * sy * cz;
    return this;
  }

  /** Write the rotation axis into axis; return the angle in radians. */
  public getAxisAngle(axis: Vector3): number {
    const length = this.vector.getMagnitude();
    if (length < 1e-8) {
      axis.setScalar(1, 0, 0);
      return 0;
    }
    axis.copy(this.vector).scale(1 / length);
    return 2 * Math.acos(Utils.clamp(this.w, -1, 1));
  }

  /** Independent copy. */
  public clone(): Quaternion {
    return new Quaternion(this.w, this.vector.x, this.vector.y, this.vector.z);
  }

  /** Copy another quaternion into this one. */
  public copy(q: Quaternion): Quaternion {
    this.w = q.w;
    this.vector.copy(q.vector);
    return this;
  }

  /** Write [w, x, y, z] into target (or a new array). */
  public toArray(target: number[] = []): number[] {
    target[0] = this.w;
    target[1] = this.vector.x;
    target[2] = this.vector.y;
    target[3] = this.vector.z;
    target.length = 4;
    return target;
  }

  /** Human-readable (x, y, z, w) string. */
  public toString(): string {
    return `(x = ${this.vector.x}; y = ${this.vector.y}; z = ${this.vector.z}; w = ${this.w})`;
  }

  /** Length, or squared length if square is true. */
  public getMagnitude(square: boolean = false): number {
    const squared = this.w * this.w + this.vector.getMagnitude(true);
    return square ? squared : Math.sqrt(squared);
  }

  /** Scale to unit length. */
  public normalize(): Quaternion {
    const length = this.getMagnitude();
    if (length && length !== 1) {
      const inv = 1 / length;
      this.w *= inv;
      this.vector.scale(inv);
    }
    return this;
  }

  /** Negate the vector part. */
  public conjugate(): Quaternion {
    this.vector.opposite();
    return this;
  }

  /** Invert in place; unchanged if zero. */
  public invert(): Quaternion {
    const squared = this.getMagnitude(true);
    if (!squared) {
      return this;
    }
    this.conjugate();
    if (squared !== 1) {
      const inv = 1 / squared;
      this.w *= inv;
      this.vector.scale(inv);
    }
    return this;
  }

  /** Dot product with q. */
  public dot(q: Quaternion): number {
    return this.w * q.w + this.vector.dotProduct(q.vector);
  }

  /** Hamilton product this *= q. */
  public multiply(q: Quaternion): Quaternion {
    return this.setProduct(
      this.vector.x, this.vector.y, this.vector.z, this.w,
      q.vector.x, q.vector.y, q.vector.z, q.w
    );
  }

  /** Hamilton product this = q * this. */
  public premultiply(q: Quaternion): Quaternion {
    return this.setProduct(
      q.vector.x, q.vector.y, q.vector.z, q.w,
      this.vector.x, this.vector.y, this.vector.z, this.w
    );
  }

  /** Compose a rotation about X (radians). */
  public rotateX(angle: number): Quaternion {
    const half = angle * 0.5;
    const bx = Math.sin(half);
    const bw = Math.cos(half);
    const ax = this.vector.x, ay = this.vector.y, az = this.vector.z, aw = this.w;
    this.vector.x = ax * bw + aw * bx;
    this.vector.y = ay * bw + az * bx;
    this.vector.z = az * bw - ay * bx;
    this.w = aw * bw - ax * bx;
    return this;
  }

  /** Compose a rotation about Y (radians). */
  public rotateY(angle: number): Quaternion {
    const half = angle * 0.5;
    const by = Math.sin(half);
    const bw = Math.cos(half);
    const ax = this.vector.x, ay = this.vector.y, az = this.vector.z, aw = this.w;
    this.vector.x = ax * bw - az * by;
    this.vector.y = ay * bw + aw * by;
    this.vector.z = az * bw + ax * by;
    this.w = aw * bw - ay * by;
    return this;
  }

  /** Compose a rotation about Z (radians). */
  public rotateZ(angle: number): Quaternion {
    const half = angle * 0.5;
    const bz = Math.sin(half);
    const bw = Math.cos(half);
    const ax = this.vector.x, ay = this.vector.y, az = this.vector.z, aw = this.w;
    this.vector.x = ax * bw + ay * bz;
    this.vector.y = ay * bw - ax * bz;
    this.vector.z = az * bw + aw * bz;
    this.w = aw * bw - az * bz;
    return this;
  }

  /** Spherical interpolate toward q by t in [0, 1]. */
  public slerp(q: Quaternion, t: number): Quaternion {
    if (t === 0) {
      return this;
    }
    if (t === 1) {
      return this.copy(q);
    }

    let bx = q.vector.x, by = q.vector.y, bz = q.vector.z, bw = q.w;
    const ax = this.vector.x, ay = this.vector.y, az = this.vector.z, aw = this.w;
    let cosom = aw * bw + ax * bx + ay * by + az * bz;

    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }

    if (cosom > 0.9995) {
      this.w = aw + t * (bw - aw);
      this.vector.setScalar(
        ax + t * (bx - ax),
        ay + t * (by - ay),
        az + t * (bz - az)
      );
      return this.normalize();
    }

    const omega = Math.acos(Utils.clamp(cosom, -1, 1));
    const sinom = Math.sin(omega);
    const scale0 = Math.sin((1 - t) * omega) / sinom;
    const scale1 = Math.sin(t * omega) / sinom;
    this.w = scale0 * aw + scale1 * bw;
    this.vector.setScalar(
      scale0 * ax + scale1 * bx,
      scale0 * ay + scale1 * by,
      scale0 * az + scale1 * bz
    );
    return this;
  }

  /** Rotate vector; write the result into target. */
  public multiplyVector(vector: Vector3, target: Vector3 = new Vector3()): Vector3 {
    const ux = this.vector.x, uy = this.vector.y, uz = this.vector.z, w = this.w;
    const vx = vector.x, vy = vector.y, vz = vector.z;
    const cx = uy * vz - uz * vy;
    const cy = uz * vx - ux * vz;
    const cz = ux * vy - uy * vx;
    target.x = vx + 2 * (w * cx + uy * cz - uz * cy);
    target.y = vy + 2 * (w * cy + uz * cx - ux * cz);
    target.z = vz + 2 * (w * cz + ux * cy - uy * cx);
    return target;
  }

  /** Write this rotation into a 4×4 matrix. */
  public toMatrix4x4(target: Matrix4x4 = new Matrix4x4()): Matrix4x4 {
    this.writeRotation(target.toArray());
    return target;
  }

  /** Write this rotation into a 4×3 matrix. */
  public toMatrix4x3(target: Matrix4x3 = new Matrix4x3()): Matrix4x3 {
    this.writeRotation(target.toArray());
    return target;
  }

  /** True if this is approximately identity. */
  public isIdentity(): boolean {
    return Math.abs(this.w - 1) < 1e-6 && this.vector.getMagnitude(true) < 1e-12;
  }

  /** Hamilton product of two quaternions into this one. */
  private setProduct(
    ax: number, ay: number, az: number, aw: number,
    bx: number, by: number, bz: number, bw: number
  ): Quaternion {
    this.vector.x = ax * bw + aw * bx + ay * bz - az * by;
    this.vector.y = ay * bw + aw * by + az * bx - ax * bz;
    this.vector.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;
    return this;
  }

  /** Fill a 4×4 buffer with this rotation. */
  private writeRotation(m: Float32Array): void {
    const x = this.vector.x, y = this.vector.y, z = this.vector.z, w = this.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    m[ 0] = 1 - (yy + zz);
    m[ 1] = xy + wz;
    m[ 2] = xz - wy;
    m[ 3] = 0;
    m[ 4] = xy - wz;
    m[ 5] = 1 - (xx + zz);
    m[ 6] = yz + wx;
    m[ 7] = 0;
    m[ 8] = xz + wy;
    m[ 9] = yz - wx;
    m[10] = 1 - (xx + yy);
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
  }

}
