import { Vec3 } from '../vectors/vec3';
import { Mat4x3 } from '../matrices/mat4x3';
import type { Mat4 } from '../matrices/mat4';

/** Points as Vec3 objects or a flat number array with a fixed stride. */
export type PointSource = Vec3[] | number[] | Float32Array;

/** Read the point starting at index into target; missing components are 0. */
export function readPoint(array: ArrayLike<number>, index: number, stride: number, target: Vec3): Vec3 {
  if (stride >= 3)
    return target.setArray(array, index);
  return target.setScalar(array[index], stride > 1 ? array[index + 1] : 0, 0);
}

const scratchAffine = new Mat4x3();

/** Mat4 inputs are treated as affine; the result is only valid until the next call. */
export function asAffine(matrix: Mat4x3 | Mat4): Mat4x3 {
  if (matrix instanceof Mat4x3)
    return matrix;
  scratchAffine.toArray().set(matrix.toArray());
  return scratchAffine;
}
