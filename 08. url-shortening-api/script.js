const navToggleMenu = document.querySelector('.nav-toggle-menu')
const navToggleLinks = document.querySelector('.nav-toggle-links')
const inputField = document.querySelector('.input-field')
const inputErrorMsg = document.querySelector('.input-error-msg')
const formControl = document.querySelector('.form-control')
const shortenItContainer = document.querySelector('.shorten-it-links')

let linksArr = []

// Gets submitted input value and calls getURL FUNC to API
function submitURL() {
    formControl.addEventListener('submit', (e) => {
        e.preventDefault()

        // Calls Input Error FUNC
        inputEmptyError(e) 
      
        const originalURL = e.target[0].value
        getURL(originalURL)
    })
}

// API FUNC, stores the full and short links, then passes to create the element FUNC
async function getURL(originalURL) {
    const API_URL = `https://api.shrtco.de/v2/shorten?url=${originalURL}` 
    const res = await fetch(API_URL)
    const data = await res.json()

    const { full_short_link, original_link } = data.result

    createShortLinkEl(original_link, full_short_link)
}

// Creates Element in DOM, with classes and full/short link data
function createShortLinkEl(original_link, full_short_link) {

    // Trims original URL to 30 characters if > 30, for visual purposes
    let trimmedURL = ''
    
    if(original_link.length > 30) {
       trimmedURL = original_link.substr(0, 30) + '....'
    } else {
        trimmedURL = original_link
    }
    
    // Creates Element
    const linkWrapper = document.createElement('div')
    linkWrapper.classList.add('link-wrapper')
    linkWrapper.innerHTML = `
    <div class="original-link">
      <p>${trimmedURL}</p>
      <div class="link-break"></div>
    </div>
    <div class="shortened-link">
      <p>${full_short_link}</p>
      <button class="btn sq-btn copy">Copy</button>
    </div>
    `
    shortenItContainer.append(linkWrapper)

    // Calls LS FUNC and passes created El
    storeInLS(linkWrapper)

    // Calls copyBtn FUNC
    copyLinkBtn()   

    // Resets input to nothing
    inputField.value = ''
}

// Pushes outterHTML element value to linksArr, then to Local Storage
function storeInLS(linkWrapper) {
    let linkHTML = linkWrapper.outerHTML
    linksArr.push(linkHTML)

    localStorage.setItem('shortLinks', JSON.stringify(linksArr))  

    // .join(''). removes , in the DOM
    shortenItContainer.innerHTML = linksArr.join('')
}

// Gets data from Local Storage, updates linksArr with data, then displays in the DOM. 
function checkLS() {
    if(localStorage.getItem('shortLinks')) {
        let storedLinks = JSON.parse(localStorage.getItem('shortLinks'))

        linksArr = storedLinks

        // .join(''). removes , in the DOM
        shortenItContainer.innerHTML = linksArr.join('') 
    }
}

// Adds 'copied' text and style to btn when clicked
function copyLinkBtn() {
    const copyBtn = document.querySelectorAll('.copy')
    const shortLinks = document.querySelectorAll('.shortened-link p')
    copyBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.add('copied')
            btn.textContent = 'Copied!'
        })
        copyToClipboard(shortLinks)
    })
}

// Copies short link value to clipboard
async function copyToClipboard(shortLinks) {
    if(shortLinks.length > 0){
        shortLinks.forEach(link => {
            navigator.clipboard.writeText(link.innerText)
        })
    }
}

// Displays error and style on input field if empty 
function inputEmptyError(e) {
    if(e.target[0].value === '') {
        inputField.classList.add('error')
        inputErrorMsg.classList.add('error')
    } else {
        inputField.classList.remove('error')
        inputErrorMsg.classList.remove('error')
    }
}

// EV for Nav Toggle Menu
navToggleMenu.addEventListener('click', () => {
    navToggleLinks.classList.toggle('active')
})

// Call FUNCS on load
submitURL()
checkLS()
copyLinkBtn()
