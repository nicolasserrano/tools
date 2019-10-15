var elements = document.getElementsByClassName('zoom_rotate');
for (i=0; i<elements.length;i++) {
  var zm = new Zoom(elements[i], {
    rotate: true
  });
}
