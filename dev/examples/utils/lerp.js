window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var x      = new Spock.Vec2(50, width - 100);
  var y      = new Spock.Vec2(50, height - 100);
  var radius = new Spock.Vec2(10, 300);
  var alpha  = new Spock.Vec2(0, 1);
  var time   = 0;

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    context.globalAlpha = Spock.Utils.lerp( alpha.x, alpha.y, time );
    context.beginPath();
    context.arc(
      Spock.Utils.lerp(x.x, x.y, time),
      Spock.Utils.lerp(y.x, y.y, time),
      Spock.Utils.lerp(radius.x, radius.y, time),
      0,
      Spock.Trigo.twopi,
      false
    );
    context.fill();

    time += 0.005;
    if(time > 1) {
      time = 0;
    }

    requestAnimationFrame(render);
  }

};
