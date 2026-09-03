export declare class NumArray {
    static min(array: number[]): number;
    static max(array: number[]): number;
    static sum(array: number[]): number;
    static multiply(array: number[]): number;
    static average(array: number[], length: number): number;
}
export declare class Bezier {
    static quadratic(p0: number, p1: number, p2: number, t: number): number;
    static cubic(p0: number, p1: number, p2: number, p3: number, t: number): number;
}

export declare class Circle {
    position: Vector2;
    private _radius;
    private _diameter;
    readonly shape: 'circle';
    constructor(radius: number, positionX: number, positionY: number);
    set radius(radius: number);
    get radius(): number;
    set diameter(diameter: number);
    get diameter(): number;
    clone(): Circle;
    copy(circle: Circle): Circle;
    setPosition(positionX: number, positionY: number): this;
    setRadius(radius: number): this;
    setDiameter(diameter: number): this;
    scale(scalar: number): Circle;
    isIn(v: Vector2): boolean;
    draw(context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number): void;
}


export declare class Rectangle {
    position: Vector2;
    topLeftCorner: Vector;
    bottomRightCorner: Vector;
    size: Vector2;
    halfSize: Vector2;
    readonly shape: 'aabb';
    constructor(width: number, height: number, positionX: number, positionY: number);
    clone(): Rectangle;
    copy(rectangle: Rectangle): Rectangle;
    setPosition(positionX: number, positionY: number): void;
    setSize(width: number, height: number): void;
    isIn(vector: Vector2): boolean;
    draw(context: CanvasRenderingContext2D, fillColor: string, strokeColor: string, strokeWidth: number): void;
    private setCorners;
    private setHalfSize;
}

export declare class Matrix3x3 {
    private m;
    constructor(x1?: number, x2?: number, x3?: number, y1?: number, y2?: number, y3?: number, t1?: number, t2?: number, t3?: number);
    private make;
    copy(matrix3x3: Matrix3x3): Matrix3x3;
    toArray(): Float32Array;
    toString(): string;
    identity(): Matrix3x3;
    scale(vector2: Vector2): Matrix3x3;
    rotate(angle: number): Matrix3x3;
    translate(vector2: Vector2): Matrix3x3;
    multiply(matrix3x3: Matrix3x3): Matrix3x3;
}

export declare class Matrix4x3 {
    private m;
    private xAxis;
    private yAxis;
    private zAxis;
    constructor(x1?: number, x2?: number, x3?: number, y1?: number, y2?: number, y3?: number, z1?: number, z2?: number, z3?: number, t1?: number, t2?: number, t3?: number);
    private make;
    copy(matrix4x3: Matrix4x3): Matrix4x3;
    toArray(): Float32Array;
    toString(): string;
    identity(): Matrix4x3;
    scale(vector3: Vector3): Matrix4x3;
    rotateX(angle: number): Matrix4x3;
    rotateY(angle: number): Matrix4x3;
    rotateZ(angle: number): Matrix4x3;
    translate(vector3: Vector3): Matrix4x3;
    multiply(matrix4x3: Matrix4x3): Matrix4x3;
    lookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix4x3;
}

export declare class Matrix4x4 {
    private m;
    constructor(x1?: number, x2?: number, x3?: number, x4?: number, y1?: number, y2?: number, y3?: number, y4?: number, z1?: number, z2?: number, z3?: number, z4?: number, t1?: number, t2?: number, t3?: number, t4?: number);
    private make;
    copy(matrix4x4: Matrix4x4): Matrix4x4;
    toArray(): Float32Array;
    toString(): string;
    identity(): Matrix4x4;
    scale(vector3: Vector3): Matrix4x4;
    rotateX(angle: number): Matrix4x4;
    rotateY(angle: number): Matrix4x4;
    rotateZ(angle: number): Matrix4x4;
    translate(vector3: Vector3): Matrix4x4;
    multiply(matrix4x4: Matrix4x4): Matrix4x4;
    perspective(fovy: number, aspect: number, znear: number, zfar: number): Matrix4x4;
    orthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): Matrix4x4;
}

export declare class Quaternion {
    angle: number;
    vector: Vector3;
    private vCv1;
    private vCv2;
    private v;
    constructor(angle: number, vector: Vector3);
    toString(): string;
    copy(q: Quaternion): Quaternion;
    conjugate(): Quaternion;
    multiply(q: Quaternion): Quaternion;
    multiplyVector(vector: Vector3): Vector3;
}
export declare class Random {
    static float(min: number, max: number): number;
    static integer(min: number, max: number): number;
    static distribution(min: number, max: number, iterations: number): number;
    static pick(value1: number, value2: number): number;
}
export declare class Time {
    static millisecToSec(millisecond: number): number;
    static secToMillisec(second: number): number;
    static millisecToFps(millisecond: number): number;
    static fpsToMillisec(refreshRate: number): number;
}
export declare class Trigonometry {
    static readonly sineLoops: number[];
    static readonly cosineLoops: number[];
    static readonly arctanLoops: number[];
    static pi: number;
    static twopi: number;
    static halfpi: number;
    private static sineDecimals;
    private static cosineDecimals;
    private static arctanDecimals;
    private static maxDecimals;
    private static factorialArray;
    static init(): void;
    private static createRoundedPis;
    private static createFactorialArray;
    private static factorial;
    static setSinePrecision(value: number): number;
    static setCosinePrecision(value: number): number;
    static setArctanPrecision(value: number): number;
    static degreeToRadian(degree: number): number;
    static radianToDegree(radian: number): number;
    static normalizeRadian(angle: number): number;
    static sine(angle: number): number;
    static cosine(angle: number): number;
    static arctan2(x: number, y: number): number | false;
    static arctan(angle: number): number;
    static sineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number;
    static cosineEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number;
    static arctanEquation(amplitude: number, period: number, shiftX: number, shiftY: number): number;
    private static taylorSerie;
}


export declare class Utils {
    static round(x: number, decimals: number): number;
    static floor(x: number, decimals: number): number;
    static ceil(x: number, decimals: number): number;
    static trunc(x: number, decimals: number): number;
    static roundToNearest(x: number, nearest: number): number;
    static mix(x: number, y: number, ratio: number): number;
    static getSign(x: number): number;
    static opposite(x: number): number;
    static clamp(x: number, min: number, max: number): number;
    static normalize(x: number, min: number, max: number): number;
    static lerp(min: number, max: number, amount: number): number;
    static map(x: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number;
    static isIn(x: number, min: number, max: number): boolean;
    static isOut(x: number, min: number, max: number): boolean;
}
export interface Vector {
    'x': number;
    'y': number;
    'z'?: number;
    [key: string]: any;
}
export declare class Vector {
    constructor();
    setScalar(x?: number | null, y?: number | null, z?: number | null): any;
    setArray(array: number[], offset?: number): any;
    copy(vector: Vector): any;
    isPositive(): boolean;
    isEqualTo(scalar: number): boolean;
    isOrigin(): boolean;
    toArray(): number[];
    toString(): string;
    origin(): any;
    getMagnitude(square?: boolean): number;
    getDistance(vector: any, square?: boolean): number;
    add(vector: any): any;
    addScaledVector(vector: any, scalar: number): any;
    addScalar(scalar: number): any;
    addComponents(): number;
    subtract(vector: any): any;
    subtractScaledVector(vector: any, scalar: number): any;
    subtractScalar(scalar: number): any;
    multiply(vector: any): any;
    multiplyScaledVector(vector: any, scalar: number): any;
    scale(scalar: number): any;
    divide(vector: any): any;
    divideScaledVector(vector: any, scalar: number): any;
    divideScalar(scalar: number): any;
    halve(): any;
    max(vector: any): any;
    min(vector: any): any;
    maxScalar(scalar: number): any;
    minScalar(scalar: number): any;
    normalize(): any;
    absolute(axis?: 'x' | 'y' | 'z'): any;
    opposite(axis?: 'x' | 'y' | 'z'): any;
    dotProduct(vector: any): number;
}


export declare class Vector2 extends Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    setRadian(angle: number): Vector2;
    setDegree(angle: number): Vector2;
    setMinAxis(scalar: number): Vector2;
    setMaxAxis(scalar: number): Vector2;
    setOppositeAxis(axis: 'x' | 'y', value: number): Vector2;
    clone(): Vector2;
    getAngle(): number | false;
    quadraticBezier(p0: Vector2, p1: Vector2, p2: Vector2, t: number): Vector2;
    cubicBezier(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, t: number): Vector2;
    getMaxAxis(): 'x' | 'y';
    getMinAxis(): 'x' | 'y';
    clamp(rectangle: Rectangle): Vector2;
    lerp(min: Vector2, max: Vector2, amount: number): Vector2;
}

export declare class Vector3 extends Vector {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    clone(): Vector3;
    cross(v: Vector3): Vector3;
}