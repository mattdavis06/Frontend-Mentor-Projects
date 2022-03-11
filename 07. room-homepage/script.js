//  Website Content Objects ---------- **
const websiteContent = [
    {
        id: 1,
        img:'images/desktop-image-hero-1.jpg',
        mobileImg: 'images/mobile-image-hero-1.jpg',
        leadText: 'Discover innovative ways to decorate',
        contentText: 'We provide unmatched quality, comfort, and style for property owners across the country Our experts combine form and function in bringing your vision to life Create a room in your own style with our collection and make your property a reflection of you and what you love'
    },
    {
        id: 2,
        img:'images/desktop-image-hero-2.jpg',
        mobileImg: 'images/mobile-image-hero-2.jpg',
        leadText: 'We are available all across the globe',
        contentText: 'With stores all over the world, it\'s easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don\'t hesitate to contact us today.'
    },
    {
        id: 3,
        img:'images/desktop-image-hero-3.jpg',
        mobileImg: 'images/mobile-image-hero-3.jpg',
        leadText: 'Manufactured with the best materials',
        contentText: 'Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.'

    }
] 

// Variables ---------- **
const bodyClasses = document.body.classList;
const sliderBg = document.querySelector('.slider-bg-wrapper')
const leadText = document.querySelector('.shop-lead-text h1')
const contentText = document.querySelector('.shop-text p')
const leftSliderBtn = document.querySelector('.slider-left')
const rightSliderBtn = document.querySelector('.slider-right')
const navToggleIcon = document.querySelector('.navbar-toggle-icon')
const navToggleCloseIcon = document.querySelector('.navbar-close-icon')
const navToggleLinksWrapper = document.querySelector('.navbar-toggle-links-wrapper')

let sliderIndex = 1
let windowWidth
let timer = 0;

// Adds Slider Images, Text & Active Styles to DOM - With a timeout on the remove/add classes
function addContentToDOM() {
    for(let i = 0; i < websiteContent.length; i++) {

        loadImageCheck()

        // NOTE: sliderIndex -1 here, as image file names are name 1,2,3 and array is zero based
        leadText.textContent = websiteContent[sliderIndex - 1].leadText
        contentText.textContent = websiteContent[sliderIndex - 1].contentText

        removeActiveClass()
        
        setTimeout(() => {

            leadText.classList.add('active')
            contentText.classList.add('active')
        }, 250); 
    }    
}

// Right Slider Logic -------- **
function rightSliderAction() {
    sliderIndex++

    if(sliderIndex > websiteContent.length) {
        sliderIndex = 1
    }

    addContentToDOM()
}

// Left Slider Logic -------- **
function leftSliderAction() {
    sliderIndex--
    
    if(sliderIndex < 1) {
        sliderIndex = websiteContent.length
    }

    addContentToDOM()
}

// Checks for window width, stores to GV, then load mobile or desktop images w/transition -------- **
function loadImageCheck() {
    windowWidth = document.documentElement.clientWidth

    if( windowWidth <= 500) {
        sliderBg.style.background = `
        url('images/mobile-image-hero-${sliderIndex}.jpg') 
        no-repeat center center / cover
        `
        sliderBg.style.transition = `background 1s linear`
    } else {
        sliderBg.style.background = `
        url('images/desktop-image-hero-${sliderIndex}.jpg') 
        no-repeat center center / cover
        `
        sliderBg.style.transition = `background 1s linear`
    }
}

// Removes Active Classes -------- **
function removeActiveClass() {
    leadText.classList.remove('active')
    contentText.classList.remove('active')
}

// Removes Transitions Visual on Load and Resize Event Listeners
function removeTransitions() {
    if(timer) {
        clearTimeout(timer)
        timer = null
    }
    
    bodyClasses.add('stop-transitions');

    timer = setTimeout(() => {
        bodyClasses.remove('stop-transitions')
        timer = null
    }, 100)
}

// Event Listeners for Slider Btns -------- **
rightSliderBtn.addEventListener('click', rightSliderAction)
leftSliderBtn.addEventListener('click', leftSliderAction)

// Event Listeners Nav Toggle Menu -------- **
navToggleIcon.addEventListener('click', () => {
    navToggleLinksWrapper.classList.add('active')
})
navToggleCloseIcon.addEventListener('click', () => {
    navToggleLinksWrapper.classList.remove('active')
})

// Event Listeners to Load Mobile or Desktop Img on load/resize -------- **
window.addEventListener('resize', () => {
    removeTransitions()
    loadImageCheck()
})
window.addEventListener('load', () => { 
    removeTransitions()
    loadImageCheck()
})
