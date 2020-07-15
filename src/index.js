console.log('%c HI', 'color: firebrick');

let allDogBreeds = [];

const fetchFourImages = () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
        .then(response => response.json())
        .then(results => {
            results.message.forEach(image => addImage(image))
        })
}

const addImage = (dogPictureUrl) => {
    let dogImageContainer = document.querySelector('#dog-image-container');
    let img = document.createElement('img');

    img.src = dogPictureUrl;
    dogImageContainer.appendChild(img);
}

const fetchAllBreeds = () => {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
        .then(response => response.json())
        .then(results => {
            allDogBreeds = Object.keys(results.message)
            allDogBreeds.forEach(breed => addBreed(breed))
        })
}

const addBreed = (dogBreed) => {
    let ul = document.querySelector("#dog-breeds");
    let li = document.createElement('li');

    li.id = dogBreed;
    li.class = "dog-breed";
    li.innerText = dogBreed;
    ul.appendChild(li);
}

const updateDogLiColor = (dogElement) => {
    dogElement.style.color === 'red' ? dogElement.style.color = 'black' : dogElement.style.color = 'red';
}

const filterDogBreeds = (startingLetter) => {
    // Remove all of them
    let ul = document.querySelector("#dog-breeds");
    ul.querySelectorAll('*').forEach(n => n.remove());

    // Filter li elements by startingLetter
    let filteredBreeds = allDogBreeds.filter(breed => breed[0] === startingLetter);

    // run addBreed
    filteredBreeds.forEach(breed => addBreed(breed));
}

document.addEventListener('DOMContentLoaded', function(e) {
    fetchFourImages();
    fetchAllBreeds();

    document.addEventListener('click', function(e) {
        if (e.target.class === "dog-breed") {``
            updateDogLiColor(e.target);
        }
    })

    document.addEventListener('change', function(e) {
        if (e.target.id === "breed-dropdown") {
            filterDogBreeds(event.target.value);
        }
    })
})