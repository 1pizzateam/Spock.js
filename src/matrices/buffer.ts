/** Copy matrix into target, or return matrix if target is omitted. */
export function matrixToArray(matrix: Float32Array, target?: Float32Array): Float32Array {
  if (target) {
    target.set(matrix);
    return target;
  }
  return matrix;
}

/** Transpose the upper-left 3×3 of a row-major matrix with the given stride. */
export function transposeLinear3(m: Float32Array, stride: number): void {
  let t = m[1];
  m[1] = m[stride];
  m[stride] = t;
  t = m[2];
  m[2] = m[2 * stride];
  m[2 * stride] = t;
  t = m[stride + 2];
  m[stride + 2] = m[2 * stride + 1];
  m[2 * stride + 1] = t;
}

/** Transpose a 4×4 matrix in place. */
export function transpose4(m: Float32Array): void {
  let t = m[1];
  m[1] = m[4];
  m[4] = t;
  t = m[2];
  m[2] = m[8];
  m[8] = t;
  t = m[3];
  m[3] = m[12];
  m[12] = t;
  t = m[6];
  m[6] = m[9];
  m[9] = t;
  t = m[7];
  m[7] = m[13];
  m[13] = t;
  t = m[11];
  m[11] = m[14];
  m[14] = t;
}

/** Determinant of the upper-left 3×3 of a row-major matrix. */
export function determinantLinear3(m: Float32Array, stride: number): number {
  const a00 = m[0], a10 = m[1], a20 = m[2];
  const a01 = m[stride], a11 = m[stride + 1], a21 = m[stride + 2];
  const a02 = m[2 * stride], a12 = m[2 * stride + 1], a22 = m[2 * stride + 2];
  return a00 * (a11 * a22 - a12 * a21)
       - a01 * (a10 * a22 - a12 * a20)
       + a02 * (a10 * a21 - a11 * a20);
}

/** Invert the upper-left 3×3 in place. Returns false if singular. */
export function invertLinear3(m: Float32Array, stride: number): boolean {
  const a00 = m[0], a10 = m[1], a20 = m[2];
  const a01 = m[stride], a11 = m[stride + 1], a21 = m[stride + 2];
  const a02 = m[2 * stride], a12 = m[2 * stride + 1], a22 = m[2 * stride + 2];

  const b00 = a11 * a22 - a12 * a21;
  const b10 = a12 * a20 - a10 * a22;
  const b20 = a10 * a21 - a11 * a20;
  const det = a00 * b00 + a10 * b10 + a20 * b20;
  if (!det)
    return false;
  const inv = 1 / det;

  m[0] = b00 * inv;
  m[1] = b10 * inv;
  m[2] = b20 * inv;
  m[stride] = (a02 * a21 - a01 * a22) * inv;
  m[stride + 1] = (a00 * a22 - a02 * a20) * inv;
  m[stride + 2] = (a01 * a20 - a00 * a21) * inv;
  m[2 * stride] = (a01 * a12 - a02 * a11) * inv;
  m[2 * stride + 1] = (a02 * a10 - a00 * a12) * inv;
  m[2 * stride + 2] = (a00 * a11 - a01 * a10) * inv;
  return true;
}

/** Determinant of a 4×4 matrix. */
export function determinant4(m: Float32Array): number {
  const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
  const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
  const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
  const a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/** Invert a 4×4 matrix in place. Returns false if singular. */
export function invert4(m: Float32Array): boolean {
  const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
  const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
  const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
  const a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det)
    return false;
  det = 1 / det;

  m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return true;
}
