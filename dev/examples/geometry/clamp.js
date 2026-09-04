window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width  = window.innerWidth;
  var height  = canvas.height = window.innerHeight;
  var hWidth  = width  * 0.5;
  var hHeight = height * 0.5;

  var circle    = new Spock.Circle( 0, 0, 40 );
  var rect      = new Spock.Rectangle( hWidth, hHeight, hWidth, hHeight );
  var innerRect = new Spock.Rectangle( hWidth, hHeight, hWidth - circle.diameter, hHeight - circle.diameter );

  //initial rendering
  drawRectangles();

  document.body.addEventListener("mousemove", function(event) {
    circle.position.set(event.clientX, event.clientY);
    circle.position.clamp(innerRect);

    context.clearRect(0, 0, width, height);

    drawRectangles();
    circle.draw( context, "#CC0000", null, null );

    //context.fill();
  });

  function drawRectangles(){
    rect.draw( context, "#cccccc", null, null );
    innerRect.draw( context, "#999999", "#000000", 1 );
  }

};
