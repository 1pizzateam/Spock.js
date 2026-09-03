import { Vector2 } from '../vectors/vector2';
import { Grid }    from './grid';
import { Utils }   from '../utils';

export class Rectangle {

  public position : Vector2;
  public topLeftCorner : Vector2;
  public bottomRightCorner : Vector2;
  public size : Vector2;
  public halfSize : Vector2;
  public gridCells: number[] = [0,0,0,0];
  private grid: Grid | null;
  private cellTlc: Vector2;
  private cellBrc: Vector2;
  readonly shape: 'aabb' = 'aabb';

  constructor( width: number, height: number, positionX: number, positionY: number, grid: Grid|null ) {
    this.position = new Vector2(positionX, positionY);
    this.size = new Vector2( width, height );
    this.halfSize = new Vector2();
    this.topLeftCorner = new Vector2();
    this.bottomRightCorner = new Vector2();
    this.grid = grid || null;
    this.cellTlc = new Vector2(); // cell top left corner
    this.cellBrc = new Vector2(); // cell bottom right corner
    this.setHalfSize();
    this.setCorners();
    this.setGridPos();
  }

  public clone(): Rectangle {
    return new Rectangle(this.size.x, this.size.y, this.position.x, this.position.y, this.grid);
  }

  public copy( rectangle: Rectangle ): Rectangle {
    this.setSize( rectangle.size.x, rectangle.size.y );
    this.setPosition( rectangle.position.x, rectangle.position.y );
    return this;
  }
  
  public setPosition(positionX: number, positionY: number): void {
    this.position.setScalar( positionX, positionY );
    this.setCorners();
    this.setGridPos();
  }

  public setSize(width: number, height: number): void {
    this.size.setScalar(width, height);
    this.setHalfSize();
    this.setCorners();
    this.setGridPos();
  }

  public isIn(vector: Vector2): boolean {
    return (Utils.isIn(vector.x, this.topLeftCorner.x, this.bottomRightCorner.x)
            && Utils.isIn(vector.y, this.topLeftCorner.y, this.bottomRightCorner.y));
  }

  /**
  * draw the rectangle in a canvas.
  */
  public draw( context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number ): void {
    context.beginPath();
    context.rect( this.topLeftCorner.x,
                  this.topLeftCorner.y,
                  this.size.x,
                  this.size.y
                );
    if( fillColor ){
      context.fillStyle = fillColor;
      context.fill();
    }
    if( strokeColor ){
      context.strokeStyle = strokeColor;
      context.lineWidth = strokeWidth;
      context.stroke();
    }
  }

  private setCorners(): void {
    this.topLeftCorner.copy(this.position).subtract(this.halfSize);
    this.bottomRightCorner.copy(this.position).add(this.halfSize);
  }

  private setHalfSize(): void {
    this.halfSize.copy(this.size).halve();
  }

  private setGridPos(): void {

    if (this.grid) {
      const size = this.grid.cellSize;
      const colLen = this.grid.len.x;
      const sizeInv = 1/size;
      this.cellTlc.copy(this.topLeftCorner).scale(sizeInv).floor().scale(colLen, 'y');
      this.cellBrc.copy(this.bottomRightCorner).scale(sizeInv).floor().scale(colLen, 'y');

      const tlcxtlcy = this.cellTlc.addComponents();
      const brcxtlcy = this.cellBrc.x + this.cellTlc.y;
      const tlcxbrcy = this.cellTlc.x + this.cellBrc.y;
      const brcxbrcy = this.cellBrc.addComponents();

      this.gridCells[0] = tlcxtlcy;
      this.gridCells[1] = brcxtlcy !== tlcxtlcy ? brcxtlcy : -1;
      this.gridCells[2] = tlcxbrcy !== tlcxtlcy && tlcxbrcy !== brcxtlcy ? tlcxbrcy : -1;
      this.gridCells[3] = brcxbrcy !== tlcxtlcy && brcxbrcy !== brcxtlcy && brcxbrcy !== tlcxtlcy ? brcxbrcy : -1;
    }
    
  }

  // clampTo:function(rectangle){
  //   this.position.clampTo(rectangle);
  // },

};
