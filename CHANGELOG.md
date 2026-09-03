
Version 3.1.0 (October 10th 2023)
-----------------------------
 * Vector class:
    * Add Floor() method
    * Add Ceil() method
    * Add axis parameter to scale method to select which axis to scale
    * Add addComponents() method
 * Grid class:
    * Add grid geometry class which creates a grid divided in x cells of size y on a given space size
 * Circle class:
    * Add grid parameter in order to pass a grid into which the circle will be positioned
 * Rectangle class:
    * Add grid parameter in order to pass a grid into which the rectangle will be positioned

Version 3.0.0 (May 18th 2021)
-----------------------------
 * Vector class:
    * Fix Vector opposite method
    * improved performances
 * Vector2 class:
    * Add setScalar(), setArray(), isEqualTo(), setRadian(), setDegree(), setMinAxis(), setMaxAxis() methods
    * Delete set(), clone(), setFromArray() and setFromAngle() methods
    * opposite() and absolute() methods now accept an axis name as parameter to set only this axis.
 * Vector3 class:
    * Add setScalar(), setArray() and isEqualTo() method
    * Delete set(), setFromArray() and clone() methods
 * Circle class:
    * First parameter of set() method and constructor is now Radius.
    * Delete set(), setPositionXY() and setPositionFromVector() methods 
    * Add setPosition(), setRadius() and setDiameter() methods
 * Rectangle class:
    * First parameters of constructor are now width and height.
    * delete setPositionXY(), setPositionX(), setPositionFromVector() and setPositionY() methods
    * delete set(), setSizeXY(), setSizeX(), setSizeFromVector() and setSizeY() methods

Version 2.2.0 (September 06th 2020)
-----------------------------
 * Export Type6 as CommonJS module
 * Update Typescript to version 4
 * Automated Unit tests with Jest

Version 2.1.1 (August 30th 2020)
-----------------------------
 * Smaller package size
 * Vector Classes refactor

Version 2.1.0 (Augulst 29th 2020)
-----------------------------
 * Vector2 and Vector3 classes: 
    * delete setFromArray() method

Version 2.0.1 (May 13th 2020)
-----------------------------
 * Matrix4x3 class:
    * fix lookAtRH() method in 

Version 2.0.0 (May 09th 2020)
-----------------------------
 * New Matrix3x3 class
 * New website
 * New documentation

Version 1.1.0 (September 14th 2019)
-----------------------------
 * Added NumArray static class to work with array of numbers. Get min value, max value, sum, average...

Version 1.0.7 (September 13th 2019)
-----------------------------
 * millisecondToFramePerSecond() method in Time class returns the exact result instead of a rounded number.
 * framePerSecondToMillisecond() method in Time class returns the exact result instead of a rounded number.

Version 1.0.6 (June 01st 2019)
-----------------------------
 * Added contains() static method in Utils class.
 * Added contains() method in Rectangle class.
 * Added contains() method in Circle class.

Version 1.0.5 (April 02nd 2019)
-----------------------------
 * fixed declaration file.

Version 1.0.4 (March 21st 2019)
-----------------------------
 * Improved typings.

Version 1.0.3 (December 18th 2018)
-----------------------------
 * fixed declaration file.

Version 1.0.2 (December 17th 2018)
-----------------------------
 * fixed copy() method in Vector3 class.

Version 1.0.1 (October 07th 2018)
-----------------------------
 * Type6.js published on NPM at @lcluber/type6js.
 * Updated README.md with NPM installation procedure.

Version 1.0.0 (July 25th 2018)
-----------------------------
 * Stable library.
 * Comprehensive API.
 * Ready for production.
