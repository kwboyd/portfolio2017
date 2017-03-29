var worksStart;
var skillsStart;
var resumeStart;
var contactStart;
var els = document.getElementsByClassName('triangle-change');
var menu = document.getElementById('menu');
var nav = document.getElementById('nav');
var menuClose = document.getElementById('menu-close');
var modalContainer = document.getElementById('modal-container');
var worksContainer = document.getElementById('works-container');
var offsetWorks;
var offsetSkills;
var offsetResume;
var offsetContact;
var portfolioHtml;
getPortfolio();

window.addEventListener("scroll", runOnScroll);

nav.addEventListener("click", function() {
  menu.style.right = "0px";
})

menuClose.addEventListener("click", function() {
  menu.style.right = "-200px";
})

function runOnScroll() {
  var elementScroll = document.documentElement.scrollTop;
  var bodyScroll = document.body.scrollTop;
  if (document.documentElement.scrollTop > document.body.scrollTop) {
    fillColor(elementScroll);
  } else if (document.documentElement.scrollTop < document.body.scrollTop) {
    fillColor(bodyScroll);
  };
 };

 function fillColor(scroll) {
   console.log(scroll);
   for (var i=0; i<els.length; i++) {
     if (scroll >= 15 && scroll <= offsetWorks) {
       els[i].style.fill = "#61879E";
       els[i].style.color = "#61879E";
       menu.style.backgroundColor = "#61879E";
      } else if (scroll > offsetWorks && scroll <= offsetSkills){
       els[i].style.fill = "#47568B";
       els[i].style.color = "#47568B";
       menu.style.backgroundColor = "#47568B";
     } else if (scroll > offsetSkills && scroll <= offsetResume) {
        els[i].style.fill = "#3D306C";
        els[i].style.color = "#3D306C";
        menu.style.backgroundColor = "#3D306C";
      } else if (scroll > offsetResume && scroll <= offsetContact) {
        els[i].style.fill = "#805F81";
        els[i].style.color = "#805F81";
        menu.style.backgroundColor = "#805F81";
      }
     else if (scroll < 70 || scroll > offsetContact){
       els[i].style.fill = "#000";
       els[i].style.color = "#000";
       menu.style.backgroundColor = "#000";
     }
   }
 }

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
  for (var i in data) {
    var p = data[i];
    (function(piece) {
    var portfolioHtml = document.createElement("div");
    portfolioHtml.className = 'portfolio-box';
    portfolioHtml.innerHTML =
    "<img class='portfolio-image' src='" + piece.image + "' alt=" + piece.title + "'>"
    + "<div class='overlay';'><div class='overlay-text'><p>"
    + piece.title + "</p></div>";
    worksContainer.appendChild(portfolioHtml);
  })(p);
};
  if (data.length % 3 == 1) {
    var fillerOne = document.createElement("div");
    fillerOne.className = 'portfolio-box filler';
    var fillerTwo = document.createElement("div");
    fillerTwo.className = 'portfolio-box filler';
    worksContainer.appendChild(fillerOne);
    worksContainer.appendChild(fillerTwo);
  } else if (data.length % 3 == 2) {
    var fillerOne = document.createElement("div");
    fillerOne.className = 'portfolio-box filler';
    worksContainer.appendChild(fillerOne);
  }
  createOverlays(data);
};

function createOverlays(data) {
  var overlays = document.getElementsByClassName('overlay');
  for (var z = 0; z < overlays.length; z ++) {
    (function(z){
    overlays[z].addEventListener('click', function(){
      openModal(data, z);
    });
  })(z);
  };
  setSections();
};

function setSections() {
  setTimeout(function(){
  worksStart = document.getElementById('about-bottom');
  skillsStart = document.getElementById('works-bottom');
  resumeStart = document.getElementById('skills-bottom');
  contactStart = document.getElementById('resume-bottom');
  offsetWorks = worksStart.offsetTop - 80;
  offsetSkills = skillsStart.offsetTop - 80;
  offsetResume = resumeStart.offsetTop - 100;
  offsetContact = contactStart.offsetTop - 350;
}, 500);
}

function openModal(data, o) {
  nav.style.display = 'none';
  modalContainer.innerHTML = '';
  modalContainer.style.display = 'block';
  var portfolioModal = document.createElement("div");
  portfolioModal.className = 'portfolio-modal';
  portfolioModal.innerHTML =
  "<span class='fa fa-close modal-close' onclick='closeModal();'></span><p class='modal-title'>" + data[o].title + "</p><div class='modal-top'>" +
  "<img src='" + data[o].image + "' alt=" + data[o].title + "'>" +
  "<div class='modal-description'><p>" + data[o].description + "</p>" +
  "<p class='skills'> Skills: " + data[o].skills + "</p></div></div>" +
  "<div class='link-box'><a class='site-link live' target='_blank' href='" + data[o].link + "'><p> VISIT SITE </p></a>" +
  "<a class='site-link repo' target='_blank' href='" + data[o].repo + "'><p> VISIT REPO </p></a>" +
  "</div";
  modalContainer.appendChild(portfolioModal);
}

function closeModal() {
  nav.style.display = 'block';
  modalContainer.innerHTML = '';
  modalContainer.style.display = 'none';
}
