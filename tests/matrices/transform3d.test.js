import { Mat4 } from '../../build/es6/matrices/mat4.js';
import { Mat4x3 } from '../../build/es6/matrices/mat4x3.js';
import { Vec3 } from '../../build/es6/vectors/vec3.js';
import { Vec2 } from '../../build/es6/vectors/vec2.js';
import { Quat } from '../../build/es6/quat.js';

const close = (a, b, eps = 1e-5) => expect(Math.abs(a - b)).toBeLessThan(eps);
const closeVec = (v, x, y, z, eps = 1e-5) => {
  close(v.x, x, eps);
  close(v.y, y, eps);
  close(v.z, z, eps);
};

describe('Mat4x3 3D transform helpers', () => {

  const position = new Vec3(1, 2, 3);
  const rotation = new Quat().setFromEuler(0.3, -0.7, 1.1);
  const scale = new Vec3(2, 3, 0.5);

  it('compose matches translate * rotate * scale', () => {
    const expected = new Mat4x3().translate(position);
    expected.multiply(rotation.toMat4x3());
    expected.scale(scale);
    const composed = new Mat4x3().compose(position, rotation, scale);
    const a = composed.toArray();
    const b = expected.toArray();
    for (let i = 0; i < 16; i++)
      close(a[i], b[i]);
  });

  it('reads translation, columns and scale back', () => {
    const m = new Mat4x3().compose(position, rotation, scale);
    closeVec(m.getTranslation(), 1, 2, 3);
    const s = m.getScale();
    closeVec(s, 2, 3, 0.5);
    const c0 = m.getColumn(0);
    close(c0.getMagnitude(), 2);
    close(m.getColumn(2).getMagnitude(), 0.5);
  });

  it('setTranslation overwrites only the translation', () => {
    const m = new Mat4x3().compose(position, rotation, scale);
    const before = m.getScale();
    m.setTranslation(new Vec3(-4, 5, 6));
    closeVec(m.getTranslation(), -4, 5, 6);
    closeVec(m.getScale(), before.x, before.y, before.z);
  });

  it('transformPoint and transformDirection', () => {
    const m = new Mat4x3().translate(new Vec3(10, 0, 0)).scale(new Vec3(2, 2, 2));
    closeVec(m.transformPoint(new Vec3(1, 1, 1)), 12, 2, 2);
    closeVec(m.transformDirection(new Vec3(1, 1, 1)), 2, 2, 2);
  });

  it('transformPoint supports in-place targets', () => {
    const m = new Mat4x3().compose(position, rotation, scale);
    const v = new Vec3(1, -2, 3);
    const expected = m.transformPoint(v.clone());
    m.transformPoint(v, v);
    closeVec(v, expected.x, expected.y, expected.z);
  });

  it('toNormalMatrix equals inverse transpose of the linear part', () => {
    const m = new Mat4x3().compose(position, rotation, scale);
    const normal = m.toNormalMatrix(new Float32Array(9));
    const ref = new Mat4x3().copy(m).invertAffine().transposeLinear().toArray();
    const cols = [[0, 1, 2], [4, 5, 6], [8, 9, 10]];
    for (let c = 0; c < 3; c++)
      for (let r = 0; r < 3; r++)
        close(normal[c * 3 + r], ref[cols[c][r]]);
  });

  it('toNormalMatrix of a rotation leaves normals unscaled', () => {
    const m = new Mat4x3().compose(new Vec3(), rotation, new Vec3(1, 1, 1));
    const n = m.toNormalMatrix(new Float32Array(9));
    const v = new Vec3(0, 0, 1);
    const rotated = rotation.multiplyVector(v);
    closeVec(new Vec3(n[0] * v.x + n[3] * v.y + n[6] * v.z,
                      n[1] * v.x + n[4] * v.y + n[7] * v.z,
                      n[2] * v.x + n[5] * v.y + n[8] * v.z), rotated.x, rotated.y, rotated.z);
  });

  it('toNormalMatrix falls back to identity when singular', () => {
    const m = new Mat4x3().scale(new Vec3(0, 1, 1));
    const n = m.toNormalMatrix(new Float32Array(9).fill(7));
    expect(Array.from(n)).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

});

describe('Mat4 affine helpers', () => {

  it('setFromMat4x3 and multiplyAffine agree with Mat4 math', () => {
    const view = new Mat4x3().lookAtRH(new Vec3(3, 4, 5), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    const proj = new Mat4().perspective(60, 1.5, 0.1, 100);

    const viaAffine = new Mat4().copy(proj).multiplyAffine(view);
    const viaMat4 = new Mat4().copy(proj).multiply(new Mat4().setFromMat4x3(view));
    const a = viaAffine.toArray();
    const b = viaMat4.toArray();
    for (let i = 0; i < 16; i++)
      close(a[i], b[i]);
  });

  it('transformPoint applies the perspective divide', () => {
    const proj = new Mat4().perspective(90, 1, 1, 100);
    const p = proj.transformPoint(new Vec3(0, 0, -1));
    close(p.x, 0);
    close(p.y, 0);
    close(p.z, -1);
    const far = proj.transformPoint(new Vec3(0, 0, -100));
    close(far.z, 1);
  });

  it('transformPoint round-trips through invert', () => {
    const pv = new Mat4().perspective(60, 1.5, 0.1, 100)
      .multiplyAffine(new Mat4x3().lookAtRH(new Vec3(3, 4, 5), new Vec3(), new Vec3(0, 1, 0)));
    const inv = new Mat4().copy(pv).invert();
    const world = new Vec3(0.5, -0.25, 0.75);
    const ndc = pv.transformPoint(world);
    const back = inv.transformPoint(ndc);
    closeVec(back, 0.5, -0.25, 0.75, 1e-3);
  });

});

describe('Quat matrix and euler helpers', () => {

  it('getEuler inverts setFromEuler', () => {
    const angles = [[0.3, -0.7, 1.1], [-1.2, 0.4, 0.2], [0, 0, 0], [0.5, 1.2, -2.5]];
    for (const [x, y, z] of angles) {
      const q = new Quat().setFromEuler(x, y, z);
      const e = q.getEuler();
      const q2 = new Quat().setFromEuler(e);
      close(Math.abs(q.dot(q2)), 1);
    }
  });

  it('getEuler handles gimbal lock', () => {
    const q = new Quat().setFromEuler(0.4, Math.PI / 2, 0);
    const e = q.getEuler();
    close(e.y, Math.PI / 2, 1e-4);
    const q2 = new Quat().setFromEuler(e);
    close(Math.abs(q.dot(q2)), 1, 1e-4);
  });

  it('setFromRotationMatrix inverts toMat4x3 for all branches', () => {
    const axes = [new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1), new Vec3(1, 1, 1)];
    for (const axis of axes)
      for (const angle of [0.2, 1.5, 3.0, -2.5]) {
        const q = new Quat().setAxisAngle(axis, angle);
        const back = new Quat().setFromRotationMatrix(q.toMat4x3());
        close(Math.abs(q.dot(back)), 1);
      }
  });

  it('setFromRotationMatrix ignores scale', () => {
    const q = new Quat().setFromEuler(0.3, 0.2, -0.4);
    const m = new Mat4x3().compose(new Vec3(1, 2, 3), q, new Vec3(2, 3, 4));
    close(Math.abs(new Quat().setFromRotationMatrix(m).dot(q)), 1);
  });

  it('lookAt orients -Z toward the target', () => {
    const eye = new Vec3(1, 2, 3);
    const target = new Vec3(-4, 0, 7);
    const q = new Quat().lookAt(eye, target, new Vec3(0, 1, 0));
    const forward = q.multiplyVector(new Vec3(0, 0, -1));
    const expected = new Vec3().subVectors(target, eye).normalize();
    closeVec(forward, expected.x, expected.y, expected.z);
  });

  it('lookAt matches the inverse of lookAtRH', () => {
    const eye = new Vec3(5, 2, -1);
    const target = new Vec3(0, 1, 0);
    const up = new Vec3(0, 1, 0);
    const viaMatrix = new Quat().setFromRotationMatrix(new Mat4x3().lookAtRH(eye, target, up).transposeLinear());
    close(Math.abs(new Quat().lookAt(eye, target, up).dot(viaMatrix)), 1);
  });

  it('lookAt leaves the quaternion unchanged when eye equals target', () => {
    const q = new Quat().setFromEuler(0.1, 0.2, 0.3);
    const before = q.clone();
    q.lookAt(new Vec3(1, 1, 1), new Vec3(1, 1, 1), new Vec3(0, 1, 0));
    close(q.dot(before), 1);
  });

});

describe('Vec3 / Vec2 buffer and spherical helpers', () => {

  it('setArray reads from typed arrays with offset', () => {
    const v = new Vec3().setArray(new Float32Array([0, 1, 2, 3]), 1);
    closeVec(v, 1, 2, 3);
    const v2 = new Vec2().setArray(new Float32Array([9, 4, 5]), 1);
    expect([v2.x, v2.y]).toEqual([4, 5]);
  });

  it('toArray writes into typed arrays at offset', () => {
    const buffer = new Float32Array(6);
    new Vec3(1, 2, 3).toArray(buffer, 3);
    expect(Array.from(buffer)).toEqual([0, 0, 0, 1, 2, 3]);
    const buffer2 = new Float32Array(4);
    new Vec2(7, 8).toArray(buffer2, 2);
    expect(Array.from(buffer2)).toEqual([0, 0, 7, 8]);
  });

  it('toArray still trims plain arrays', () => {
    expect(new Vec3(1, 2, 3).toArray([9, 9, 9, 9])).toEqual([1, 2, 3]);
    expect(new Vec2(1, 2).toArray([9, 9, 9])).toEqual([1, 2]);
  });

  it('maxComponent and minComponent', () => {
    const v = new Vec3(-1, 5, 2);
    expect(v.maxComponent()).toBe(5);
    expect(v.minComponent()).toBe(-1);
  });

  it('setFromSpherical and getSpherical are inverses', () => {
    const v = new Vec3().setFromSpherical(10, 0.6, 0.3);
    const s = v.getSpherical();
    close(s.x, 10);
    close(s.y, 0.6);
    close(s.z, 0.3);
  });

  it('setFromSpherical axes', () => {
    closeVec(new Vec3().setFromSpherical(2, 0, 0), 0, 0, 2);
    closeVec(new Vec3().setFromSpherical(2, Math.PI / 2, 0), 2, 0, 0);
    closeVec(new Vec3().setFromSpherical(2, 0, Math.PI / 2), 0, 2, 0);
  });

  it('getSpherical supports writing into the source vector', () => {
    const v = new Vec3().setFromSpherical(5, 1.0, -0.4);
    v.getSpherical(v);
    close(v.x, 5);
    close(v.y, 1.0);
    close(v.z, -0.4);
  });

  it('getSpherical of the origin is zero', () => {
    const s = new Vec3().getSpherical();
    expect([s.x, s.z]).toEqual([0, 0]);
  });

});
