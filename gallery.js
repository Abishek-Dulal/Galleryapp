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
        console.log(Photourls[0].url);
}

fetchGalleryData("cat");
