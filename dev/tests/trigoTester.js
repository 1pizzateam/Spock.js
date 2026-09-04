
window.onload = function() {

  var angles         = computeAngles();
  var normAngles     = computeNormAngles();
  var anglesHtml     = showMeResult( angles );
  var normAnglesHtml = showMeResult( normAngles );
  findById('a').innerHTML = anglesHtml;
  findById('b').innerHTML = anglesHtml;
  findById('c').innerHTML = anglesHtml;
  findById('an').innerHTML = normAnglesHtml;
  findById('bn').innerHTML = normAnglesHtml;
  findById('cn').innerHTML = normAnglesHtml;

  test(angles, 'test my sine',     '1', Spock.Trigonometry, 'sine');
  test(angles, 'test math sine',   '2', Math, 'sin');
  test(angles, 'test my cosine',   '3', Spock.Trigonometry, 'cosine');
  test(angles, 'test math cosine', '4', Math, 'cos');
  test(angles, 'test my arctan',   '5', Spock.Trigonometry, 'arctan');
  test(angles, 'test math arctan', '6', Math, 'atan');
  //test(angles, 'test my arctan2',   '5', Spock.Trigonometry, 'arctan2');
  //test(angles, 'test math arctan2', '6', Math, 'atan2');

}

function test(angles, name, container, _this, callback){
    var angle = 0;
    var result = [];
    console.time(name);
    for(var i = 0 ; i < angles.length ; i++){
      result.push(_this[callback](angles[i]));
    }
    console.timeEnd(name);

    var html = showMeResult(result);
    findById(container).innerHTML = html;
}

function computeAngles(){
  //var angle = Spock.Trigonometry.TWOPI * 2;
  var angles = [];
  //var dxdy = []
  for(var i = -Spock.Trigonometry.TWOPI ; i <= Spock.Trigonometry.TWOPI ; i+=0.1){
    angles.push(i);
  }
  return angles;
}

function computeNormAngles(){
  var angles = [];
  //var dxdy = []
  for(var i = -Spock.Trigonometry.TWOPI ; i <= Spock.Trigonometry.TWOPI ; i+=0.1){
    angles.push(Spock.Trigonometry.normalizeRadian(i));
  }
  return angles;
}

function showMeResult(array){
  var html = '<ul>';
  for(var i = 0 ; i < array.length ; i++){
    html += '<li>' + array[i] + '</li>' ;
  }
  html += '</ul>';
  return html;
}

function findById(a){
    return document.getElementById(a);
}

// function findByClass(a){
//   if (document.getElementsByClassName==undefined){//IE
//     var hasClassName = new RegExp("(?:^|\\s)" + a + "(?:$|\\s)");
//     var allElements = document.getElementsByTagName("*");
//     var results=[];
//     var element;
//     for (var i=0;(element=allElements[i])!=null;i++){
//         var elementClass=element.a;
//         if(elementClass && elementClass.indexOf(a) != -1 && hasClassName.test(elementClass))
//           results.push(element);
//     }
//     return results;
//   }else{
//     return document.getElementsByClassName(a);
//   }
// }
