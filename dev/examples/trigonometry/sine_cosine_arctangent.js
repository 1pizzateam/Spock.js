window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  context.translate( width * 0.5, height * 0.5 );
  context.scale( 1, -1 );
  Spock.Trigonometry.setArctanPrecision(8);
  
  for(var angle = -Spock.Trigonometry.pi; angle <= Spock.Trigonometry.pi; angle += 0.04) {

    var x = angle * 200;

    var y = Spock.Trigonometry.sineEquation(240, angle, 0, 40);
    draw("black", 5);

    y = Spock.Trigonometry.cosineEquation(240, angle, 0, 0);
    draw("red", 5);

    y = Spock.Trigonometry.arctanEquation(240, angle, 0, 0);
    draw("green", 5);

  }

  function draw(colour, blockSize){
    context.fillStyle = colour;
    context.fillRect(x, y, blockSize, blockSize);
  }

};
