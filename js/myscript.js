var canvas = document.getElementById("canvas");
var colorcanvas = document.getElementById("colorcanvas")
var ctx = canvas.getContext("2d")

var image = document.createElement("img")
var imgThere = true;

var wi = document.getElementById('canvas').width
var hi = document.getElementById('canvas').height

var color;

//clears image if there is already an image there
var clearImg = function() {
    if (imgThere) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgThere = false;
    }
}

//draws image on canvas
var drawImg = function() {
    clearImg();
    ctx.drawImage(image, 0, 0, wi, hi);
}

//to show icon when dropping on canvas and add copy description
var showIcon = function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

//stops default behaviour of picture opening a new tab
var prevDef = function(e) {
    e.preventDefault();
}

//fileDrop function adapted from https://robertnyman.com/2011/03/10/using-html5-canvas-drag-and-drop-and-file-api-to-offer-the-cure/
var fileDrop = function(e) {
    var files = e.dataTransfer.files;
    if (files.length > 0) {
        var file = files[0];
        if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
            var reader = new FileReader();
            reader.onload = function(e) {
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    e.preventDefault();
}

//from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//get color from image using image data 
var getColor = function(e) {
    var imgData = ctx.getImageData(e.layerX, e.layerY, 1, 1).data;
    color = "rgb(" + imgData[0] + ", " + imgData[1] + ", " + imgData[2] + ")";
    colorcanvas.fillStyle = color;
    alert(color);
}

image.addEventListener("load", drawImg, false);
canvas.addEventListener("dragover", prevDef, false);
canvas.addEventListener("drop", fileDrop, false);
canvas.addEventListener('dragover', showIcon, false);
canvas.addEventListener('mouseup', getColor, false);