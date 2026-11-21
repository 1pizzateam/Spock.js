/** @jest-environment node */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const read = (relPath) => readFileSync(join(process.cwd(), relPath), 'utf8');

const overview = read('website/docs/guide/overview.md');
const index = read('website/docs/api/index.md');
const triangle = read('website/docs/api/triangle.md');
const source = read('src/spock.ts');

describe('API documentation (issue #67)', () => {

  it('AC-1: overview lists Accumulator in the API groups linking to /api/time#accumulator', () => {
    expect(overview).toContain('[Accumulator](/api/time#accumulator)');
    expect(overview).toContain('[NumArray](/api/num-array), [RollingAverage](/api/rolling-average), [Time](/api/time)');
  });

  it('AC-2: overview and index describe Accumulator as an exported public class', () => {
    expect(overview).toMatch(/\[Accumulator\]\(\/api\/time#accumulator\), an exported public class of `@1pizzateam\/spock`/);
    expect(index).toMatch(/\[Accumulator\]\(\.\/time#accumulator\) — exported public class/);
    expect(source).toMatch(/export \{ Time, Accumulator \} from '\.\/time';/);
  });

  it('AC-3: index Utilities list links Accumulator to ./time#accumulator as a fixed-timestep accumulator', () => {
    expect(index).toMatch(/\[Accumulator\]\(\.\/time#accumulator\) — .*fixed-timestep simulation accumulator/);
  });

  it('AC-4: index introduction classifies Accumulator and RollingAverage as mutable classes and the time objects as stateless', () => {
    expect(index).toContain('`Accumulator` and `RollingAverage` are also mutable classes');
    expect(index).toContain('construct them with `new`');
    expect(index).toContain('`Trigo`, `Bezier`, `Rand`, `NumArray`, `Utils`, and `Time` are plain objects of stateless functions');
  });

  it('AC-5: triangle page has a ## Types section defining TriangleCorner and TriangleShape', () => {
    expect(triangle).toMatch(/^## Types$/m);
    expect(triangle).toContain("type TriangleCorner = 'nw' | 'ne' | 'sw' | 'se';");
    expect(triangle).toContain("type TriangleShape = 'triangle-nw' | 'triangle-ne' | 'triangle-sw' | 'triangle-se';");
    expect(triangle).toContain("import type { TriangleCorner, TriangleShape } from '@1pizzateam/spock';");
  });

  it('AC-6: index Geometry list references TriangleCorner and TriangleShape linking to ./triangle#types', () => {
    expect(index).toContain('`TriangleCorner` — type-only export, the corner union of [RightTriangle](./triangle#types)');
    expect(index).toContain('`TriangleShape` — type-only export, the shape union of [RightTriangle](./triangle#types)');
  });
});

describe('Loose Vec interface removal (issue #61)', () => {

  it('AC-1 src/vectors/vec.ts no longer exists', () => {
    expect(existsSync(join(process.cwd(), 'src/vectors/vec.ts'))).toBe(false);
  });

  it('AC-2 spock.ts has no loose Vec export but keeps Vec2 and Vec3', () => {
    expect(source).not.toMatch(/from '\.\/vectors\/vec'/);
    expect(source).toMatch(/Vec2.*from '\.\/vectors\/vec2'/);
    expect(source).toMatch(/Vec3.*from '\.\/vectors\/vec3'/);
  });

  it('AC-3 spock.ts declares no Vec type export so build output has none', () => {
    expect(source).not.toMatch(/export type \{ Vec \}/);
  });

  it('AC-4 API index no longer documents Vec and still links Vec2 and Vec3', () => {
    expect(index).not.toContain('`Vec`');
    expect(index).toContain('./vec2');
    expect(index).toContain('./vec3');
  });
});
