let breeds = [];


document.addEventListener("DOMContentLoaded", () => {
    loadImages();
    loadBreedOptions();

    document.addEventListener('change', function(e){
        if (e.target.id === "breed-dropdown") {
            filterDogBreeds(event.target.value);
        }
    })
})

function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl)
        .then( resp => resp.json())
        .then( data => {
            data.message.forEach( image => addImage(image))
        })

}

function addImage(url) {
    let container = document.getElementById('dog-image-container');
    let newImg = document.createElement('img');

    newImg.src = url; 
    container.appendChild(newImg);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

    fetch(breedUrl)
        .then( resp => resp.json())
        .then( data => {
            breeds = Object.keys(data.message)
            breeds.forEach(breed => addBreed(breed))
        })
}


function addBreed(breed){
    let ul = document.getElementById('dog-breeds'); 
    let li = document.createElement('li'); 
    li.innerText = breed 
    ul.appendChild(li);
    li.addEventListener('click', updateDogColor);
}

const updateDogColor = (event) => {
    event.target.style.color = 'red';
}

const filterDogBreeds = (letter) => {
    let ul = document.getElementById('dog-breeds');
    ul.querySelectorAll('li').forEach(li => li.remove());

    let filtered = breeds.filter(breed => breed[0] === letter);

    filtered.forEach(breed => addBreed(breed));
}