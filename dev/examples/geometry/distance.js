window.onload = function() {
  var canvas        = document.getElementById("canvas");
  var context       = canvas.getContext("2d");
  var width         = canvas.width = window.innerWidth;
  var height        = canvas.height = window.innerHeight;
  var circle        = new Spock.Circ( width * 0.5, height * 0.5, 100 );
  var mousePosition = new Spock.Vec2();

  context.fillStyle = "#66FF66";
  drawCircle();
  context.fill();

  document.body.addEventListener("mousemove", function(event) {
    context.clearRect(0, 0, width, height);
    mousePosition.set(event.clientX, event.clientY);
    context.fillStyle = "#66FF66";
    var distance = circle.position.getDistance(mousePosition);
    if( distance <= circle.radius ){
      context.fillStyle = "#FF6666";
    }

    context.fill();

  });

  function drawCircle(){
    context.beginPath();
    context.arc(circle.position.x, circle.position.y, circle.radius, 0, Spock.Trigo.twopi, false);
  }

};
