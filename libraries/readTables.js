imagesList=[]
function readTables() {
  elements = document.getElementsByClassName("images")[0].closest("table").getElementsByTagName("tr")
  for (i=1;i<elements.length;i++){
    console.log(i + " " + elements[i].children[0].textContent  + "-" + elements[i].children[1].textContent);
  }
}
readTables();
