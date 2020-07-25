var image;
var grayImage;
var redImage;
var blurImage;
var rainbowImage;
var canvas1 = document.getElementById("can");
var canvas2 = document.getElementById("can2");

function upload() {
  var fileInput = document.getElementById("finput");
  image = new SimpleImage(fileInput);
  grayImage = new SimpleImage(fileInput);
  redImage = new SimpleImage(fileInput);
  rainbowImage = new SimpleImage(fileInput);
  blurImage = new SimpleImage(fileInput);
  image.drawTo(canvas1);
}

function makeGray() {
  for(var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(canvas2);
}

function makeRed() {
   for(var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if(avg < 128) {
      pixel.setRed(avg*2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(avg*2-255);
      pixel.setBlue(avg*2-255);
    }
  }
  redImage.drawTo(canvas2);
}

function makeRainbow() {
  for(var pixel of rainbowImage.values()) {
    var one = rainbowImage.getHeight()/6;
    var two = rainbowImage.getHeight()/6 + one;
    var three = rainbowImage.getHeight()/6 + two;
    var four = rainbowImage.getHeight()/6 + three;
    var five = rainbowImage.getHeight()/6 + four;
    var six = rainbowImage.getHeight()/6 + five;
    if(pixel.getY() <= one) {
      pixel.setRed(255);
    } else 
    if(pixel.getY() <= two) {
      pixel.setRed(255);
      pixel.setGreen(150);
    } else
    if(pixel.getY() <= three) {
      pixel.setRed(220);
      pixel.setGreen(180);
    } else
    if(pixel.getY() <= four) {
      pixel.setGreen(230);
    } else
    if(pixel.getY() <= five) {
      pixel.setBlue(255);
    } else
    if(pixel.getY() <= six) {
      pixel.setRed(230);
      pixel.setBlue(255);
    }
  }
  rainbowImage.drawTo(canvas2);
}

function makeBlurry() {
  var newBlurImage = new SimpleImage(blurImage.getWidth(), blurImage.getHeight());
  for(var pixel of newBlurImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var temp = Math.random();
    if(temp < 0.5) {
      var oldPixel = blurImage.getPixel(x, y);
      newBlurImage.setPixel(x, y, oldPixel);
    } else
      var newX = Math.random(0, 10);
      var newY = Math.random(0, 10);
      if(newX <= newBlurImage.getWidth() || newY <= newBlurImage.getHeight()) {
        newBlurImage.setPixel(newX, newY, pixel);
      }
  }
  newBlurImage.drawTo(canvas2);
}

function resetImage() {
  var ctx2 = canvas2.getContext("2d");
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
}