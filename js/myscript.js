var pictureDrop = document.getElementById('pictureDrop');
var currentPicture = false;

pictureDrop.addEventListener('dragover', showIcon);
pictureDrop.addEventListener('drop', dragDrop);

function showIcon(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}