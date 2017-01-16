var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d")
var img = document.createElement("img")
var mouseDown = false;
var brushColor = "rgb(0, 0, 0)"
var hasText = true;

var clearCanvas = function() {
    if (hasText) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        hasText = false;
    }
}

context.fillText("Drop an image onto the canvas", 0, 0);
context.fillText("Click a spot to set as brush color", 0, 0)

img.addEventListener("load", function() {
    clearCanvas();
    context.drawImage(img, 0, 0);
}, false);

canvas.addEventListener("dragover", function(evt) {
    evt.preventDefault();
}, false);

canvas.addEventListener("drop", function(evt) {
    var files = evt.dataTransfer.files;
    if (files.length > 0) {
        var file = files[0];
        if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
            var reader = new FileReader();
            reader.onload = function(evt) {
                img.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    evt.preventDefault();
}, false)

/*
var pictureDrop = document.getElementById('pictureDrop');
var currentPicture = false;

pictureDrop.addEventListener('dragover', showIcon);
pictureDrop.addEventListener('drop', dragDrop);

function showIcon(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}
*/