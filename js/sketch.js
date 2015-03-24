//Global Variables // hello
var H1, H2, H3, H4;
var S1, S2, S3, S4;
var B1, B2, B3, B4;
var stateNum;

var bo1x, bo2x, bo3x, bo4x;
var bo1y, bo2y, bo3y, bo4y;
var boW, boH;


//colors
var c, d, e, f;

var bc;


function setup(){

  H1 = 89;
  S1 = 100;
  B1 = 100;

  stateNum = 1;

  bc=200;

}

function draw(){

  changeColor(stateNum, H1, S1, B1);
  drawSquares();

}


 function drawSquares(){



    colorMode(HSB, 100);
    c = color(H1, S1, B1);
    d = color(H2, S2, B2);
    e = color(H3, S3, B3);
    f = color(H4, S4, B4);


  }



function submitPressed(){

  var x = document.getElementById("frm1");
  var text = "";
  var i;

  for(i = 0; i < x.length ; i++){
    text += x.elements[i].value + " ";
  }

  var rX = x.elements[0].value;
  var gX = x.elements[1].value;
  var bX = x.elements[2].value;
  if(x.elements[3].value == "Light"){
    stateNum = 1;
  } else if(x.elements[3].value == "Dark"){
    stateNum = 2;
  }

  document.getElementById("accentBox").innerHTML = text;



  rgbToHSB(rX, gX, bX);

  //alert( rgbToHSB());

  // if(bool1 == true){
  //   alert("Your book is overdue");
  //   bool1 = false;
  // } else if (bool1 == false){
  //   alert("Your book is good now");
  //   bool1 = true;
  // }
  
}


function rgbToHSB(r1, g1, b1){

  //alert("1");
  var color = tinycolor({r:r1, g:g1, b:b1});
  //alert(color.toHsvString());
  //alert("hi");
  //alert("2");
  var bigColor = color.toHsv();
  //alert("3");

  var colorH = bigColor.h;
  var colorS = bigColor.s;
  var colorB = bigColor.v;

  //alert(colorH.toString() + "  " + colorS.toString() + "  " + colorB.toString());
  //alert(colorB.toString());

  H1 = (colorH * 100)/ 360;
  S2 = colorS * 100;
  B2 = colorB * 100;

  // getHue : function(){
  //   return this.h;
  // }

  //alert(color.getHue());

  // H1 = color.h;
  // alert(H1.toString());


 // H1 = 50;
  //S1 = color._s;
  //B1 = color._v;

  //var rr = color.h;


}



function changeColor(state, Ha, Sa, Ba){

//var changeCanvas;


  switch(state){
    case 1: //light

      H2 = H1;
      S2 = S1 - 25;
      B2 = B1 + 20;

      H3 = H1;
      S3 = S2 - 40;
      B3 = B2 + 2;

      H4 = H1;
      S4 = 80;
      B4 = 25;

      bc = 235;

      //changeCanvas = myCanvas.getElementById("defaultCanvas");
      //changeCanvas.style("background-color", "rgb(" + bc + "," + bc + "," + bc ")" );

      
      break;

    case 2:

      //var lB2 = (100 - B1);  

      H2 = H1;
      S2 = S1 - 25;
      B2 = B1 - 20;

      H3 = H1;
      S3 = S2 - 30;
      B3 = B2 - 20;

      H4 = H1;
      S4 = 20;
      B4 = 75;
      bc = 0;

      break;

    default:
      // H2 = H1;
      // S2 = S1;
      // B2 = B1 - 25;

      // H3 = H1;
      // S3 = S1;
      // B3 = B2 - 25;

      // H4 = H1;
      // S4 = S1;
      // B4 = B3 - 10;
      // background(0);
      break;
  }
}










var sketch = function(p) {

  var parentContainer;
  var pCWidth;
  var pCHeight;

  var pCx;
  var pCy;

  p.setup = function(){

  };

  p.draw = function(){

    // Declare necessary Canvas
    p.declareContainer();
    //p.background(220);    


    // Create Canvas
    cc = p.createCanvas(pCWidth, pCHeight);
    //p.background(15, 22, 77);
    cc.parent('firstCanvas');

    //var pcc = document.getElementById('sampleContainer');
    //pcc.class('sampler1');
    // Draw on Canvas


    p.ddrawSquares();
      // apparently on a canvas you get 0,0 in the corner.

  };


  p.declareContainer = function(){

    parentContainer = document.getElementById('firstCanvas');
    pCWidth = parentContainer.offsetWidth;
    pCHeight = displayHeight/5;

    var rect = parentContainer.getBoundingClientRect();

    // pCx = rect.offsetLeft;
    // pCy = rect.offsetTop;
    //pCx = (parentContainer.offsetLeft + parentContainer.scrollLeft + parentContainer.clientLeft);
    //pCy = parentContainer.offsetTop;
    //pCHeight = parentContainer.offsetHeight;
  };

   p.ddrawSquares = function(){

    boH = (pCHeight - (pCHeight* 2/10));
    boW = (pCWidth * 1/6);
    bo1y = pCHeight* 1/10;
    bo1x = pCWidth* 1/6; 

    //bo1y = bo2y = bo3y = bo4y;
    bo2y = bo3y = bo4y = bo1y;
    bo2x = (bo1x*2), bo3x = (bo1x * 3), bo4x = (bo1x * 4);

    //p.colorMode(HSB, 100);
    //c = color(H1, S1, B1);
    p.fill(c);
    p.noStroke();
    p.rect(bo1x, bo1y, boW, boH);

    //d = color(H2, S2, B2);
    p.fill(d);
    p.noStroke();
    p.rect(bo2x, bo2y, boW, boH);

    //e = color(H3, S3, B3);
    p.fill(e);
    p.noStroke();
    p.rect(bo3x, bo3y, boW, boH);

    //f = color(H4, S4, B4);
    p.fill(f);
    p.noStroke();
    p.rect(bo4x, bo4y, boW, boH);

  };




};

var myp5 = new p5(sketch);









