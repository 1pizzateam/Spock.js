window.onload = function() {
  var canvas        = document.getElementById("canvas");
  var context       = canvas.getContext("2d");
  var width         = canvas.width = window.innerWidth;
  var height        = canvas.height = window.innerHeight;

  var circle = new Spock.Circle( width*0.5, height*0.5, 40 );
  var circle2 = new Spock.Circle( width*0.5, height*0.5, 20 );

  var position = new Spock.Matrix3x3(1.0, x2, x3, y1, 1.0, y3, circle.position.x, circle.position.y, 1.0);

  update();

  function update() {
    move();
    draw();
    requestAnimationFrame(update);
  }

  function move() {
    var p = new Spock.Vector2(0.1,0.1);
  }

  function draw() {
    circle.draw( context, "#CC0000", "#000000", 1 );
    circle2.draw( context, "#CC0000", "#000000", 1 );
  }

};
