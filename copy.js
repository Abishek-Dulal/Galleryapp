"use strict"

let imgarr=Array.from(document.getElementsByTagName("img"));



window.addEventListener('resize', function (e) {

});


window.onload = function(){
    let imgarr=Array.from(document.getElementsByTagName("img"));
    imgarr.forEach(function(val){
      let ratio=val.width/val.height;
      let h=300;
      let w= ratio*h;
      val.style.width=w;
      val.style.height=h;
    });;


}
