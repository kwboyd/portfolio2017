var el = document.getElementById('triangle-box');
var rect = el.getBoundingClientRect();
var triangle1 = document.getElementById("first-top-triangle");
var triangle2 = document.getElementById("triangletop");
var offset1 = rect.top;


function runOnScroll() {
  console.log(offset1);
  console.log(document.body.scrollTop);
    if (document.body.scrollTop >= 10) {
      triangle1.style.fill = "#61879E";
      triangle2.style.fill= "#61879E";
    } else if (document.body.scrollTop < 10){
      triangle1.style.fill = "#000";
      triangle2.style.fill= "#000";
    }
 };
window.addEventListener("scroll", runOnScroll);
