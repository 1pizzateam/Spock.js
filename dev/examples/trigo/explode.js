window.onload = function() {
  var canvas    = document.getElementById("canvas");
  var context   = canvas.getContext("2d");
  var width     = canvas.width = window.innerWidth;
  var height    = canvas.height = window.innerHeight;
  var particles = [];

  var particle = {
    position: {},
    velocity: {},
    create : function( positionX, positionY, velocityX, velocityY ){
      var obj = Object.create(this);
      obj.position = new Spock.Vec2( positionX, positionY );
      obj.velocity = new Spock.Vec2( velocityX, velocityY );
      return obj;
    },
    update: function(){
      this.position.add(this.velocity);
    }
  };

  var px = width * 0.5;
  var py = height * 0.5;

	for (var i = 0; i < 200; i += 1) {
    var radius    = Spock.Rand.float(0, 3);
    var angle     = Spock.Rand.float(0, Spock.Trigo.twopi);
    particles[i]  = particle.create(
                      px, py,
                      Spock.Trigo.cosineEquation( radius, angle, 0, 0 ),
                      Spock.Trigo.sineEquation( radius, angle, 0, 0 )
                    );
  }

  update();

  function update() {
    context.clearRect(0, 0, width, height);
    for(var i = 0; i < 200; i += 1) {
      var p = particles[i];
      p.update();
      context.beginPath();
      context.arc(p.position.x, p.position.y, 3, 0, Spock.Trigo.twopi, false);
      context.fill();
    }
    requestAnimationFrame(update);
  }


};
