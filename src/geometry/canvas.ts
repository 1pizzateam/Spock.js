/** Fill and/or stroke the current canvas path. */
export function applyCanvasStyle(
  context: CanvasRenderingContext2D,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number
): void {
  if (fillColor) {
    context.fillStyle = fillColor;
    context.fill();
  }
  if (strokeColor) {
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    context.stroke();
  }
}
