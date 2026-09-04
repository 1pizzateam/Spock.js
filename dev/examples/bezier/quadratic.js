window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var p0      = new Spock.Vector2(Spock.Random.integer(0, width), Spock.Random.integer(0, height));
  var p1      = new Spock.Vector2(Spock.Random.integer(0, width), Spock.Random.integer(0, height));
  var p3      = new Spock.Vector2(Spock.Random.integer(0, width), Spock.Random.integer(0, height));
  var pFinal  = new Spock.Vector2();
  var t       = 0;
  var t2      = 0;
  //var maxT    = 0;
  var step    = 0.01;
  var sign    = 1;

  context.strokeStyle = "green";

  draw();

  function draw() {
    context.clearRect(0, 0, width, height);

    context.fillStyle = "black";

    context.beginPath();
    context.arc(p0.x, p0.y, 4, 0, Spock.Trigonometry.twopi, false);
    context.fill();

    context.beginPath();
    context.arc(p3.x, p3.y, 4, 0, Spock.Trigonometry.twopi, false);
    context.fill();

    context.fillStyle = "grey";

    context.beginPath();
    context.arc(p1.x, p1.y, 4, 0, Spock.Trigonometry.twopi, false);
    context.fill();

    context.beginPath();
    context.moveTo(p0.x, p0.y);

    for(var t = 0; t <= 1 + step; t += step) {
      pFinal.quadraticBezier( p0, p1, p3, t );
      context.lineTo(pFinal.x, pFinal.y);
    }
    context.stroke();

    pFinal.quadraticBezier( p0, p1, p3, t2 );

    context.fillStyle = "red";
    context.beginPath();
    context.arc(pFinal.x, pFinal.y, 10, 0, Spock.Trigonometry.twopi, false);
    context.fill();

    t2 += step * sign;
    if(t2 > 1 || t2 < 0) {
      sign = Spock.Utils.opposite(sign);
    }

    requestAnimationFrame(draw);

  }
};
