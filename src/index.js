console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded",function DOMLoadedHandler()
{
  fetchImages();
  fetchBreeds();
  const dropDown = document.getElementById("breed-dropdown");
  dropDown.addEventListener("change",filterBreeds);
});
function filterBreeds()
{
  const liList = document.getElementsByTagName('li')
  const choices = ["a","b","c","d"]
  for (const li of liList)
  {
    if (li.className === this.value)
    {
      li.style.display = "";//enable li
      //comment will ignore anything not listed
    } else //if (choices.includes(li.className))
    {
      li.style.display = "none";//disables li
    }
  }
}
function fetchBreeds()
{
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => addBreeds(json.message));
}
function addBreeds(breeds)
{
  const ul = document.getElementById("dog-breeds")
  for(const breed in breeds)
  {
    const li = document.createElement('li');
    li.dataset.name = breed;
    li.innerText = breed;
    li.className = breed[0];
    ul.append(li);
  }  
}
function fetchImages()
{
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(resp => resp.json())
  .then(json => addImages(json));
}
function addImages(images)
{
  const div = document.getElementById('dog-image-container');  
  for(const imgStr of images.message)
  {    
    img = document.createElement("img");
    img.src = imgStr;
    img.className = "dog-image"
    img.alt = "a dog pic"
    div.appendChild(img);
  }  
}