window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var baseRadius = 50;
  var circle     = new Spock.Circ( width * 0.5, 0, baseRadius );

  var alpha      = 0.0;
  var baseAlpha  = 0.5;
  var amplitude  = 0.4;
  var speed      = 0.1;
  var period     = 0; //angle in radians

  //context.scale(1, -1);

  render();

  function render() {
    //amplitude, period, shiftX, shiftY
    alpha = Spock.Trigo.sineEquation(amplitude, period, 0, baseAlpha);
    circle.position.y = (Spock.Trigo.sineEquation(amplitude * 600, period, 0, height * 0.5));
    circle.radius = (Spock.Trigo.sineEquation(amplitude * 20, period, 0, baseRadius));

    context.clearRect(0, 0, width, height);

    circle.draw( context, 'rgba(0, 0, 0, ' + alpha + ')', null, null );

    period += speed;

    requestAnimationFrame( render );
  }

};
