console.log("Para descargar los videos, definir la variable download=1; o hacer clic en 'Tema' y después hacer clic en 'Mostrar vista previa de videos'");
function Download(iframeId, url) {  // https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
    document.getElementById(iframeId).src = url;
};
function setIframes() {
  var links = document.getElementsByTagName('a');
  var len = links.length;
  for(var i=0; i<len; i++) {
    //links[i].target = "_blank";
    if (links[i].href.search("panopto.eu") >= 0 || links[i].classList.contains('iframe')) {
      if ( typeof download !== 'undefined' && download != "No") {
        if (links[i].href.search("panopto.eu") >= 0) {  // check it is a panopto video
          ifr = document.createElement('iframe');
          iframeId = "if_" + i;
          ifr.setAttribute("id", iframeId);
          links[i].parentNode.insertBefore(ifr, links[i].nextSibling)
          urlOriginal = links[i].href;
          urlDownload = urlOriginal.replace("Pages/Viewer.aspx?id=", "Podcast/Download/") + ".mp4?mediaTargetType=videoPodcast";
          Download(iframeId, urlDownload);
        }
      } else {  // end of download
        ifr = document.createElement('iframe');
        if (links[i].href.search("panopto.eu") >= 0) {  // for panopto
          ifr.src = links[i].href.replace("Viewer", "Embed") + "&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all";
        } else {  // for youtube
          ifr.src = links[i].href.replace("watch?v=","embed/");
        }
      }
      ifr.width=400;
      ifr.height=225;
      links[i].parentNode.insertBefore(document.createElement("br"), links[i].nextSibling)
      links[i].parentNode.insertBefore(ifr, links[i].nextSibling)
      links[i].parentNode.insertBefore(document.createElement("br"), links[i].nextSibling)
    }
  }
}
