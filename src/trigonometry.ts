// import { Vector2 } from './vectors/vector2';
import { Utils } from './utils';

export class Trigonometry {

  static readonly sineLoops: number[] = [
    //number of loops needed to get x decimals precision on full circle
    9,//gives 0 decimals precision on full circle
    11,//gives 1 decimals precision on full circle
    13,//gives 2 decimals precision on full circle
    15,//gives 3 decimals precision on full circle
    17,//gives 4 decimals precision on full circle
    18,//gives 5 decimals precision on full circle
    19,//gives 6 decimals precision on full circle
    21,//gives 7 decimals precision on full circle
    23//gives 8 decimals precision on full circle
  ];

  static readonly cosineLoops: number[] = [
    //number of loops needed to get x decimals precision on full circle
    6,//gives 0 decimals precision on full circle
    8,//gives 1 decimals precision on full circle
    10,//gives 2 decimals precision on full circle
    12,//gives 3 decimals precision on full circle
    14,//gives 4 decimals precision on full circle
    16,//gives 5 decimals precision on full circle
    18,//gives 6 decimals precision on full circle
    20,//gives 7 decimals precision on full circle
    22//gives 8 decimals precision on full circle
  ];

  static readonly arctanLoops: number[] = [
    //number of loops needed to get x decimals precision on full circle
    17,//gives 0 decimals precision on full circle
    19,//gives 1 decimals precision on full circle
    21,//gives 2 decimals precision on full circle
    23,//gives 3 decimals precision on full circle
    25,//gives 4 decimals precision on full circle
    27,//gives 5 decimals precision on full circle
    29,//gives 6 decimals precision on full circle
    31,//gives 7 decimals precision on full circle
    33//gives 8 decimals precision on full circle
  ];

  static pi: number; //3.1415926535897932384626433832795
  static twopi: number; //6.283185307179586
  static halfpi: number; //1.57079632679

  private static sineDecimals: number = 2;
  private static cosineDecimals: number = 2;
  private static arctanDecimals : number = 2;
  private static maxDecimals : number = 8;
  private static factorialArray: number[] = [];

  static init(){
    Trigonometry.createRoundedPis();
    Trigonometry.createFactorialArray();
  }

  private static createRoundedPis(){
    let decimals = 2;
    this.pi = Utils.round( Math.PI, decimals ); //3.1415926535897932384626433832795
    this.twopi = Utils.round( Math.PI * 2, decimals ); //6.283185307179586
    this.halfpi = Utils.round( Math.PI * 0.5, decimals ); //1.57079632679
  }

  private static  createFactorialArray(): void {
    let maxSin = this.sineLoops[this.sineLoops.length-1]*3;
    let maxCos = this.cosineLoops[this.cosineLoops.length-1]*2;
    for( let i = 1, f = 1 ; i <= Math.max(maxSin,maxCos) ; i++ ){
      f *= this.factorial(i);
      this.factorialArray.push(f);
    }
  }

  /**
  * this function is optimised to create the factorial array used to estimate sines and cosines. It's not safe or practical to use it outside */
  private static  factorial( i: number ): number {
    return i > 1 ? ( i - 1 ) : 1 ;
  }

  static setSinePrecision(value: number): number {
    if(value >= 0 && value <= this.maxDecimals) {
      this.sineDecimals = value;
      return value;
    }
    return this.sineDecimals = this.maxDecimals;
  }

  static setCosinePrecision(value: number): number {
    if(value >= 0 && value <= this.maxDecimals) {
      this.cosineDecimals = value;
      return value;
    }
    return this.cosineDecimals = this.maxDecimals;
  }

  static setArctanPrecision(value: number): number {
    if(value >= 0 && value <= this.maxDecimals) {
      this.arctanDecimals = value;
      return value;
    }
    return this.arctanDecimals = this.maxDecimals;
  }

  static degreeToRadian( degree: number ): number {
    return degree * this.pi / 180;
  }

  static radianToDegree( radian: number ): number {
    return radian * 180 / this.pi;
  }

  /**
  * normalizes an angle in radians between -Pi an Pi
  * http://commons.apache.org/proper/commons-math/apidocs/src-html/org/apache/commons/math3/util/MathUtils.html#line.90
  */
  static normalizeRadian(angle: number): number {
    //console.log(angle);
    if ( angle > this.pi || angle < -this.pi )
      return angle - this.twopi * Math.floor((angle + this.pi) / this.twopi);
  
    return angle;
  }

  /**
  * find the sine of an angle
  * https://en.wikipedia.org/wiki/Taylor_series
  */
  static sine( angle: number ): number {//estim sine
    //x - (1/3!)x3 + (1/5!)x5 - (1/7!)x7
    angle = this.normalizeRadian(angle);
    if( Trigonometry.sineDecimals <= 2 && (angle < 0.28 && angle > -0.28) )
      return angle;
    
    return this.taylorSerie(3, Trigonometry.sineLoops[this.sineDecimals], angle, angle, true);
  }

  /**
  * find the cosine of an angle
  * https://en.wikipedia.org/wiki/Taylor_series
  */
  static cosine( angle: number ): number {//estim cosine
    //1 - (1/2!)x2 + (1/4!)x4 - (1/6!)x6
    angle = this.normalizeRadian(angle);
    var squaredAngle = angle * angle;
    if( this.cosineDecimals <= 2 && (angle <= 0.5 && angle >= -0.5) )
      return 1 - ( squaredAngle * 0.5 );
    
    return this.taylorSerie(2, Trigonometry.cosineLoops[this.cosineDecimals], 1, angle, true);
  }

  /**
  * Estimate arctangent on four quadrants
  * https://en.wikipedia.org/wiki/Atan2
  */
  static arctan2(x:number, y:number): number|false {
    let angle = y/x;
    if (x > 0) {
      return this.arctan(angle);
    } else if (x < 0) {
      if (y < 0)
        return this.arctan(angle) - this.pi;
      else
        return this.arctan(angle) + this.pi;

    }else { // x = 0
      if (y < 0)
        return - this.halfpi;
      else if (y > 0 )
        return this.halfpi;
      else //y = 0
        return false;
      
    }
  }

  /**
  * Estimate arctangent from an angle on 2 quadrants
  * http://myweb.lmu.edu/hmedina/Papers/ReprintMonthly156-161-medina.pdf
  */
  static arctan(angle: number): number {
    //x−x3/3+x5/5−x7/7+ for -1 < x < 1
    let loops = Trigonometry.arctanLoops[this.arctanDecimals];
    if(angle < 1 && angle > -1)
      return this.taylorSerie(3, loops, angle, angle, false);
    else {
      //- arctan (x) = actan (1/x) - pi/2
      if(angle >= 1) {
        angle = 1/angle;
        return - (this.taylorSerie(3, loops, angle, angle, false) - this.halfpi);
      } else {
        angle = -1/angle;
        return this.taylorSerie(3, loops, angle, angle, false) - this.halfpi;
      }
    }
  }

  /**
  * Sine equation
  */
  static sineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number {
    return amplitude * this.sine( period + shiftX ) + shiftY;
  }

  /**
  * cosine equation.
  */
  static cosineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number {
    return amplitude * this.cosine( period + shiftX ) + shiftY;
  }

  /**
  * arctangent equation
  */
  static arctanEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number {
    return amplitude * this.arctan( period + shiftX ) + shiftY;
  }

  /**
  * This function is used to estimate sines, cosines and arctangent and should not be used outside of this.
  * https://en.wikipedia.org/wiki/Taylor_series
  */
  private static taylorSerie(start: number, max: number, x: number, angle: number, needFactorial: boolean): number {
    let squaredAngle  = angle * angle;
    let result        = x;
    let denominator   = 0;
    let sign          = -1;
    for(let i = 0 ; start <= max ; start += 2, i++) {
      x            *= squaredAngle;
      denominator   = needFactorial ? this.factorialArray[start] : start ;
      result       += x / denominator * sign;
      sign          = Utils.opposite(sign);
    }
    return result;
  }

}
Trigonometry.init();
//console.log(TYPE6.Trigonometry.factorialArray);


// function radi(a){//radian
//     return ro(a*0.0174,2);
// }
// function facto(a){return a>1?a*facto(a-1):1;}



// function rcar2(a){
// 	if(a){
// 		for(var i=0,b=a*0.5;i<10;i++)b=0.5*(b+a/b);
// 		return ro(b,2);
// 	}else return 0;
// }
