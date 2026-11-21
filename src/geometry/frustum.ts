import { Vec3 } from '../vectors/vec3';
import { Mat4 } from '../matrices/mat4';
import { Plane } from './plane';
import type { Sphere } from './sphere';
import type { Box } from './box';

const row3 = new Vec3();
const axisRow = new Vec3();
const normal = new Vec3();

/** Set a normalized plane from row 3 + sign * row `axis` of a column-major matrix. */
function setPlane(plane: Plane, m: Float32Array, axis: number, sign: 1 | -1): void {
  row3.setScalar(m[3], m[7], m[11]);
  axisRow.setScalar(m[axis], m[axis + 4], m[axis + 8]);
  normal.copy(row3).addScaledVector(axisRow, sign);
  plane.set(normal, m[15] + sign * m[12 + axis]).normalize();
}

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
  public setFromProjectionViewMatrix(matrix: Mat4): this {
    const m = matrix.toArray();
    // Column-major rows: row 0 = m[0], m[4], m[8], m[12]; row 3 = m[3], m[7], m[11], m[15]

    // Left, right, bottom, top, near, far: row 3 ± row 0/1/2
    setPlane(this.planes[0], m, 0, 1);
    setPlane(this.planes[1], m, 0, -1);
    setPlane(this.planes[2], m, 1, 1);
    setPlane(this.planes[3], m, 1, -1);
    setPlane(this.planes[4], m, 2, 1);
    setPlane(this.planes[5], m, 2, -1);

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
