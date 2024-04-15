var canvas = document.getElementById("snow");
var ctx = canvas.getContext("2d");

var w = (canvas.width = window.innerWidth);
var h = (canvas.height = window.innerHeight);

var num = 150;
var tamaño = 3;
var elementos = [];

inicio();
nevada();

function inicio() {
  for (var i = 0; i < num; i++) {
    elementos[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      tamaño: Math.random() * tamaño,
    };
  }
}

function nevada() {
  ctx.clearRect(0, 0, w, h);
  for (var i = 0; i < num; i++) {
    var e = elementos[i];
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(e.x, e.y, e.tamaño, 0, 2 * Math.PI);
    ctx.fill();
  }
}
