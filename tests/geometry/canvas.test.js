import { applyCanvasStyle } from '../../build/es6/geometry/canvas.js';
import { Circle } from '../../build/es6/geometry/circle.js';
import { Rectangle } from '../../build/es6/geometry/rectangle.js';

function fakeContext() {
  return {
    begun: 0,
    filled: 0,
    stroked: 0,
    arcs: [],
    rects: [],
    beginPath() { this.begun += 1; },
    fill() { this.filled += 1; },
    stroke() { this.stroked += 1; },
    arc(x, y, radius, start, end, counterclockwise) {
      this.arcs.push({ x, y, radius, start, end, counterclockwise });
    },
    rect(x, y, width, height) {
      this.rects.push({ x, y, width, height });
    },
  };
}

describe('canvas drawing', () => {

  it('should fill when a fill color is given', () => {
    const context = fakeContext();
    applyCanvasStyle(context, '#abc', '', 0);
    expect(context.fillStyle).toBe('#abc');
    expect(context.filled).toBe(1);
    expect(context.stroked).toBe(0);
  });

  it('should stroke when a stroke color is given', () => {
    const context = fakeContext();
    applyCanvasStyle(context, '', '#000', 3);
    expect(context.strokeStyle).toBe('#000');
    expect(context.lineWidth).toBe(3);
    expect(context.stroked).toBe(1);
    expect(context.filled).toBe(0);
  });

  it('should skip both when colors are empty', () => {
    const context = fakeContext();
    applyCanvasStyle(context, '', '', 1);
    expect(context.filled).toBe(0);
    expect(context.stroked).toBe(0);
  });

  it('should draw a circle path then fill and stroke it', () => {
    const context = fakeContext();
    new Circle(10, 4, 6).draw(context, '#f00', '#0f0', 2);
    expect(context.begun).toBe(1);
    expect(context.arcs[0]).toEqual({
      x: 4,
      y: 6,
      radius: 10,
      start: 0,
      end: Math.PI * 2,
      counterclockwise: false,
    });
    expect(context.fillStyle).toBe('#f00');
    expect(context.strokeStyle).toBe('#0f0');
    expect(context.lineWidth).toBe(2);
    expect(context.filled).toBe(1);
    expect(context.stroked).toBe(1);
  });

  it('should draw a rectangle from its top-left corner', () => {
    const context = fakeContext();
    new Rectangle(10, 6, 5, 5).draw(context, '#111', '#222', 1);
    expect(context.begun).toBe(1);
    expect(context.rects[0]).toEqual({ x: 0, y: 2, width: 10, height: 6 });
    expect(context.fillStyle).toBe('#111');
    expect(context.strokeStyle).toBe('#222');
    expect(context.filled).toBe(1);
    expect(context.stroked).toBe(1);
  });

});
