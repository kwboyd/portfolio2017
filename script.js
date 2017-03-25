 var works = document.getElementById('bio');
var els = document.getElementsByClassName('triangle-change');
console.log(els);
// var worksTop = works.getBoundingClientRect();
var offsetWorks = works.offsetTop;
console.log(offsetWorks);
var triangle1desktop = document.getElementById("first-top-triangle");
var triangle2desktop = document.getElementById("triangletop");
var triangle1mobile = document.getElementById("first-mobile-triangle");
var triangle2mobile = document.getElementById("triangletopmobile");
// var offset1 = rect.top;


function runOnScroll() {
  console.log(document.body.scrollTop);
  for (var i=0; i<els.length; i++) {
    if (document.body.scrollTop >= 10 && document.body.scrollTop <= offsetWorks) {
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
