imagesList=[]
function readTables() {
  tables = document.getElementsByClassName("images")
  for (it=0;it<tables.length;it++){
    elements = tables[it].closest("table").getElementsByTagName("tr")
    console.log("table " + it);
    for (i=1;i<elements.length;i++){  // first row are the headers
      console.log(i + " " + elements[i].children[0].textContent  + "-" + elements[i].children[1].textContent);
      image = {}
      image.key = elements[i].children[0].textContent;
      image.url = elements[i].children[1].textContent;
      imagesList.push(image);
    }
  }
}
function getImageByKey(key) {
  for (i=0;i<imagesList.length;i++){
    if (imagesList[i].key == key) return imagesList[i];
  }
}
function setImagesSrc() {
  images = document.getElementsByClassName("images")[0].closest("div").getElementsByTagName("img")
  for (im=0;im<images.length;im++){
    image = getImageByKey(images[im].alt);
    images[im].src = image.url;
  }
}
readTables();
setImagesSrc();

