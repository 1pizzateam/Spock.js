
export interface Vector {
  'x': number;
  'y': number;
  'z'?: number;
  [key: string]: any;
}

export class Vector {

  constructor() {

  }

  public setScalar(x? : number | null, y?: number | null, z?: number | null): any {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    if (this.hasOwnProperty('z'))
      this.z = z ?? this.z;

    return this;
  }

  public setArray(array: number[], offset?: number): any {
    if ( offset === undefined ){
      offset = 0;
    }
    this.x = array[ offset ] ?? this.x;
    this.y = array[ offset + 1 ] ?? this.y;
    if (this.hasOwnProperty('z'))
      this.z = array[offset + 2] ?? this.z;

    return this;
  }

  public copy(vector: Vector): any {
    this.x = vector.x ?? this.x;
    this.y = vector.y ?? this.y;
    if (this.hasOwnProperty('z'))
      this.z = vector.z ?? this.z;

    return this;
  }

  public isPositive(): boolean {
    return (   this.x >= 0 
            && this.y >= 0 
            && (!this.hasOwnProperty('z') || this.z as number >= 0 )
           ) ? true : false;
  }

  //true if vector is equal to (scalar;scalar)
  public isEqualTo(scalar: number): boolean {
    return (   this.x === scalar 
            && this.y === scalar 
            && (!this.hasOwnProperty('z') || this.z as number === scalar )
           ) ? true : false;
  }

  //true if vector is equal to (0;0)
  public isOrigin(): boolean {
    return (   this.x === 0 
            && this.y === 0 
            && (!this.hasOwnProperty('z') || this.z as number === 0 )
           ) ? true : false;
  }

  public toArray(): number[] {
    return Object.values(this);
  }

  public toString(): string {
    let z = ')';
    if (this.hasOwnProperty('z'))
      z = `; z = ${this.z})`;
    return `(x = ${this.x}; y = ${this.y}${z}`;
  }

  public origin(): any {
    this.x = 0.0;
    this.y = 0.0;
    if (this.hasOwnProperty('z'))
      this.z = 0.0;

    return this;
  }

  public getMagnitude(square: boolean = false): number{
    return square ? this.getSquaredMagnitude() : Math.sqrt(this.getSquaredMagnitude());
  }

  private getSquaredMagnitude(): number {
    return this.x ** 2 + this.y ** 2 + (this.hasOwnProperty('z') ? (this.z as number) ** 2 : 0);
  }

  public getDistance(vector: any, square: boolean = false): number {
    this.subtract(vector);
    const magnitude = this.getMagnitude(square);
    this.add(vector);
    return magnitude;
  }

  public add(vector: any): any {
    this.x += vector.x;
    this.y += vector.y;
    if (this.hasOwnProperty('z'))
      (this.z as number) += vector.z;
    
    return this;
  }

  public addScaledVector(vector: any, scalar: number): any {
    this.x += vector.x * scalar;
    this.y += vector.y * scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) += vector.z * scalar;

    return this;
  }

  public addScalar(scalar: number): any {
    this.x += scalar;
    this.y += scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) += scalar;
    
    return this;
  }

  public addComponents(): number {
    return this.x + this.y + (this.hasOwnProperty('z') ? this.z as number : 0);
  }

  public subtract(vector: any): any {
    this.x -= vector.x;
    this.y -= vector.y;
    if (this.hasOwnProperty('z'))
      (this.z as number) -= vector.z;
    
    return this;
  }

  public subtractScaledVector(vector: any, scalar: number): any {
    this.x -= vector.x * scalar;
    this.y -= vector.y * scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) -= vector.z * scalar;

    return this;
  }

  public subtractScalar(scalar: number): any {
    this.x -= scalar;
    this.y -= scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) -= scalar;
    
    return this;
  }

  //component product
  public multiply(vector: any): any {
    this.x *= vector.x;
    this.y *= vector.y;
    if (this.hasOwnProperty('z'))
      (this.z as number) *= vector.z;
    
    return this;
  }

  public multiplyScaledVector(vector: any, scalar: number): any {
    this.x *= vector.x * scalar;
    this.y *= vector.y * scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) *= vector.z * scalar;

    return this;
  }

  public scale(scalar: number, axis?: 'x' | 'y' | 'z'): any {
    if (!axis || axis === 'x')
      this.x *= scalar;
    if (!axis || axis === 'y')
      this.y *= scalar;
    if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
      (this.z as number) *= scalar;
    
    return this; 
  }

  public divide(vector: any): any {
    this.x /= vector.x;
    this.y /= vector.y;
    if (this.hasOwnProperty('z'))
      (this.z as number) /= vector.z;
    
    return this;
  }

  public divideScaledVector(vector: any, scalar: number): any {
    this.x /= vector.x * scalar;
    this.y /= vector.y * scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) /= vector.z * scalar;

    return this;
  }

  public divideScalar(scalar: number): any {
    this.x /= scalar;
    this.y /= scalar;
    if (this.hasOwnProperty('z'))
      (this.z as number) /= scalar;
    
    return this;
  }

  public halve(): any {
    this.x *= 0.5;
    this.y *= 0.5;
    if (this.hasOwnProperty('z'))
      (this.z as number) *= 0.5;
    
    return this;
  }

  public max(vector: any): any {
    this.x = Math.max( this.x, vector.x );
    this.y = Math.max( this.y, vector.y );
    if (this.hasOwnProperty('z'))
      this.z = Math.max( this.z as number, vector.z );
    
    return this;
  }

  public min(vector: any): any {
    this.x = Math.min( this.x, vector.x );
    this.y = Math.min( this.y, vector.y );
    if (this.hasOwnProperty('z'))
      this.z = Math.min( this.z as number, vector.z );
    
    return this;
  }

  public maxScalar(scalar: number): any {
    this.x = Math.max( this.x, scalar );
    this.y = Math.max( this.y, scalar );
    if (this.hasOwnProperty('z'))
      this.z = Math.max( this.z as number, scalar );
    
    return this;
  }

  public minScalar(scalar: number): any {
    this.x = Math.min( this.x, scalar );
    this.y = Math.min( this.y, scalar );
    if (this.hasOwnProperty('z'))
      this.z = Math.min( this.z as number, scalar );
    
    return this;
  }

  public normalize(): any {
    let length = this.getMagnitude();
    if( length && length != 1)
      this.scale(1/length);

    return this;
  }

  public absolute(axis?: 'x' | 'y' | 'z'): any {
    if (!axis || axis === 'x')
      this.x = Math.abs(this.x);
    if (!axis || axis === 'y')
      this.y = Math.abs(this.y);
    if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
      this.z = Math.abs(this.z as number);
       
    return this;
  }

  public opposite(axis?: 'x' | 'y' | 'z'): any {
    if (!axis || axis === 'x')
      this.x = -this.x;
    if (!axis || axis === 'y')
      this.y = -this.y;
    if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
      this.z = -(this.z as number);
       
    return this;
  }

  public floor(axis?: 'x' | 'y' | 'z'): any {
    if (!axis || axis === 'x')
      this.x = Math.floor(this.x);
    if (!axis || axis === 'y')
      this.y = Math.floor(this.y);
    if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
      this.z = Math.floor(this.z as number);
       
    return this;
  }

  public ceil(axis?: 'x' | 'y' | 'z'): any {
    if (!axis || axis === 'x')
      this.x = Math.ceil(this.x);
    if (!axis || axis === 'y')
      this.y = Math.ceil(this.y);
    if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
      this.z = Math.ceil(this.z as number);
       
    return this;
  }

  public dotProduct(vector: any): number { //scalar product
    return this.x * vector.x + this.y * vector.y + (this.hasOwnProperty('z') ? (this.z as number) * vector.z : 0);
  }

};