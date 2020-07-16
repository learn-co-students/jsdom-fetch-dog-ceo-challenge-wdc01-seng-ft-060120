console.log('%c HI', 'color: firebrick')



//Part 1
function fetchDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => dogPics(json));
}
  
function dogPics(json) {
    const main = document.getElementById('dog-image-container');
    for (var i=0; i<json["message"].length;i++){
        let img = document.createElement('img');
        img.src = json["message"][i];
        img.alt = "this is a dog";
        main.appendChild(img);
    }
}
  



//Part 2

function printBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => addBreedList(json));
}

function addBreedList(json) {
    //debugger;
    const list = document.getElementById('dog-breeds');
    for (let breed in json.message){
        const li = document.createElement('li');
        li.innerText = breed;
        li.className = breed[0];
        li.addEventListener('click', event => changeFont(event));
        list.append(li);
    }
}

function changeFont(event) {
    breedText = event.target
    breedText.style.color = "red"
}





document.addEventListener('DOMContentLoaded', function() {
    fetchDogs();
    printBreeds();

    //Part 4

    const dropdown = document.getElementById('breed-dropdown');

    dropdown.addEventListener('change', function(e){
        //console.log(e.target.value);
        const listElements = document.getElementsByTagName('li');
        console.log(listElements[0]);
        for (let li of listElements){
            if(li.className === e.target.value){
                li.style.display = "";
            }
            else {
                li.style.display = "none";
            }
        }

    })

    document.addEventListener
})