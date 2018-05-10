"use strict"
let api_key="f2345aa7d81b85b6865bc7698d7e6f06";
let secret="9daf2cc6e1fa4be1";


async function fetchGalleryData(text){
let url=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&format=json&text=${text}&page=2&per_page=20&nojsoncallback=1`;
 let photosResonse = await fetch(url);
 let photosJSon=  await photosResonse.json();
 let  Photourls=    photosJSon.photos.photo.map(function(el,index,array){
       let url =`https://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}.jpg`;
       let photodesc ={
         "url":url,
          title:el.title,
       };

       return photodesc;
    });
   return  Photourls;
};

fetchGalleryData("cat").then((result)=>{

   result.forEach(function(val,index,arr){
     switch(index%4){
       case 0:galleryImageAppend("sec1",val);
              break;
       case 1:galleryImageAppend("sec2",val);
              break;
       case 2:galleryImageAppend("sec3",val);
              break;
       case 3:galleryImageAppend("sec4",val);
              break;
     }
   });

});

function  galleryImageAppend(secid,val){
  let secdiv =document.getElementById(secid);
  let img = document.createElement("img");
  img.setAttribute("src",val.url);
  img.classList.add("img-responsive");
  img.setAttribute("alt",val.title);
  secdiv.append(img);
  let span = document.createElement("span");
  span.textContent = val.title;
  secdiv.append(span);

}
