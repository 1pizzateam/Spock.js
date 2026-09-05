window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  for(var i = 0; i < 100000; i++) {
    var x = Spock.Rand.distribution(0, width, 5);
    var y = Spock.Rand.distribution(0, height, 5);

    context.fillRect(x, y, 1, 1);
  }

};
