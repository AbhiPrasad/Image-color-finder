var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")

var img = document.createElement("img")
var imgThere = true;

var wi = document.getElementById('canvas').width
var hi = document.getElementById('canvas').height

var clearImg = function() {
    if (imgThere) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgThere = false;
    }
}

img.addEventListener("load", function() {
    clearImg();
    ctx.drawImage(img, 0, 0, wi, hi * img.height / img.height);
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