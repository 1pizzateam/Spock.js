window.onload = function() {
  var canvas        = document.getElementById("canvas");
  var context       = canvas.getContext("2d");
  var width         = canvas.width = window.innerWidth;
  var height        = canvas.height = window.innerHeight;
  var colors        = ['green','red','blue'];

  for (var i = 0 ; i < 300 ; i += 1){
    var iMod3 = i%3;
    var circle = new Spock.Circle(
                  Spock.Random.float( width * iMod3/3, width * (iMod3+1)/3 ),
                  Spock.Random.float( 0, height ),
                  Spock.Random.float( 10, 40 )
                );

    circle.draw( context, colors[ iMod3 ], null, null );

  }

};
