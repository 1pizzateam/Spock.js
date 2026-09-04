const Spock = require("../../dist/spock.js");

let vector1 = new Spock.Vector2(2.0,2.2);
let vector2 = new Spock.Vector2(1.0,1.0);
console.log(vector1.toString());
console.log(vector2.toString());
vector1.add(vector2);
console.log(vector1.toString());
console.log(Spock.Utils.round(6.7, 0));
console.log(Spock.Random.float(4, 10));
console.log(Spock.Trigonometry.twopi);

let cosine = Spock.Trigonometry.cosineEquation( 1, 3.14, 0, 0 );
let sine = Spock.Trigonometry.sineEquation( 1, 3.14, 0, 0 );
console.log(cosine);
console.log(sine);

let circle = new Spock.Circle( 0, 0, Spock.Random.integer(100,200) );
circle.position.set(2,3).add(vector2);
console.log(circle);


function AabbVSAabbCollision( apos, ahs, bpos, bhs) {
  let ab = new Spock.Vector2().copy(apos).subtract(bpos); //(-3,-2)
  let penetration = ab.clone().absolute().opposite().add(ahs).add(bhs); //(0,1)
  if(penetration.isPositive()) {
    return getProjection(penetration, ab);
  }
  return penetration.origin();
}

function getProjection(penetration, ab) {
  //pick the projection axis
  let minAxis = penetration.getMinAxis(); //x
  penetration.setOppositeAxis(minAxis, 0); //(0,0)
  if(penetration[minAxis] && ab[minAxis] < 0) {
    penetration[minAxis] = -penetration[minAxis];
  }
  return penetration;
}

let apos = new Spock.Vector2(2,2);
let ahs  = new Spock.Vector2(1,1);
let bpos = new Spock.Vector2(5,4);
let bhs  = new Spock.Vector2(2,2);

let collisionDetection = AabbVSAabbCollision(apos, ahs, bpos, bhs);
console.log('collision', collisionDetection);