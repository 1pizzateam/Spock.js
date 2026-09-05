window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;
  var results = [];
  var slice   = 100;

  for(var i = 0; i < slice; i += 1) {
    results[i] = 0;
  }

  update();

  function update() {
    addResult();
    draw();
    requestAnimationFrame(update);
  }

  function addResult() {
    var randX = Math.floor(Spock.Rand.distribution(0, slice, 3));
    results[randX]++;
  }

  function draw() {
    var w = width / slice;
    for(var i = 0; i < slice; i += 1) {
      var h = results[i] * -10;
      context.fillRect(w * i, height, w, h);
    }
  }
};
