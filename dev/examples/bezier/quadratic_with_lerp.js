window.onload = function() {
  var canvas    = document.getElementById("canvas");
  var context   = canvas.getContext("2d");
  var width     = canvas.width = window.innerWidth;
  var height    = canvas.height = window.innerHeight;
  var p0        = new Spock.Vec2(100, 500);
  var p1        = new Spock.Vec2(200, 100);
  var p2        = new Spock.Vec2(1000,400);
  var pA        = new Spock.Vec2();
  var pB        = new Spock.Vec2();
  var pFinal    = new Spock.Vec2();
  var t         = 0;
  var maxT      = 0;
  var step      = 0.1;
  var sign      = 1;

  context.font = "16px Arial";
  draw();

  function draw() {
    context.clearRect(0, 0, width, height);

    context.strokeStyle = "#ccc";
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();

    context.beginPath();
    context.arc(p0.x, p0.y, 4, 0, Spock.Trigo.twopi, false);
    context.fill();

    context.beginPath();
    context.arc(p1.x, p1.y, 4, 0, Spock.Trigo.twopi, false);
    context.fill();

    context.beginPath();
    context.arc(p2.x, p2.y, 4, 0, Spock.Trigo.twopi, false);
    context.fill();

    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(p0.x, p0.y);

    for(t = 0; t <= maxT; t += step) {
      pA.lerp(p0, p1, t);
      pB.lerp(p1, p2, t);
      pFinal.lerp(pA, pB, t);

      context.lineTo(pFinal.x, pFinal.y);
    }
    context.stroke();

    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(pA.x, pA.y);
    context.lineTo(pB.x, pB.y);
    context.stroke();

    context.beginPath();
    context.arc(pA.x, pA.y, 4, 0, Spock.Trigo.twopi, false);
    context.fill();

    context.beginPath();
    context.arc(pB.x, pB.y, 4, 0, Spock.Trigo.twopi, false);
    context.fill();

    context.fillStyle = "red";
    context.beginPath();
    context.arc(pFinal.x, pFinal.y, 4, 0, Spock.Trigo.twopi, false);
    context.fill();
    context.fillStyle = "black";

    labelPoint(p0, "p0");
    labelPoint(p1, "p1");
    labelPoint(p2, "p2");
    labelPoint(pA, "pA");
    labelPoint(pB, "pB");
    labelT();

    maxT += step * sign;
    if( maxT > 1 || maxT < 0 ){
      sign = Spock.Utils.opposite(sign);
      maxT += step * sign;
    }

    setTimeout(draw, 500);
  }

  function labelPoint(p, name) {
    context.fillText(name + '( x : ' + Math.round(p.x) + ', y:' + Math.round(p.y) + ')', p.x - 40, p.y - 20);
  }

  function labelT() {
    context.fillText("t = " + Spock.Utils.round(maxT, 1), 400, 400);
  }
};
