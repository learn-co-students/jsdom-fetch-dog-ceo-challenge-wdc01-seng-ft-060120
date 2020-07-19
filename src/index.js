console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function(){

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const imageContainer = document.getElementById("dog-image-container")
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ulBreeds = document.getElementById("dog-breeds")
const selectMenu = document.getElementById("breed-dropdown")


ulBreeds.addEventListener("click", function(e){
    if (e.target.matches("li")) {
        toggleColor(e.target)
    }

})

selectMenu.addEventListener("change", function(e){
    filterBreeds(e.target.value)

})

function fetchPics() {
    fetch(imgUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        for (const pic of json.message) {
            createImg(pic);
          }
    })
}

function createImg(imageURL) {
    const imgTag = document.createElement("img")
    imgTag.src = imageURL
    imageContainer.appendChild(imgTag)
}

const toggleColor = (li) => {
    if (li.style.color === "red"){
        li.style.color = "black"
    }
    else {
        li.style.color = "red"
    }
} 

const filterBreeds = (letter) => {
    console.log(letter)
    const breedLis = document.querySelectorAll("li")
    for (const li of breedLis){
        if (li.dataset.first === letter){
            li.style.display = "list-item"
        }

        else {
            li.style.display = "none"
        }

    }
}

const fetchBreeds = () => {
    fetch(breedUrl)
    .then( response => response.json())
    .then(breedCollection => {
        for (const breed in breedCollection.message){
            if (breedCollection.message[breed][0]) {
                for (const breedPre of breedCollection.message[breed]){
                    createBreedLi(breedPre, breed)
                }
            }
            else {
                createBreedLi(breed)
            }
    }
    })
}

const createBreedLi = (breedPre, breedPost) => {
    const li = document.createElement("li")
    if (breedPost){
        li.innerText = `${breedPre} ${breedPost}`
    }
    else {
        li.innerText = breedPre
    }
    li.dataset.first = li.innerText[0]
    ulBreeds.appendChild(li)
}

fetchPics()
fetchBreeds()

})

