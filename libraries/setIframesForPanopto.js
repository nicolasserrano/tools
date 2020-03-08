console.log("Para descargar los videos, definir la variable download=1; o hacer clic en 'Tema' y después hacer clic en 'Mostrar vista previa de videos'");
function Download(iframeId, url) {  // https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
    document.getElementById(iframeId).src = url;
};
/**
 * setVideoIcons sets and icon in the field cell (TD) of each table row (TR) with a call to the setIframes() function
 */
function setVideoIcons(element) {
    tableEl = element.closest("TABLE");
    trArray = tableEl.getElementsByTagName("TR");
    ntr = trArray.length;
    for (i=0;i<ntr;i++){
        tdEl0 = trArray[i].getElementsByTagName("TD")[0];
        tdEl0.innerHTML += "<svg onclick=setIframes(this," + i + ") height='24px' width='24px' class='icon-nav-video'><use href='#icon-nav-videos'></use></svg>"
    }
}
function setIframes(element, iTr) {
  var links;
  if (iTr == 0) {  // if the call comes from the first row, set iframes for the links of the page
    links = document.getElementsByTagName('a');
  } else {  // all the links of the row (TR)
    links = element.closest("TR").getElementsByTagName('a');
  }
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
  setH = document.createElement("a")
  setH.setAttribute("onclick", "setHorizontal()")
  setH.setAttribute("id", "setH")
  setH.setAttribute("href", "javascript:void(0);")
  setH.innerText="SH"
  element.parentNode.insertBefore(document.createTextNode(""), element.nextSibling)
  element.parentNode.insertBefore(setH, element.nextSibling)
}

function setHorizontal(){
  var sheet = window.document.styleSheets[0];
  sheet.insertRule('td:nth-child(3) br { display: none; }', sheet.cssRules.length);
  sheet.insertRule('td:nth-child(3) p { display: inline; }', sheet.cssRules.length);
  sheet.insertRule('td:nth-child(3) * { font-size: 0px; }', sheet.cssRules.length);
  sheet.insertRule('td:nth-child(3) span * { font-size: 0px; }', sheet.cssRules.length);
  sheet.insertRule('td:nth-child(3) { font-size: 0px; }', sheet.cssRules.length);
  sheet.insertRule('table { width: max-content; }', sheet.cssRules.length);
}
