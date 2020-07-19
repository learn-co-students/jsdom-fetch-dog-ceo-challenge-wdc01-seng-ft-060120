//console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", (e) => {
	const dogImgContainer = document.getElementById("dog-image-container");
	const breedsList = document.getElementById("dog-breeds");
	const select = document.getElementById("breed-dropdown");
	const filterButton = document.getElementById("filter");

	fetch(imgUrl)
		.then(resp => resp.json())
		.then(json => addImagesToDom(json));

	fetch(breedUrl)
		.then(resp => resp.json())
		.then(json => addBreedsToDom(json.message));

	function breedClickHandler(){
		this.style.color = "purple";
	}

	function cursorToPointer(){
		this.style.cursor = "pointer";
	}

	function filterBy(letter){
		breedsList.childNodes.forEach((breed) => {
			if(breed.textContent[0] == letter){
				breed.style.display = "";
			}
			else if(breed.textContent[0].match(/\w/g)){
				breed.style.display = "none";
			}
			else {
				return;
			}
		})
	}

	function applyFilter(){
		const filterValue = select.value;
		filterBy(filterValue);
	}

	function addBreedToDom(breedArray){
		if(breedArray[1].length){
			for(const subbreed of breedArray[1]){
				const subbreedLi = document.createElement("li");
				subbreedLi.textContent = `${breedArray[0]} (${subbreed})`;
				breedsList.append(subbreedLi);
				subbreedLi.addEventListener("mouseover", cursorToPointer);
				subbreedLi.addEventListener("click", breedClickHandler);
			}
		}
		else{
			const breedLi = document.createElement("li");
			breedLi.textContent = `${breedArray[0]}`
			breedsList.append(breedLi);
			breedLi.addEventListener("mouseover", cursorToPointer);
			breedLi.addEventListener("click", breedClickHandler);
		}
		filter.addEventListener("click", applyFilter);

	}

	function addBreedsToDom(json){
		for(const breed in json){
			addBreedToDom([breed, json[breed]]);
		}
	}

	function addImageToDom(url){
		const newDiv = document.createElement("div");
		const newImg = document.createElement("img");
		newDiv.class = "dogDiv";
		newImg.src = url;
		newDiv.append(newImg);
		dogImgContainer.append(newDiv);
	}

	function addImagesToDom(json){
		const urlArray = json.message;
		urlArray.forEach((url) => {
			addImageToDom(url);
		});
	}
})


