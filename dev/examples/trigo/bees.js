window.onload = function() {
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var bees    = [];
  var numBees = 30;
  var center  = new Spock.Vec2(width, height).halve();
  var bee = {
    create: function() {
      var obj = Object.create(this);
      obj.init();
      return obj;
    },

    init: function() {
      this.angle = new Spock.Vec2(
        Spock.Rand.float(0, Spock.Trigo.twopi),
        Spock.Rand.float(0, Spock.Trigo.twopi)
      );
      this.speed = new Spock.Vec2(
        this.randomSpeedGenerator(),
        this.randomSpeedGenerator()
      );
      this.circle = new Spock.Circ( 0, 0, Spock.Rand.integer(100,200) );
    },

    update: function() {
      var radius = this.circle.radius;
      this.circle.position.set(
        Spock.Trigo.cosineEquation( radius, this.angle.x, 0, 0 ),
        Spock.Trigo.sineEquation( radius, this.angle.y, 0, 0 )
      ).add(center);
      this.angle.add( this.speed );
      this.draw();
    },

    draw: function(){
      context.beginPath();
      context.arc( this.circle.position.x, this.circle.position.y, 2, 0, Spock.Trigo.twopi, false );
      context.fill();
    },

    randomSpeedGenerator: function(){
      var sign = Spock.Rand.pick(-1,1);
      var randNumber = Spock.Rand.float(0.0125, 0.05, 4);
      return randNumber * sign;
    }

  };

  for(var i = 0; i < numBees; i += 1) {
    bees.push(bee.create());
  }

  draw();

  function draw() {
    context.clearRect(0, 0, width, height);

    for( var i = 0; i < numBees; i++ ) {
      bees[i].update();
    }

    requestAnimationFrame(draw);
  }

};
