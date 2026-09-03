
import { Vector2 } from '../vectors/vector2';

export class Grid {

  cellSize: number;
  len: Vector2;
  
  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    const lenX    = Math.ceil(width / cellSize);
    const lenY    = Math.ceil(height / cellSize);
    this.len      = new Vector2(lenX, lenY);
  }

  public testCells(aCells: number[], bCells: number[]): boolean {
    
    for (const aCell of aCells) {
      if (aCell >= 0)
        for (const bCell of bCells) {
          if (bCell >= 0 && aCell === bCell)
            return true;
        }
    }  
    return false;
  
  }

  public draw() {

  }

}