imagesList=[]
function readTables() {
  tables = document.getElementsByClassName("images")
  for (it=0;it<tables.length;it++){
    elements = tables[it].closest("table").getElementsByTagName("tr")
    console.log("table " + it);
    for (i=1;i<elements.length;i++){
      console.log(i + " " + elements[i].children[0].textContent  + "-" + elements[i].children[1].textContent);
    }
  }
}
readTables();
