import type { Circ } from './circ';
import type { RayHit2D } from './rayhit';
import { applyCanvasStyle } from './canvas';
import { Rect } from './rect';
import { Utils } from '../utils';
import { Vec2 } from '../vectors/vec2';

export type TriangleCorner = 'nw' | 'ne' | 'sw' | 'se';
export type TriangleShape = 'triangle-nw' | 'triangle-ne' | 'triangle-sw' | 'triangle-se';

const scratchDiff = new Vec2();
const scratchEdge = new Vec2();
const scratchProj = new Vec2();
const scratchBestNormal = new Vec2();
const scratchS = new Vec2();
const scratchA = new Vec2();
const scratchB = new Vec2();
const scratchRayDir = new Vec2();
const scratchRayRel = new Vec2();
const scratchHit: RayHit2D = { fraction: 0, point: new Vec2(), normal: new Vec2() };

/** Raycast a 2D line segment [start, end] against edge segment [p1, p2] with outward normal outNormal. */
export function raycastSegment(
  start: Vec2,
  end: Vec2,
  p1: Vec2,
  p2: Vec2,
  outNormal: Vec2,
  target?: RayHit2D
): RayHit2D | null {
  scratchRayDir.subVectors(end, start);
  scratchEdge.subVectors(p2, p1);
  const denom = scratchRayDir.crossProduct(scratchEdge);
  if (Math.abs(denom) <= 1e-8)
    return null;
  scratchRayRel.subVectors(p1, start);
  const t = scratchRayRel.crossProduct(scratchEdge) / denom;
  const u = scratchRayRel.crossProduct(scratchRayDir) / denom;
  if (t < 0 || t > 1 || u < 0 || u > 1)
    return null;
  const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
  out.fraction = t;
  out.point.lerpVectors(start, end, t);
  out.normal.copy(outNormal);
  return out;
}

/** Axis-aligned right triangle occupying one corner ('nw' | 'ne' | 'sw' | 'se') of its bounding rectangle. */
export class RightTriangle extends Rect {

  public override shape: TriangleShape;
  public corner: TriangleCorner;
  public sx: number;
  public sy: number;
  public hypNormal: Vec2;
  public hypTangent: Vec2;
  public hypLength: number = 0;

  constructor(size: Vec2, position: Vec2 = new Vec2(), corner: TriangleCorner = 'nw') {
    super(size, position);
    this.hypNormal = new Vec2();
    this.hypTangent = new Vec2();
    this.corner = corner;
    this.shape = `triangle-${corner}` as TriangleShape;
    this.sx = corner === 'nw' || corner === 'sw' ? -1 : 1;
    this.sy = corner === 'nw' || corner === 'ne' ? -1 : 1;
    this.updateNormals();
  }

  protected override setHalfSize(): void {
    super.setHalfSize();
    if (this.hypNormal)
      this.updateNormals();
  }

  private updateNormals(): void {
    this.hypNormal.setScalar(-this.sx * this.halfSize.y, -this.sy * this.halfSize.x).normalize();
    this.hypTangent.perpVector(this.hypNormal);
    this.hypLength = this.size.getMagnitude();
  }

  public override clone(): RightTriangle {
    return new RightTriangle(this.size, this.position, this.corner).setGrid(this.getGrid()) as RightTriangle;
  }

  public override copy(tri: RightTriangle): RightTriangle {
    this.corner = tri.corner;
    this.shape = tri.shape;
    this.sx = tri.sx;
    this.sy = tri.sy;
    return super.copy(tri) as RightTriangle;
  }

  public getVertices(
    s: Vec2 = new Vec2(),
    a: Vec2 = new Vec2(),
    b: Vec2 = new Vec2()
  ): { s: Vec2; a: Vec2; b: Vec2 } {
    const sx = this.sx < 0 ? this.topLeftCorner.x : this.bottomRightCorner.x;
    const sy = this.sy < 0 ? this.topLeftCorner.y : this.bottomRightCorner.y;
    const ox = this.sx < 0 ? this.bottomRightCorner.x : this.topLeftCorner.x;
    const oy = this.sy < 0 ? this.bottomRightCorner.y : this.topLeftCorner.y;
    s.setScalar(sx, sy);
    a.setScalar(sx, oy);
    b.setScalar(ox, sy);
    return { s, a, b };
  }

  public getOppositeCorner(target: Vec2 = new Vec2()): Vec2 {
    return target.setScalar(
      this.sx < 0 ? this.bottomRightCorner.x : this.topLeftCorner.x,
      this.sy < 0 ? this.bottomRightCorner.y : this.topLeftCorner.y
    );
  }

  public signedDistanceToHypotenuse(point: Vec2): number {
    return scratchDiff.subVectors(point, this.position).dotProduct(this.hypNormal);
  }

  public projectOntoHypotenuse(point: Vec2, margin: number = 0, target: Vec2 = new Vec2()): Vec2 {
    const halfSpan = Math.max(0, this.hypLength * 0.5 - margin);
    const along = Utils.clamp(
      scratchDiff.subVectors(point, this.position).dotProduct(this.hypTangent),
      -halfSpan,
      halfSpan
    );
    return target.copy(this.position).addScaledVector(this.hypTangent, along);
  }

  public override getClosestPoint(point: Vec2, target: Vec2 = new Vec2()): Vec2 {
    super.getClosestPoint(point, target);
    return this.signedDistanceToHypotenuse(target) <= 0
      ? target
      : this.projectOntoHypotenuse(point, 0, target);
  }

  public override isIn(point: Vec2): boolean {
    return super.isIn(point) && this.signedDistanceToHypotenuse(point) <= 1e-9;
  }

  public override overlapsCircle(circ: Circ): boolean {
    return circ.radius >= 0 && circ.position.getDistance(this.getClosestPoint(circ.position, scratchProj), true) <= circ.radius * circ.radius;
  }

  public override overlapsBounds(min: Vec2, max: Vec2): boolean {
    if (!super.overlapsBounds(min, max))
      return false;
    scratchProj.setScalar(
      this.sx > 0 ? Math.max(min.x, max.x) : Math.min(min.x, max.x),
      this.sy > 0 ? Math.max(min.y, max.y) : Math.min(min.y, max.y)
    );
    return this.signedDistanceToHypotenuse(scratchProj) <= 0;
  }

  public override raycast(start: Vec2, end: Vec2, target?: RayHit2D): RayHit2D | null {
    if (this.isIn(start)) {
      const sdHyp = this.signedDistanceToHypotenuse(start);
      const sdLegX = (start.x - this.position.x) * this.sx - this.halfSize.x;
      const sdLegY = (start.y - this.position.y) * this.sy - this.halfSize.y;
      const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
      out.fraction = 0;
      out.point.copy(start);
      if (sdHyp >= sdLegX && sdHyp >= sdLegY)
        out.normal.copy(this.hypNormal);
      else if (sdLegX >= sdLegY)
        out.normal.setScalar(this.sx, 0);
      else
        out.normal.setScalar(0, this.sy);
      return out;
    }

    this.getVertices(scratchS, scratchA, scratchB);
    let bestT = 2;

    if (raycastSegment(start, end, scratchA, scratchB, this.hypNormal, scratchHit)) {
      bestT = scratchHit.fraction;
      scratchBestNormal.copy(this.hypNormal);
    }
    scratchProj.setScalar(this.sx, 0);
    if (raycastSegment(start, end, scratchS, scratchA, scratchProj, scratchHit) && scratchHit.fraction < bestT) {
      bestT = scratchHit.fraction;
      scratchBestNormal.copy(scratchProj);
    }
    scratchProj.setScalar(0, this.sy);
    if (raycastSegment(start, end, scratchB, scratchS, scratchProj, scratchHit) && scratchHit.fraction < bestT) {
      bestT = scratchHit.fraction;
      scratchBestNormal.copy(scratchProj);
    }
    if (bestT > 1)
      return null;

    const out = target ?? { fraction: 0, point: new Vec2(), normal: new Vec2() };
    out.fraction = bestT;
    out.point.lerpVectors(start, end, bestT);
    out.normal.copy(scratchBestNormal);
    return out;
  }

  public override draw(
    context: CanvasRenderingContext2D,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number
  ): void {
    this.getVertices(scratchS, scratchA, scratchB);
    context.beginPath();
    context.moveTo(scratchS.x, scratchS.y);
    context.lineTo(scratchA.x, scratchA.y);
    context.lineTo(scratchB.x, scratchB.y);
    context.closePath();
    applyCanvasStyle(context, fillColor, strokeColor, strokeWidth);
  }

}
