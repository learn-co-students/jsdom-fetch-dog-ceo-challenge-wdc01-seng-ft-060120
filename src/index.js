console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function fetchDogPics(){
  fetch(imgUrl)
  .then(response => response.json())
  .then(json => postDogPics(json['message']))
}

function postDogPics(picUrls) {
  const dogPark = document.getElementById('dog-image-container');
  picUrls.forEach(url => {
    const imgDiv = document.createElement('div')
    imgDiv.innerHTML = `<img src=${url}>`
    dogPark.appendChild(imgDiv)
  })
}


function fetchDogBreeds(){
  fetch(breedUrl)
  .then(response => response.json())
  .then(json => postDogBreeds(Object.keys(json['message'])))
}

function postDogBreeds(breeds) {
  const breedList = document.getElementById('dog-breeds');
  breeds.forEach(breed => {
    const breedLi = document.createElement('li')
    breedLi.innerText = `${breed}`
    breedList.appendChild(breedLi)
  })
}



document.addEventListener("DOMContentLoaded", function () {
  fetchDogPics();
  fetchDogBreeds();
  document.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() == 'li'){
      e.target.style.color = 'red';
    }
  });

  const sortBreed = document.getElementById('breed-dropdown')
  sortBreed.addEventListener("change", function(e){
    const breeds = document.querySelectorAll("li")
    breeds.forEach(breedLi => {
      breedLi.hidden = false;
      if(e.target.value !== "-" && breedLi.innerText[0] !== e.target.value){
        breedLi.hidden = true;
      } else if(e.target.value == "-"){
        breedLi.hidden = false;
      }
    });
  });

  });
