window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;
  var circle  = new Spock.Circ( width * 0.5, height * 0.5, 20 );

  circle.draw( context, 'rgba(0,0,0,1)', null, null );
  context.fill();

  document.body.addEventListener("mousemove", function(event) {
    circle.radius = Spock.Utils.map(event.clientY, 0, height, 20, 340 );

    context.clearRect(0, 0, width, height);
    circle.draw( context, 'rgba(0,0,0,1)', null, null );
    context.fill();
  });

};
