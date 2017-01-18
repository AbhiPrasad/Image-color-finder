var canvas = document.getElementById("canvas");
var colorcanvas = document.getElementById("colorcanvas")
var ctx = canvas.getContext("2d")

var image = document.createElement("img")
var imgThere = true;

//canvas width and height not cssed because of scaling issues
var wi = document.getElementById('canvas').width
var hi = document.getElementById('canvas').height

//clears image if there is already an image there
var clearImg = function() {
    if (imgThere) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgThere = false;
    }
}

//get average color
function avgColor() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    var red = 0,
        green = 0,
        blue = 0;

    //collect the colors
    for (var x = 0; x < imgData.length; x += 4) {
        red += imgData[x];
        green += imgData[x + 1];
        blue += imgData[x + 2];
    }

    //average out the colors
    red = Math.floor(red / (imgData.length / 4));
    green = Math.floor(green / (imgData.length / 4));
    blue = Math.floor(blue / (imgData.length / 4));


    var fill = rgbToHex(red, green, blue);
    //  var compli = invertColorAverage(red, green, blue);
    //  document.getElementById("averagecanvas").style.borderColor = compli;
    document.getElementById("averagecanvas").style.background = fill;
    changeAvgText(red, green, blue, fill)
}

//draws image on canvas
var drawImg = function() {
    clearImg();
    ctx.drawImage(image, 0, 0, wi, hi);
    avgColor();
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

// from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//change rbg and hex text when color is chosen
function changePickerText(imgData, filling) {
    document.getElementById("hexcolor").innerHTML = filling;
    document.getElementById("rgbcolor").innerHTML = "rgb(" + imgData[0] + ", " + imgData[1] + ", " + imgData[2] + ")";
}

function changeAvgText(r, g, b, f) {
    document.getElementById("avghex").innerHTML = f;
    document.getElementById("avgother").innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
}

//get color from image using image data 
var getColor = function(e) {
    var rect = canvas.getBoundingClientRect();
    var xcoord = e.clientX - rect.left;
    var ycoord = e.clientY - rect.top;

    var imgData = ctx.getImageData(xcoord, ycoord, wi, hi).data;
    var filling = rgbToHex(imgData[0], imgData[1], imgData[2]);
    // var compli = invertColorPick(imgData);
    // document.getElementById("pickcanvas").style.borderColor = compli;
    document.getElementById("pickcanvas").style.background = filling;
    changePickerText(imgData, filling);
}

//function invertColorPick(data) {
//  var r = 255;
//}


image.addEventListener("load", drawImg, false);
canvas.addEventListener("dragover", prevDef, false);
canvas.addEventListener("drop", fileDrop, false);
canvas.addEventListener('dragover', showIcon, false);
canvas.addEventListener('mouseup', getColor, false);