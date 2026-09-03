/*
MIT License

Copyright (c) 2011 Ludovic CLUBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/LCluber/Type6.js
*/

class Utils {
    static round(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.round(x * decimals) / decimals;
    }
    static floor(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.floor(x * decimals) / decimals;
    }
    static ceil(x, decimals) {
        decimals = Math.pow(10, decimals);
        return Math.ceil(x * decimals) / decimals;
    }
    static trunc(x, decimals) {
        decimals = Math.pow(10, decimals);
        let v = +x * decimals;
        if (!isFinite(v))
            return v;
        return ((v - v % 1) / decimals) || (v < 0 ? -0 : v === 0 ? v : 0);
    }
    static roundToNearest(x, nearest) {
        return Math.round(x / nearest) * nearest;
    }
    static mix(x, y, ratio) {
        return (1 - ratio) * x + ratio * y;
    }
    static getSign(x) {
        return x ? x < 0 ? -1 : 1 : 0;
    }
    static opposite(x) {
        return -x;
    }
    static clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    }
    static normalize(x, min, max) {
        return (x - min) / (max - min);
    }
    static lerp(min, max, amount) {
        return (max - min) * amount + min;
    }
    static map(x, sourceMin, sourceMax, destMin, destMax) {
        return this.lerp(destMin, destMax, this.normalize(x, sourceMin, sourceMax));
    }
    static isIn(x, min, max) {
        return x >= min && x <= max;
    }
    static isOut(x, min, max) {
        return x < min || x > max;
    }
}

class Trigonometry {
    static init() {
        Trigonometry.createRoundedPis();
        Trigonometry.createFactorialArray();
    }
    static createRoundedPis() {
        let decimals = 2;
        this.pi = Utils.round(Math.PI, decimals);
        this.twopi = Utils.round(Math.PI * 2, decimals);
        this.halfpi = Utils.round(Math.PI * 0.5, decimals);
    }
    static createFactorialArray() {
        let maxSin = this.sineLoops[this.sineLoops.length - 1] * 3;
        let maxCos = this.cosineLoops[this.cosineLoops.length - 1] * 2;
        for (let i = 1, f = 1; i <= Math.max(maxSin, maxCos); i++) {
            f *= this.factorial(i);
            this.factorialArray.push(f);
        }
    }
    static factorial(i) {
        return i > 1 ? (i - 1) : 1;
    }
    static setSinePrecision(value) {
        if (value >= 0 && value <= this.maxDecimals) {
            this.sineDecimals = value;
            return value;
        }
        return this.sineDecimals = this.maxDecimals;
    }
    static setCosinePrecision(value) {
        if (value >= 0 && value <= this.maxDecimals) {
            this.cosineDecimals = value;
            return value;
        }
        return this.cosineDecimals = this.maxDecimals;
    }
    static setArctanPrecision(value) {
        if (value >= 0 && value <= this.maxDecimals) {
            this.arctanDecimals = value;
            return value;
        }
        return this.arctanDecimals = this.maxDecimals;
    }
    static degreeToRadian(degree) {
        return degree * this.pi / 180;
    }
    static radianToDegree(radian) {
        return radian * 180 / this.pi;
    }
    static normalizeRadian(angle) {
        if (angle > this.pi || angle < -this.pi) {
            return angle - this.twopi * Math.floor((angle + this.pi) / this.twopi);
        }
        return angle;
    }
    static sine(angle) {
        angle = this.normalizeRadian(angle);
        if (Trigonometry.sineDecimals <= 2 && (angle < 0.28 && angle > -0.28))
            return angle;
        else
            return this.taylorSerie(3, Trigonometry.sineLoops[this.sineDecimals], angle, angle, true);
    }
    static cosine(angle) {
        angle = this.normalizeRadian(angle);
        var squaredAngle = angle * angle;
        if (this.cosineDecimals <= 2 && (angle <= 0.5 && angle >= -0.5))
            return 1 - (squaredAngle * 0.5);
        else
            return this.taylorSerie(2, Trigonometry.cosineLoops[this.cosineDecimals], 1, angle, true);
    }
    static arctan2(x, y) {
        let angle = y / x;
        if (x > 0) {
            return this.arctan(angle);
        }
        else if (x < 0) {
            if (y < 0)
                return this.arctan(angle) - this.pi;
            else
                return this.arctan(angle) + this.pi;
        }
        else {
            if (y < 0)
                return -this.halfpi;
            else if (y > 0)
                return this.halfpi;
            else
                return false;
        }
    }
    static arctan(angle) {
        let loops = Trigonometry.arctanLoops[this.arctanDecimals];
        if (angle < 1 && angle > -1)
            return this.taylorSerie(3, loops, angle, angle, false);
        else {
            if (angle >= 1) {
                angle = 1 / angle;
                return -(this.taylorSerie(3, loops, angle, angle, false) - this.halfpi);
            }
            else {
                angle = -1 / angle;
                return this.taylorSerie(3, loops, angle, angle, false) - this.halfpi;
            }
        }
    }
    static sineEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.sine(period + shiftX) + shiftY;
    }
    static cosineEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.cosine(period + shiftX) + shiftY;
    }
    static arctanEquation(amplitude, period, shiftX, shiftY) {
        return amplitude * this.arctan(period + shiftX) + shiftY;
    }
    static taylorSerie(start, max, x, angle, needFactorial) {
        let squaredAngle = angle * angle;
        let result = x;
        let denominator = 0;
        let sign = -1;
        for (let i = 0; start <= max; start += 2, i++) {
            x *= squaredAngle;
            denominator = needFactorial ? this.factorialArray[start] : start;
            result += x / denominator * sign;
            sign = Utils.opposite(sign);
        }
        return result;
    }
}
Trigonometry.sineLoops = [
    9,
    11,
    13,
    15,
    17,
    18,
    19,
    21,
    23
];
Trigonometry.cosineLoops = [
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22
];
Trigonometry.arctanLoops = [
    17,
    19,
    21,
    23,
    25,
    27,
    29,
    31,
    33
];
Trigonometry.sineDecimals = 2;
Trigonometry.cosineDecimals = 2;
Trigonometry.arctanDecimals = 2;
Trigonometry.maxDecimals = 8;
Trigonometry.factorialArray = [];
Trigonometry.init();

class Time {
    static millisecToSec(millisecond) {
        return millisecond * 0.001;
    }
    static secToMillisec(second) {
        return second * 1000;
    }
    static millisecToFps(millisecond) {
        return 1000 / millisecond;
    }
    static fpsToMillisec(refreshRate) {
        return 1000 / refreshRate;
    }
}

class Random {
    static float(min, max) {
        return min + Math.random() * (max - min);
    }
    static integer(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
    static distribution(min, max, iterations) {
        let total = 0;
        for (let i = 0; i < iterations; i++) {
            total += this.float(min, max);
        }
        return total / iterations;
    }
    static pick(value1, value2) {
        return Math.random() < 0.5 ? value1 : value2;
    }
}

class NumArray {
    static min(array) {
        return Math.min(...array);
    }
    static max(array) {
        return Math.max(...array);
    }
    static sum(array) {
        return array.reduce((a, b) => a + b, 0);
    }
    static multiply(array) {
        return array.reduce((a, b) => a * b, 0);
    }
    static average(array, length) {
        return NumArray.sum(array) / length;
    }
}

class Bezier {
    static quadratic(p0, p1, p2, t) {
        let oneMinusT = 1 - t;
        return Math.pow(oneMinusT, 2) * p0 +
            oneMinusT * 2 * t * p1 +
            t * t * p2;
    }
    static cubic(p0, p1, p2, p3, t) {
        let oneMinusT = 1 - t;
        let tByT = t * t;
        return Math.pow(oneMinusT, 3) * p0 +
            Math.pow(oneMinusT, 2) * 3 * t * p1 +
            oneMinusT * 3 * tByT * p2 +
            tByT * t * p3;
    }
}

class Vector {
    constructor() {
    }
    setScalar(x, y, z) {
        this.x = x !== null && x !== void 0 ? x : this.x;
        this.y = y !== null && y !== void 0 ? y : this.y;
        if (this.hasOwnProperty('z'))
            this.z = z !== null && z !== void 0 ? z : this.z;
        return this;
    }
    setArray(array, offset) {
        var _a, _b, _c;
        if (offset === undefined) {
            offset = 0;
        }
        this.x = (_a = array[offset]) !== null && _a !== void 0 ? _a : this.x;
        this.y = (_b = array[offset + 1]) !== null && _b !== void 0 ? _b : this.y;
        if (this.hasOwnProperty('z'))
            this.z = (_c = array[offset + 2]) !== null && _c !== void 0 ? _c : this.z;
        return this;
    }
    copy(vector) {
        var _a, _b, _c;
        this.x = (_a = vector.x) !== null && _a !== void 0 ? _a : this.x;
        this.y = (_b = vector.y) !== null && _b !== void 0 ? _b : this.y;
        if (this.hasOwnProperty('z'))
            this.z = (_c = vector.z) !== null && _c !== void 0 ? _c : this.z;
        return this;
    }
    isPositive() {
        return (this.x >= 0
            && this.y >= 0
            && (!this.hasOwnProperty('z') || this.z >= 0)) ? true : false;
    }
    isEqualTo(scalar) {
        return (this.x === scalar
            && this.y === scalar
            && (!this.hasOwnProperty('z') || this.z === scalar)) ? true : false;
    }
    isOrigin() {
        return (this.x === 0
            && this.y === 0
            && (!this.hasOwnProperty('z') || this.z === 0)) ? true : false;
    }
    toArray() {
        return Object.values(this);
    }
    toString() {
        let z = ')';
        if (this.hasOwnProperty('z'))
            z = `; z = ${this.z})`;
        return `(x = ${this.x}; y = ${this.y}${z}`;
    }
    origin() {
        this.x = 0.0;
        this.y = 0.0;
        if (this.hasOwnProperty('z'))
            this.z = 0.0;
        return this;
    }
    getMagnitude(square = false) {
        return square ? this.getSquaredMagnitude() : Math.sqrt(this.getSquaredMagnitude());
    }
    getSquaredMagnitude() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2) + (this.hasOwnProperty('z') ? Math.pow(this.z, 2) : 0);
    }
    getDistance(vector, square = false) {
        this.subtract(vector);
        const magnitude = this.getMagnitude(square);
        this.add(vector);
        return magnitude;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        if (this.hasOwnProperty('z'))
            this.z += vector.z;
        return this;
    }
    addScaledVector(vector, scalar) {
        this.x += vector.x * scalar;
        this.y += vector.y * scalar;
        if (this.hasOwnProperty('z'))
            this.z += vector.z * scalar;
        return this;
    }
    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        if (this.hasOwnProperty('z'))
            this.z += scalar;
        return this;
    }
    addComponents() {
        return this.x + this.y + (this.hasOwnProperty('z') ? this.z : 0);
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        if (this.hasOwnProperty('z'))
            this.z -= vector.z;
        return this;
    }
    subtractScaledVector(vector, scalar) {
        this.x -= vector.x * scalar;
        this.y -= vector.y * scalar;
        if (this.hasOwnProperty('z'))
            this.z -= vector.z * scalar;
        return this;
    }
    subtractScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        if (this.hasOwnProperty('z'))
            this.z -= scalar;
        return this;
    }
    multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        if (this.hasOwnProperty('z'))
            this.z *= vector.z;
        return this;
    }
    multiplyScaledVector(vector, scalar) {
        this.x *= vector.x * scalar;
        this.y *= vector.y * scalar;
        if (this.hasOwnProperty('z'))
            this.z *= vector.z * scalar;
        return this;
    }
    scale(scalar, axis) {
        if (!axis || axis === 'x')
            this.x *= scalar;
        if (!axis || axis === 'y')
            this.y *= scalar;
        if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
            this.z *= scalar;
        return this;
    }
    divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        if (this.hasOwnProperty('z'))
            this.z /= vector.z;
        return this;
    }
    divideScaledVector(vector, scalar) {
        this.x /= vector.x * scalar;
        this.y /= vector.y * scalar;
        if (this.hasOwnProperty('z'))
            this.z /= vector.z * scalar;
        return this;
    }
    divideScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        if (this.hasOwnProperty('z'))
            this.z /= scalar;
        return this;
    }
    halve() {
        this.x *= 0.5;
        this.y *= 0.5;
        if (this.hasOwnProperty('z'))
            this.z *= 0.5;
        return this;
    }
    max(vector) {
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        if (this.hasOwnProperty('z'))
            this.z = Math.max(this.z, vector.z);
        return this;
    }
    min(vector) {
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        if (this.hasOwnProperty('z'))
            this.z = Math.min(this.z, vector.z);
        return this;
    }
    maxScalar(scalar) {
        this.x = Math.max(this.x, scalar);
        this.y = Math.max(this.y, scalar);
        if (this.hasOwnProperty('z'))
            this.z = Math.max(this.z, scalar);
        return this;
    }
    minScalar(scalar) {
        this.x = Math.min(this.x, scalar);
        this.y = Math.min(this.y, scalar);
        if (this.hasOwnProperty('z'))
            this.z = Math.min(this.z, scalar);
        return this;
    }
    normalize() {
        let length = this.getMagnitude();
        if (length && length != 1)
            this.scale(1 / length);
        return this;
    }
    absolute(axis) {
        if (!axis || axis === 'x')
            this.x = Math.abs(this.x);
        if (!axis || axis === 'y')
            this.y = Math.abs(this.y);
        if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
            this.z = Math.abs(this.z);
        return this;
    }
    opposite(axis) {
        if (!axis || axis === 'x')
            this.x = -this.x;
        if (!axis || axis === 'y')
            this.y = -this.y;
        if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
            this.z = -this.z;
        return this;
    }
    floor(axis) {
        if (!axis || axis === 'x')
            this.x = Math.floor(this.x);
        if (!axis || axis === 'y')
            this.y = Math.floor(this.y);
        if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
            this.z = Math.floor(this.z);
        return this;
    }
    ceil(axis) {
        if (!axis || axis === 'x')
            this.x = Math.ceil(this.x);
        if (!axis || axis === 'y')
            this.y = Math.ceil(this.y);
        if (this.hasOwnProperty('z') && (!axis || axis === 'z'))
            this.z = Math.ceil(this.z);
        return this;
    }
    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y + (this.hasOwnProperty('z') ? this.z * vector.z : 0);
    }
}

class Vector2 extends Vector {
    constructor(x, y) {
        super();
        this.x = 0.0;
        this.y = 0.0;
        this.setScalar(x, y);
    }
    setRadian(angle) {
        if (angle) {
            let length = this.getMagnitude();
            this.x = Trigonometry.cosine(angle) * length;
            this.y = Trigonometry.sine(angle) * length;
        }
        return this;
    }
    setDegree(angle) {
        if (angle) {
            angle = Trigonometry.degreeToRadian(angle);
            this.setRadian(angle);
        }
        return this;
    }
    setMinAxis(scalar) {
        if (this.y < this.x)
            this.y = scalar;
        else
            this.x = scalar;
        return this;
    }
    setMaxAxis(scalar) {
        if (this.y > this.x)
            this.y = scalar;
        else
            this.x = scalar;
        return this;
    }
    setOppositeAxis(axis, value) {
        if (axis === 'y')
            this.x = value;
        else
            this.y = value;
        return this;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    getAngle() {
        return Trigonometry.arctan2(this.y, this.x);
    }
    quadraticBezier(p0, p1, p2, t) {
        this.x = Bezier.quadratic(p0.x, p1.x, p2.x, t);
        this.y = Bezier.quadratic(p0.y, p1.y, p2.y, t);
        return this;
    }
    cubicBezier(p0, p1, p2, p3, t) {
        this.x = Bezier.cubic(p0.x, p1.x, p2.x, p3.x, t);
        this.y = Bezier.cubic(p0.y, p1.y, p2.y, p3.y, t);
        return this;
    }
    getMaxAxis() {
        return (this.y > this.x) ? 'y' : 'x';
    }
    getMinAxis() {
        return (this.y < this.x) ? 'y' : 'x';
    }
    clamp(rectangle) {
        this.x = Utils.clamp(this.x, rectangle.topLeftCorner.x, rectangle.bottomRightCorner.x);
        this.y = Utils.clamp(this.y, rectangle.topLeftCorner.y, rectangle.bottomRightCorner.y);
        return this;
    }
    lerp(min, max, amount) {
        this.x = Utils.lerp(min.x, max.x, amount);
        this.y = Utils.lerp(min.y, max.y, amount);
        return this;
    }
}

class Circle {
    constructor(radius, positionX, positionY, grid) {
        this.gridCells = [0, 0, 0, 0];
        this.shape = 'circle';
        this._radius = 0.0;
        this._diameter = 0.0;
        this.position = new Vector2(positionX, positionY);
        this.radius = radius;
        this.grid = grid || null;
        this.cellTlc = new Vector2();
        this.cellBrc = new Vector2();
        this.setGridPos();
    }
    set radius(radius) {
        this._radius = radius;
        this._diameter = this._radius * 2;
    }
    get radius() {
        return this._radius;
    }
    set diameter(diameter) {
        this._diameter = diameter;
        this._radius = this._diameter * 0.5;
    }
    get diameter() {
        return this._diameter;
    }
    clone() {
        return new Circle(this.radius, this.position.x, this.position.y, this.grid);
    }
    copy(circle) {
        this.position.copy(circle.position);
        this.radius = circle.radius;
        return this;
    }
    setPosition(positionX, positionY) {
        this.position.setScalar(positionX, positionY);
        this.setGridPos();
        return this;
    }
    setRadius(radius) {
        this.radius = radius;
        this.setGridPos();
        return this;
    }
    setDiameter(diameter) {
        this.diameter = diameter;
        return this;
    }
    scale(scalar) {
        this.radius *= scalar;
        return this;
    }
    isIn(v) {
        return v.getDistance(this.position, true) <= this.radius * this.radius;
    }
    draw(context, fillColor, strokeColor, strokeWidth) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Trigonometry.twopi, false);
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
    setGridPos() {
        if (this.grid) {
            const size = this.grid.cellSize;
            const colLen = this.grid.len.x;
            const sizeInv = 1 / size;
            this.cellTlc.copy(this.position).subtractScalar(this.radius).scale(sizeInv).floor().scale(colLen, 'y');
            this.cellBrc.copy(this.position).addScalar(this.radius).scale(sizeInv).floor().scale(colLen, 'y');
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
}

class Rectangle {
    constructor(width, height, positionX, positionY, grid) {
        this.gridCells = [0, 0, 0, 0];
        this.shape = 'aabb';
        this.position = new Vector2(positionX, positionY);
        this.size = new Vector2(width, height);
        this.halfSize = new Vector2();
        this.topLeftCorner = new Vector2();
        this.bottomRightCorner = new Vector2();
        this.grid = grid || null;
        this.cellTlc = new Vector2();
        this.cellBrc = new Vector2();
        this.setHalfSize();
        this.setCorners();
        this.setGridPos();
    }
    clone() {
        return new Rectangle(this.size.x, this.size.y, this.position.x, this.position.y, this.grid);
    }
    copy(rectangle) {
        this.setSize(rectangle.size.x, rectangle.size.y);
        this.setPosition(rectangle.position.x, rectangle.position.y);
        return this;
    }
    setPosition(positionX, positionY) {
        this.position.setScalar(positionX, positionY);
        this.setCorners();
        this.setGridPos();
    }
    setSize(width, height) {
        this.size.setScalar(width, height);
        this.setHalfSize();
        this.setCorners();
        this.setGridPos();
    }
    isIn(vector) {
        return (Utils.isIn(vector.x, this.topLeftCorner.x, this.bottomRightCorner.x)
            && Utils.isIn(vector.y, this.topLeftCorner.y, this.bottomRightCorner.y));
    }
    draw(context, fillColor, strokeColor, strokeWidth) {
        context.beginPath();
        context.rect(this.topLeftCorner.x, this.topLeftCorner.y, this.size.x, this.size.y);
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
    setCorners() {
        this.topLeftCorner.copy(this.position).subtract(this.halfSize);
        this.bottomRightCorner.copy(this.position).add(this.halfSize);
    }
    setHalfSize() {
        this.halfSize.copy(this.size).halve();
    }
    setGridPos() {
        if (this.grid) {
            const size = this.grid.cellSize;
            const colLen = this.grid.len.x;
            const sizeInv = 1 / size;
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
}

class Grid {
    constructor(width, height, cellSize) {
        this.cellSize = cellSize;
        const lenX = Math.ceil(width / cellSize);
        const lenY = Math.ceil(height / cellSize);
        this.len = new Vector2(lenX, lenY);
    }
    draw() {
    }
}

class Vector3 extends Vector {
    constructor(x, y, z) {
        super();
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.setScalar(x, y, z);
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    cross(v) {
        let x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }
}

class Matrix3x3 {
    constructor(x1, x2, x3, y1, y2, y3, t1, t2, t3) {
        this.m = new Float32Array(9);
        this.make(x1, x2, x3, y1, y2, y3, t1, t2, t3);
    }
    make(x1, x2, x3, y1, y2, y3, t1, t2, t3) {
        this.m[0] = x1 || 0.0;
        this.m[1] = x2 || 0.0;
        this.m[2] = x3 || 0.0;
        this.m[3] = y1 || 0.0;
        this.m[4] = y2 || 0.0;
        this.m[5] = y3 || 0.0;
        this.m[6] = t1 || 0.0;
        this.m[7] = t2 || 0.0;
        this.m[8] = t3 || 0.0;
    }
    copy(matrix3x3) {
        let m = matrix3x3.m;
        this.make(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]);
        return this;
    }
    toArray() {
        return this.m;
    }
    toString() {
        return '(' + this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ';' +
            this.m[3] + ',' + this.m[4] + ',' + this.m[5] + ';' +
            this.m[6] + ',' + this.m[7] + ',' + this.m[8] + ')';
    }
    identity() {
        this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    scale(vector2) {
        this.make(vector2.x, 0.0, 0.0, 0.0, vector2.y, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    rotate(angle) {
        var cos = Trigonometry.cosine(angle);
        var sin = Trigonometry.sine(angle);
        this.make(cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    translate(vector2) {
        this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, vector2.x, vector2.y, 1.0);
        return this;
    }
    multiply(matrix3x3) {
        let m1 = this.m;
        let m2 = matrix3x3.m;
        this.make(m1[0] * m2[0] + m1[3] * m2[1] + m1[6] * m2[2], m1[1] * m2[0] + m1[4] * m2[1] + m1[7] * m2[2], m1[2] * m2[0] + m1[5] * m2[1] + m1[8] * m2[2], m1[0] * m2[3] + m1[3] * m2[4] + m1[6] * m2[5], m1[1] * m2[3] + m1[4] * m2[4] + m1[7] * m2[5], m1[2] * m2[3] + m1[5] * m2[4] + m1[8] * m2[5], m1[0] * m2[6] + m1[3] * m2[7] + m1[6] * m2[8], m1[1] * m2[6] + m1[4] * m2[7] + m1[7] * m2[8], m1[2] * m2[6] + m1[5] * m2[7] + m1[8] * m2[8]);
        return this;
    }
}

class Matrix4x3 {
    constructor(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3) {
        this.m = new Float32Array(16);
        this.xAxis = new Vector3();
        this.yAxis = new Vector3();
        this.zAxis = new Vector3();
        this.make(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3);
    }
    make(x1, x2, x3, y1, y2, y3, z1, z2, z3, t1, t2, t3) {
        this.m[0] = x1 || 0.0;
        this.m[1] = x2 || 0.0;
        this.m[2] = x3 || 0.0;
        this.m[3] = 0.0;
        this.m[4] = y1 || 0.0;
        this.m[5] = y2 || 0.0;
        this.m[6] = y3 || 0.0;
        this.m[7] = 0.0;
        this.m[8] = z1 || 0.0;
        this.m[9] = z2 || 0.0;
        this.m[10] = z3 || 0.0;
        this.m[11] = 0.0;
        this.m[12] = t1 || 0.0;
        this.m[13] = t2 || 0.0;
        this.m[14] = t3 || 0.0;
        this.m[15] = 1.0;
    }
    copy(matrix4x3) {
        let m = matrix4x3.m;
        this.make(m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10], m[12], m[13], m[14]);
        return this;
    }
    toArray() {
        return this.m;
    }
    toString() {
        return '('
            + this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ',' + this.m[3] + ';'
            + this.m[4] + ',' + this.m[5] + ',' + this.m[6] + ',' + this.m[7] + ';'
            + this.m[8] + ',' + this.m[9] + ',' + this.m[10] + ',' + this.m[11] + ';'
            + this.m[12] + ',' + this.m[13] + ',' + this.m[14] + ',' + this.m[15] + ')';
    }
    identity() {
        this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0);
        return this;
    }
    scale(vector3) {
        this.make(vector3.x, 0.0, 0.0, 0.0, vector3.y, 0.0, 0.0, 0.0, vector3.z, 0.0, 0.0, 0.0);
        return this;
    }
    rotateX(angle) {
        var cos = Trigonometry.cosine(angle);
        var sin = Trigonometry.sine(angle);
        this.make(1.0, 0.0, 0.0, 0.0, cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0);
        return this;
    }
    rotateY(angle) {
        var cos = Trigonometry.cosine(angle);
        var sin = Trigonometry.sine(angle);
        this.make(cos, 0.0, -sin, 0.0, 1.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0);
        return this;
    }
    rotateZ(angle) {
        var cos = Trigonometry.cosine(angle);
        var sin = Trigonometry.sine(angle);
        this.make(cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0);
        return this;
    }
    translate(vector3) {
        this.make(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, vector3.x, vector3.y, vector3.z);
        return this;
    }
    multiply(matrix4x3) {
        let m1 = this.m;
        let m2 = matrix4x3.m;
        this.make(m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2], m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2], m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2], m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6], m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6], m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6], m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10], m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10], m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10], m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12], m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13], m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14]);
        return this;
    }
    lookAtRH(eye, target, up) {
        this.zAxis.copy(eye).subtract(target).normalize();
        this.xAxis.copy(up).cross(this.zAxis).normalize();
        this.yAxis.copy(this.zAxis).cross(this.xAxis);
        this.make(this.xAxis.x, this.yAxis.x, this.zAxis.x, this.xAxis.y, this.yAxis.y, this.zAxis.y, this.xAxis.z, this.yAxis.z, this.zAxis.z, -this.xAxis.dotProduct(eye), -this.yAxis.dotProduct(eye), -this.zAxis.dotProduct(eye));
        return this;
    }
}

class Matrix4x4 {
    constructor(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4) {
        this.m = new Float32Array(16);
        this.make(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4);
    }
    make(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, t1, t2, t3, t4) {
        this.m[0] = x1 || 0.0;
        this.m[1] = x2 || 0.0;
        this.m[2] = x3 || 0.0;
        this.m[3] = x4 || 0.0;
        this.m[4] = y1 || 0.0;
        this.m[5] = y2 || 0.0;
        this.m[6] = y3 || 0.0;
        this.m[7] = y4 || 0.0;
        this.m[8] = z1 || 0.0;
        this.m[9] = z2 || 0.0;
        this.m[10] = z3 || 0.0;
        this.m[11] = z4 || 0.0;
        this.m[12] = t1 || 0.0;
        this.m[13] = t2 || 0.0;
        this.m[14] = t3 || 0.0;
        this.m[15] = t4 || 0.0;
    }
    copy(matrix4x4) {
        let m = matrix4x4.m;
        this.make(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]);
        return this;
    }
    toArray() {
        return this.m;
    }
    toString() {
        return '('
            + this.m[0] + ',' + this.m[1] + ',' + this.m[2] + ',' + this.m[3] + ';'
            + this.m[4] + ',' + this.m[5] + ',' + this.m[6] + ',' + this.m[7] + ';'
            + this.m[8] + ',' + this.m[9] + ',' + this.m[10] + ',' + this.m[11] + ';'
            + this.m[12] + ',' + this.m[13] + ',' + this.m[14] + ',' + this.m[15] + ')';
    }
    identity() {
        this.make(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    scale(vector3) {
        this.make(vector3.x, 0.0, 0.0, 0.0, 0.0, vector3.y, 0.0, 0.0, 0.0, 0.0, vector3.z, 0.0, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    rotateX(angle) {
        let cos = Trigonometry.cosine(angle);
        let sin = Trigonometry.sine(angle);
        this.make(1.0, 0.0, 0.0, 0.0, 0.0, cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    rotateY(angle) {
        let cos = Trigonometry.cosine(angle);
        let sin = Trigonometry.sine(angle);
        this.make(cos, 0.0, -sin, 0.0, 0.0, 1.0, 0.0, 0.0, sin, 0.0, cos, 0.0, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    rotateZ(angle) {
        let cos = Trigonometry.cosine(angle);
        let sin = Trigonometry.sine(angle);
        this.make(cos, sin, 0.0, 0.0, -sin, cos, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
        return this;
    }
    translate(vector3) {
        this.make(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, vector3.x, vector3.y, vector3.z, 1.0);
        return this;
    }
    multiply(matrix4x4) {
        let m1 = this.m;
        let m2 = matrix4x4.m;
        this.make(m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2], m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2], m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2], 0.0, m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6], m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6], m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6], 0.0, m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10], m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10], m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10], 0.0, m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12], m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13], m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14], 1.0);
        return this;
    }
    perspective(fovy, aspect, znear, zfar) {
        let f = Math.tan(Trigonometry.halfpi - 0.5 * fovy * Trigonometry.pi / 180);
        let rangeInv = 1.0 / (znear - zfar);
        this.make(f / aspect, 0.0, 0.0, 0.0, 0.0, f, 0.0, 0.0, 0.0, 0.0, (znear + zfar) * rangeInv, -1.0, 0.0, 0.0, znear * zfar * rangeInv * 2, 0.0);
        return this;
    }
    orthographic(left, right, top, bottom, near, far) {
        var w = right - left;
        var h = top - bottom;
        var p = far - near;
        var x = (right + left) / w;
        var y = (top + bottom) / h;
        var z = (far + near) / p;
        this.make(2 / w, 0.0, 0.0, 0.0, 0.0, 2 / h, 0.0, 0.0, 0.0, 0.0, -2 / p, 0.0, -x, -y, -z, 1.0);
        return this;
    }
}

export { Bezier, Circle, Grid, Matrix3x3, Matrix4x3, Matrix4x4, NumArray, Random, Rectangle, Time, Trigonometry, Utils, Vector2, Vector3 };
