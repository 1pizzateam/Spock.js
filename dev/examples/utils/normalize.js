window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var values    = [5, 9, 24, 21, 30, 10, 25, 12, 9, 23, 13, 6, 31, 25, 17, 13, 29, 6, 9, 7, 16, 30, 20, 12];
  var qty       = values.length - 1;
  var slice     = width / qty;
  var min       = Math.min.apply(null, values);
  var max       = Math.max.apply(null, values);
  var positions = [qty];
  var position  = {};

  //compute positions
  for ( var i = 0; i <= qty; i++ ) {
    var normValue = Spock.Utils.normalize(values[i], min, max);
    positions[i]  = new Spock.Vector2(
      slice * i,
      height - height * normValue
    );
  }

  //draw lines
  context.strokeStyle = "blue";
  context.beginPath();
  //move to first plot
  var position1 = positions[0];
  context.moveTo(position1.x, position1.y);
  //loop through following plots
  for ( i = 1; i <= qty; i++) {
    position = positions[i];
    context.lineTo(position.x, position.y);
  }
	context.stroke();

  // draw points
  context.fillStyle = "green";
  for(i = 0; i <= qty; i++) {
    position = positions[i];
    context.beginPath();
    context.arc(position.x, position.y, 4, 0, Spock.Trigonometry.twopi, false);
    context.fill();
  }

};
