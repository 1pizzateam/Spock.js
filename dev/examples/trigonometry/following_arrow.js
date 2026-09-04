window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var arrowPosition = new Spock.Vector2(width, height).halve();
  var mousePosition = new Spock.Vector2();
  var angle = 0.0;
  var a = 0.0;

  render();

  function render() {

    context.clearRect(0, 0, width, height);

    context.save();
    context.translate(arrowPosition.x, arrowPosition.y);
    context.rotate(angle);

    context.beginPath();
    context.moveTo(40, 0);
    context.lineTo(-40, 0);
    context.moveTo(40, 0);
    context.lineTo(20, -20);
    context.moveTo(40, 0);
    context.lineTo(20, 20);
    context.stroke();

    context.restore();

    requestAnimationFrame(render);
  }

  document.body.addEventListener("mousemove", function(event) {
    mousePosition.set(
      event.clientX,
      event.clientY
    );
    mousePosition.subtract(arrowPosition);
    angle = Spock.Trigonometry.arctan2(mousePosition.y, mousePosition.x);
  });


};
