var worksStart = document.getElementById('about-bottom');
var els = document.getElementsByClassName('triangle-change');
var offsetWorks = worksStart.offsetTop;
var portfolioHtml;
getPortfolio();


function runOnScroll() {
  for (var i=0; i<els.length; i++) {
    if (document.body.scrollTop >= 15 && document.body.scrollTop <= offsetWorks) {
      els[i].style.fill = "#61879E";
    } else if (document.body.scrollTop > offsetWorks){
      els[i].style.fill = "#47568B";
    }
    else {
      els[i].style.fill = "#000";
    }
  }
 };
window.addEventListener("scroll", runOnScroll);

function getPortfolio(){
    var request = new XMLHttpRequest();
    request.open('GET', 'data.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText);
        parsePortfolio(data);
      } else {
        console.log("Error retreiving portfolio data.");
      }
    };

    request.onerror = function() {
      console.log("Error retreiving portfolio data.");
    };

    request.send();
};

function parsePortfolio(data) {
  var worksContainer = document.getElementById('works-container');
  for (var i in data) {
    var p = data[i];
    (function(piece) {
    var portfolioHtml = document.createElement("div");
    portfolioHtml.className = 'portfolio-box';
    portfolioHtml.innerHTML =
    "<img class='portfolio-image' src='" + piece.image + "' alt=" + piece.title + "'>"
    + "<div class='overlay';'><div class='overlay-text'><p>"
    + piece.title + "</p></div>";
    console.log(piece);
    document.getElementById('works-container').appendChild(portfolioHtml);
  })(p);
};
  if (data.length % 3 == 1) {
    var fillerOne = document.createElement("div");
    fillerOne.className = 'portfolio-box filler';
    var fillerTwo = document.createElement("div");
    fillerTwo.className = 'portfolio-box filler';
    document.getElementById('works-container').appendChild(fillerOne);
    document.getElementById('works-container').appendChild(fillerTwo);
  } else if (data.length % 3 == 2) {
    var fillerOne = document.createElement("div");
    fillerOne.className = 'portfolio-box filler';
    document.getElementById('works-container').appendChild(fillerOne);
  }
  createOverlays(data);
};

function createOverlays(data) {
  var overlays = document.getElementsByClassName('overlay');
  console.log(overlays);
  for (var z = 0; z < overlays.length; z ++) {
    (function(z){
    console.log(overlays[z]);
    overlays[z].addEventListener('click', function(){
      openModal(data, z);
    });
  })(z);
  };
};

function openModal(data, o) {
  document.getElementById('modal-container').innerHTML = '';
  document.getElementById('modal-container').style.display = 'block';
  console.log(o);
  console.log(data[o]);
  var portfolioModal = document.createElement("div");
  portfolioModal.className = 'portfolio-modal';
  portfolioModal.innerHTML =
  "<span class='fa fa-close' onclick='closeModal();'></span><div class='modal-top'>" +
  "<img src='" + data[o].image + "' alt=" + data[o].title + "'>" +
  "<div class='modal-description'><p>" + data[o].description + "</p>" +
  "<p class='skills'> Skills: " + data[o].skills + "</p></div></div>" +
  "<div class='link-box'><a class='site-link live' target='_blank' href='" + data[o].link + "'><p> VISIT SITE </p></a>" +
  "<a class='site-link repo' target='_blank' href='" + data[o].repo + "'><p> VISIT REPO </p></a>" +
  "</div";
  document.getElementById('modal-container').appendChild(portfolioModal);
}

function closeModal() {
  document.getElementById('modal-container').innerHTML = '';
  document.getElementById('modal-container').style.display = 'none';
}
