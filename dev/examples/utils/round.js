window.onload = function() {
  var canvas    = document.getElementById("canvas");
  var context   = canvas.getContext("2d");
  var width     = canvas.width = window.innerWidth;
  var height    = canvas.height = window.innerHeight;
  var gridSize  = 40;
  var circle    = new Spock.Circle( 0, 0, 20 );
	drawGrid();

  document.body.addEventListener("mousemove", function(event) {
    context.clearRect(0, 0, width, height);
    drawGrid();

    circle.position.set(
      Spock.Utils.roundToNearest(event.clientX, gridSize),
      Spock.Utils.roundToNearest(event.clientY, gridSize)
    );

    circle.draw( context, 'rgba(0,0,0,1)', null, null );
    context.fill();
  });

  function drawGrid() {
    context.beginPath();
    context.strokeStyle = "#ccc";
    for(var x = 0; x <= width; x += gridSize) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
    for(var y = 0; y <= height; y += gridSize) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }
    context.stroke();
  }

};
