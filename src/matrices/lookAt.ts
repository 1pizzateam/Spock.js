import { Vector3 } from '../vectors/vector3';

const PARALLEL = 1e-16;

/**
 * Build a right-handed look-at basis into xAxis, yAxis, zAxis.
 * Returns false when eye equals target.
 */
export function setLookAtAxes(
  eye: Vector3,
  target: Vector3,
  up: Vector3,
  xAxis: Vector3,
  yAxis: Vector3,
  zAxis: Vector3
): boolean {
  zAxis.copy(eye).subtract(target);
  const zLength = zAxis.getMagnitude();
  if (!zLength)
    return false;
  zAxis.scale(1 / zLength);

  xAxis.copy(up).cross(zAxis);
  if (xAxis.getMagnitude(true) < PARALLEL) {
    if (Math.abs(zAxis.y) < 0.999)
      xAxis.setScalar(0, 1, 0).cross(zAxis);
    else
      xAxis.setScalar(1, 0, 0).cross(zAxis);
  }
  xAxis.normalize();
  yAxis.copy(zAxis).cross(xAxis);
  return true;
}
