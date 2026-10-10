import { Vec3 } from '../vectors/vec3';
import { Mat4 } from '../matrices/mat4';
import { Plane } from './plane';
import type { Sphere } from './sphere';
import type { Box } from './box';

/** Six-plane view frustum with inward-facing normals. */
export class Frustum {

  public planes: Plane[];

  /** Left, right, bottom, top, near, far. */
  constructor() {
    this.planes = [
      new Plane(),
      new Plane(),
      new Plane(),
      new Plane(),
      new Plane(),
      new Plane(),
    ];
  }

  /** Extract the planes from a column-major projection * view matrix. */
  public setFromProjectionViewMatrix(matrixOrArray: Mat4 | Float32Array | number[]): this {
    const m = matrixOrArray instanceof Mat4 ? matrixOrArray.toArray() : matrixOrArray;
    // Column-major rows: row 0 = m[0], m[4], m[8], m[12]; row 3 = m[3], m[7], m[11], m[15]

    // Left plane: row 3 + row 0
    this.planes[0].setComponents(m[3] + m[0], m[7] + m[4], m[11] + m[8], m[15] + m[12]);
    // Right plane: row 3 - row 0
    this.planes[1].setComponents(m[3] - m[0], m[7] - m[4], m[11] - m[8], m[15] - m[12]);
    // Bottom plane: row 3 + row 1
    this.planes[2].setComponents(m[3] + m[1], m[7] + m[5], m[11] + m[9], m[15] + m[13]);
    // Top plane: row 3 - row 1
    this.planes[3].setComponents(m[3] - m[1], m[7] - m[5], m[11] - m[9], m[15] - m[13]);
    // Near plane: row 3 + row 2
    this.planes[4].setComponents(m[3] + m[2], m[7] + m[6], m[11] + m[10], m[15] + m[14]);
    // Far plane: row 3 - row 2
    this.planes[5].setComponents(m[3] - m[2], m[7] - m[6], m[11] - m[10], m[15] - m[14]);

    return this;
  }

  /** True unless the sphere is entirely outside one plane. */
  public intersectsSphere(sphere: Sphere): boolean {
    const center = sphere.center;
    const negRadius = -sphere.radius;
    for (let i = 0; i < 6; i++)
      if (this.planes[i].distanceToPoint(center) < negRadius)
        return false;
    return true;
  }

  /** True unless the box is entirely outside one plane. */
  public intersectsBox(box: Box): boolean {
    for (let i = 0; i < 6; i++) {
      const plane = this.planes[i];
      const px = plane.normal.x > 0 ? box.max.x : box.min.x;
      const py = plane.normal.y > 0 ? box.max.y : box.min.y;
      const pz = plane.normal.z > 0 ? box.max.z : box.min.z;
      if (plane.normal.x * px + plane.normal.y * py + plane.normal.z * pz + plane.constant < 0)
        return false;
    }
    return true;
  }

  /** True if point is inside all six planes. */
  public containsPoint(point: Vec3): boolean {
    for (let i = 0; i < 6; i++)
      if (this.planes[i].distanceToPoint(point) < 0)
        return false;
    return true;
  }

}
