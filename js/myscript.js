var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")

var image = document.createElement("img")
var imgThere = true;

var wi = document.getElementById('canvas').width
var hi = document.getElementById('canvas').height

var clearImg = function() {
    if (imgThere) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgThere = false;
    }
}

var drawImg = function() {
    clearImg();
    ctx.drawImage(image, 0, 0, wi, hi);
}

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

image.addEventListener("load", drawImg, false);

canvas.addEventListener("dragover", prevDef, false);

canvas.addEventListener("drop", fileDrop, false)


/*
var pictureDrop = document.getElementById('pictureDrop');
var currentPicture = false;

pictureDrop.addEventListener('dragover', showIcon);
pictureDrop.addEventListener('drop', dragDrop);

function showIcon(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}
*/