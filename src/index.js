document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    function fetchImages() {
        fetch(imgUrl)
            .then(resp => resp.json())
            .then(data => renderImages(data.message))
    }

    function renderImages(imgArray) {
        for (const imgSrc of imgArray) {
            renderImg(imgSrc)
        }
    }

    function renderImg(imgSrc) {
        const imgContainer = document.getElementById('dog-image-container')
        const div = document.createElement('div')
        const img = document.createElement('img')
        img.src = imgSrc
        img.alt = 'dog image'

        div.appendChild(img)
        imgContainer.appendChild(div)
    }
    function fetchBreeds() {
        fetch(breedUrl)
            .then(resp => resp.json())
            .then(data => renderBreeds(data.message))
    }

    // get all the dog breed in one array
    function parseBreeds(breedObj) {
        const breedArray = []
        for (const key in breedObj) {
            if (breedObj[key].length != 0) {
                for (const breedName of breedObj[key]) {
                    breedArray.push(breedName)
                }
            }
        }
        return breedArray
    }

    // add all those breeds to the ul on the DOM
    function renderBreedfromArray(breedArray) {
        const ul = document.getElementById('dog-breeds')

        for (const element of breedArray) {
            const li = document.createElement('li')
            li.textContent = element
            ul.appendChild(li)

            changeColorOnClick(li)
        }
    }

    function changeColorOnClick(element) {
        element.addEventListener('click', () => {
            element.style.color = 'red'
        })
    }

    function renderBreeds(breedObj) {
        const breedArray = parseBreeds(breedObj)
        const selector = document.getElementById('breed-dropdown')

        selector.addEventListener('change', e => {
            const ul = document.getElementById('dog-breeds')
            const filteredArray = breedArray.filter(element => element.charAt(0) === selector.value)
            ul.innerHTML = ''
            renderBreedfromArray(filteredArray)
        })

        renderBreedfromArray(breedArray)
    }

    fetchImages()
    fetchBreeds()
})
