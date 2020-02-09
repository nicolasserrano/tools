function setIframes() {
  var links = document.getElementsByTagName('a');
  var len = links.length;
  for(var i=0; i<len; i++) {
    //links[i].target = "_blank";
    if (links[i].href.search("panopto.eu") >= 0 || links[i].classList.contains('iframe')) {
      ifr = document.createElement('iframe');
      ifr.src = links[i].href.replace("Viewer", "Embed") + "&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all";
      ifr.width=400;
      ifr.height=225;
      links[i].parentNode.insertBefore(document.createElement("br"), links[i].nextSibling)
      links[i].parentNode.insertBefore(ifr, links[i].nextSibling)
      links[i].parentNode.insertBefore(document.createElement("br"), links[i].nextSibling)
    }
  }
}
