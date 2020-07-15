console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded",function DOMLoadedHandler()
{
  fetchImages();
});

function fetchImages()
{
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(resp => resp.json())
  .then(json => addImages(json));
}
function addImages(images)
{
  const div = document.getElementById('dog-image-container');
  console.log(images.message[0]);
  for(const imgStr of images.message)
  {
    console.log(imgStr)
    img = document.createElement("img");
    img.src = imgStr;
    img.className = "dog-image"
    img.alt = "a dog pic"
    div.appendChild(img);
  }  
}