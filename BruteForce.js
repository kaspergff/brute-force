var W = window.innerWidth *0.9;
var H = window.innerHeight*0.9;
var Points = [];
var BestAr = [];
var newPoints = [];
var Order = [];
var nrPoints = 4;
var best;
var current;
var context;

// Function to start
function Setup() {
    Canvas.start();
    Canvas.mouse();
    for (var i = 0; i < nrPoints; i++) {
      Points[i] = new Point();
      Points[i].Point();
      Order[i] = i;
    }
    best = calcDistance(Points);
    BestAr = Points.slice();

    setInterval(Run, 400);
}
// Code while running
function Run(){
    Canvas.clear();
    for (var i = 0; i < Points.length; i++) {
      Points[i].Draw();
    }
    DrawLines(BestAr,"red",5);
    DrawLines(Points,"white",1);
    Order = LexoOrder(Order);
    current = calcDistance(Points);
    if(current < best){
      best = current;
      BestAr = Points.slice();
    }
}

// canvas
var Canvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = W;
        this.canvas.height = H;
        context = context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    mouse : function(){
      this.canvas.addEventListener("mousedown", newPointOnClick, false);
    },
    clear : function() {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Points
function Point(){
  this.Point = function(){
    var Xas = Math.floor(Math.random() * W);
    var Yas = Math.floor(Math.random() * H);
    this.x = Xas;
    this.y = Yas;
  }
  this.PointNotRandom = function(x,y){
    this.x = x;
    this.y = y
  }
  this.Draw = function(){
    context.beginPath();
    context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    context.fillStyle = "White";
    context.fill();
  }
}

function DrawLines(array,color,ln){
  for (var i = 1; i < array.length; i++) {
    context.beginPath();
    context.moveTo(array[i].x,array[i].y);
    context.lineTo(array[i-1].x,array[i-1].y);
    context.strokeStyle=color;
    context.lineWidth=ln;
    context.stroke();
  }
}

function calcDistance(array){
  var total = 0;
  for (var i = 0; i < array.length-1; i++) {
    var a = array[i].x - array[i+1].x;
    var b = array[i].y - array[i+1].y;
    var c = Math.sqrt( a*a + b*b );
    total += c;
  }
  return total;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function SetNR(){
  var x;
  // Get the value of the input field with id="numb"
     x = document.getElementById("id1").value;
     // If x is Not a Number or less than one or greater than 10
     if (!isNaN(x)) {
       newPoints = [];
       for (var i = 0; i < x; i++) {
         newPoints[i] = new Point();
         newPoints[i].Point();
       }
       Points = newPoints.slice();
       best = calcDistance(Points);
       BestAr = Points.slice();
     }
}

function newPointOnClick(event)
{
  var x = event.x;
  var y = event.y;
  var newPoint = new Point();
  newPoint.PointNotRandom(x,y);
  Points.push(newPoint);
  best = calcDistance(Points);
  BestAr = Points.slice();
}
