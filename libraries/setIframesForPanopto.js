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
        //tdEl0.innerHTML += "<svg onclick=setIframes(this," + i + ") height='24px' width='24px' class='icon-nav-video'><use href='https://nicolasserrano.github.io/tools/libraries/video.svg#icon-nav-videos'></use></svg>"
        tdEl0.innerHTML += "<br>&nbsp;<a onclick=setIframes(this," + i + ") href='javascript:void(0);'>videos</a>";
    }
}
function setIframes(element, iTr) {
  var links;
  if (iTr == 0) {  // if the call comes from the first row, set iframes for the links of the page
    links = document.getElementsByTagName('a');
  } else {  // all the links of the row (TR)
    trElement = element.closest("TR");
    links = trElement.getElementsByTagName('a');
    trElement.setAttribute("class", "horizontalReady");
  }
  var len = links.length;
  ifs=document.getElementById("iframeSize");
  if (ifs != null) {
    iframeWidth=ifs.value;
  } else {
    iframeWidth = 400;
  }
  ifremeHeight = iframeWidth*9/16;
  for(var i=0; i<len; i++) {
    //links[i].target = "_blank";
    if (links[i].href.search("Panopto/Pages/Viewer.aspx") >= 0 || links[i].classList.contains('iframe')) {
      if ( typeof download !== 'undefined' && download != "No") {
        if (links[i].href.search("Panopto/Pages/Viewer.aspx") >= 0) {  // check it is a panopto video
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
        if (links[i].href.search("Panopto/Pages/Viewer.aspx") >= 0) {  // for panopto
          ifr.setAttribute("src", links[i].href.replace("Viewer", "Embed") + "&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all");
        } else {  // for youtube
          ifr.src = links[i].href.replace("watch?v=","embed/");
        }
      }
      ifr.width= iframeWidth;
      ifr.height=ifremeHeight;
      links[i].parentNode.insertBefore(document.createElement("br"), links[i].nextSibling)
      links[i].parentNode.insertBefore(ifr, links[i].nextSibling)
      links[i].parentNode.insertBefore(document.createElement("br"), links[i].nextSibling)
    }
  }
    setH = document.createElement("a")
  setH.setAttribute("onclick", "setHorizontal(" + iTr + ")")
  setH.setAttribute("id", "setH")
  setH.setAttribute("href", "javascript:void(0);")
  setH.innerHTML="<BR>Horizontal";
  if (element != null) {
    element.parentNode.insertBefore(document.createTextNode(""), element.nextSibling)
    element.parentNode.insertBefore(setH, element.nextSibling)
  }
}
 
function setHorizontal(iTr){
  var sheet = window.document.styleSheets[0];
  if (iTr != 0) {  // only apply to rows (tr) with class horizontalReady
      classValue = "tr.horizontalReady ";
  } else {
      classValue = "";
  }
  sheet.insertRule(classValue + 'td:nth-child(3) br { display: none; }', sheet.cssRules.length);
  sheet.insertRule(classValue + 'td:nth-child(3) p { display: inline; }', sheet.cssRules.length);
  sheet.insertRule(classValue + 'td:nth-child(3) * { font-size: 0px; }', sheet.cssRules.length);
  sheet.insertRule(classValue + 'td:nth-child(3) span * { font-size: 0px; }', sheet.cssRules.length);
  sheet.insertRule(classValue + 'td:nth-child(3) { font-size: 0px; }', sheet.cssRules.length);
  sheet.insertRule(classValue + 'table { width: max-content; }', sheet.cssRules.length);
}
