"use strict"
const api_key="f2345aa7d81b85b6865bc7698d7e6f06";
const secret="9daf2cc6e1fa4be1";
let currentvalue = "christiano ronaldo";
let page=1;
async function fetchGalleryData(text,page,){
  let url=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&format=json&text=${text}&page=${page}&per_page=50&nojsoncallback=1`;
  let res = await fetch(url);
  let json = await res.json();
  let Photourls = json.photos.photo.map(function(el,index,array){
    let url = `https://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}.jpg`;
    const photodesc ={
      "url":url,
      title:el.title,
      "id":el.id,
    };
    return photodesc;
  });
  return  Photourls;
};

fetchGalleryData(currentvalue,page).then(updateGallerySections);

function updateGallerySections(result){
  result.forEach(function(val,index,arr){
    switch(index%4){
      case 0:galleryImageAppend("sec1",val); break;
      case 1:galleryImageAppend("sec2",val); break;
      case 2:galleryImageAppend("sec3",val); break;
      case 3:galleryImageAppend("sec4",val); break;
    }
  });
}

function  galleryImageAppend(secid,val){
  const secdiv =document.getElementById(secid);
  const img = document.createElement("img");
  img.setAttribute("src",val.url);
  img.classList.add("img-responsive");
  img.setAttribute("id",val.id);
  img.setAttribute("alt",val.title);
  secdiv.append(img);
  const span = document.createElement("span");
  span.textContent = val.title;
  secdiv.append(span);
}

 function  removeGalleryImages(){
    let hero = document.querySelectorAll(".hero");
    hero[0].innerHTML=" ";
    Array.from(hero).forEach(function(el){
       el.innerHTML=" ";
       console.log(el.innerHTML);
    });
 }

 let button = document.getElementById('searchBtn');
 let inputbox = document.getElementById("searchBox");
 button.addEventListener('click', function (e) {
   page=1;
      e.preventDefault();
       currentvalue =inputbox.value;
      removeGalleryImages();
      fetchGalleryData(currentvalue,page).then(updateGallerySections);
 });

 window.addEventListener('scroll', function (e) {
        page=page+1;
        if((document.body.scrollHeight*3/4)<=(pageYOffset)){
          fetchGalleryData(currentvalue,page).then(updateGallerySections);
        }
 });
