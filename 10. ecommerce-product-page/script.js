// ------------------------------------------------
// Get ScreenWidth
function screenWidth() {
    let screenWidth = window.innerWidth
    return screenWidth
}

// ------------------------------------------------
// Nav Toggle Menu
const navToggleIcon = document.querySelector('.nav-toggle-icon')
const navToggleMenu = document.querySelector('.nav-toggle-menu-wrapper')
const navToggleItems = document.querySelector('.nav-toggle-items')
const closeToggleIcon = document.querySelector('.nav-toggle-close-icon')

function openNavToggleMenu() {
    closeNavToggleMenu()
    navToggleMenu.classList.add('active')
    navToggleItems.classList.add('active')
}
 
function closeNavToggleMenu() {
    closeToggleIcon.addEventListener('click', () => {
        navToggleMenu.classList.remove('active')
        navToggleItems.classList.remove('active')
    })
}

navToggleIcon.addEventListener('click', openNavToggleMenu)

// ----------------------------------------------------
// LightBox Modal
const productImgActive = document.querySelector('.product-img.active')
const lightbox = document.querySelector('.lightbox-wrapper')
const lightboxCloseBtn = document.querySelector('.close-btn')
const lightboxPrevBtn = document.querySelector('.prev-arrow')
const lightboxNextBtn = document.querySelector('.next-arrow')
const lightboxImgActive = document.querySelector('.lightbox-imgs-wrapper .product-img')
const lightboxProductThumbnails = document.querySelector('.product-thumbnail-wrapper.lightbox').querySelectorAll('.product-thumbnail.lightbox')


// LightBox Open and Close
function openAndCloseLightbox() {
    lightbox.classList.add('active')
    lightboxCloseBtn.addEventListener('click', () => {
        lightbox.classList.remove('active')
    }) 
}

// Lightbox Slider
let sliderIdx = 1
let activeThumbIdx = 1

lightboxProductThumbnails.forEach((thumbnail, idx) => {
    thumbnail.addEventListener('click', () => {
        removeActiveThumbnail(lightboxProductThumbnails)
        thumbnail.classList.add('active')
        sliderIdx = idx + 1
        activeThumbIdx = idx + 1
        lightboxImgActive.innerHTML = `<img src="/images/image-product-${sliderIdx}.jpg" alt="product-image" />`
    })
})

// Lightbox Slider - Next Btn
lightboxNextBtn.addEventListener('click', () => {
    if (sliderIdx >= lightboxProductThumbnails.length) {
        sliderIdx = 0
        activeThumbIdx = 0
    }

    lightboxProductThumbnails.forEach((thumbnail, idx) => {
            if (idx === activeThumbIdx) {
                removeActiveThumbnail(lightboxProductThumbnails)
                thumbnail.classList.add('active')
            }
    })
    
    sliderIdx++
    activeThumbIdx++
    lightboxImgActive.innerHTML = `<img src="/images/image-product-${sliderIdx}.jpg" alt="product-image" />`
})

//  Lightbox Slider - Prev Btn
lightboxPrevBtn.addEventListener('click', () => {
    if (sliderIdx <= 1) {
        sliderIdx = lightboxProductThumbnails.length + 1
        activeThumbIdx = lightboxProductThumbnails.length + 1
    } 

    lightboxProductThumbnails.forEach((thumbnail, idx) => {
            if (idx + 2 === activeThumbIdx) {
                removeActiveThumbnail(lightboxProductThumbnails)
                thumbnail.classList.add('active')
            }
    })

    sliderIdx--
    activeThumbIdx--
    lightboxImgActive.innerHTML = `<img src="/images/image-product-${sliderIdx}.jpg" alt="product-image" />`
})

productImgActive.addEventListener('click', openAndCloseLightbox)

// ------------------------------------------------------
// Img Thumbnails - Product Page
const productThumbnails = document.querySelector('.product-thumbnail-wrapper').querySelectorAll('.product-thumbnail')

productThumbnails.forEach((thumbnail, idx) => {
    thumbnail.addEventListener('click', () => {
        removeActiveThumbnail(productThumbnails)
        thumbnail.classList.add('active')
        productImgActive.innerHTML = `<img src="/images/image-product-${idx + 1}.jpg" alt="product-image" />`
    })
})

function removeActiveThumbnail(imgThumbnails) {
    imgThumbnails.forEach(thumbnail => thumbnail.classList.remove('active'))
}

// ----------------------------------------------------
// Cart Hover
const cartIcon = document.querySelector('.cart')
const cartWrapper = document.querySelector('.cart-wrapper')
const cartWrapperEmpty = document.querySelector('.cart-wrapper.empty')
const cartWrapperFull = document.querySelector('.cart-wrapper.full')

let cartIsEmpty = true
let mouseOverCart = false

// Desktop Cart Hover Over - Check for empty of full cart, applies transitions styles
function cartMouseHoverOver() {
    if (cartIsEmpty === true) {
        transitionsHoverOver(cartWrapperEmpty)
    } else if (cartIsEmpty === false) {
        transitionsHoverOver(cartWrapperFull)
    }
}

// Desktop Cart Hover Out - Check for empty of full cart, applies transitions styles
function cartMouseHoverOut() {
    if (cartIsEmpty === true) { 
        transitionsHoverOut(cartWrapperEmpty)
    } else if (cartIsEmpty === false) {
        transitionsHoverOut(cartWrapperFull)
    }
}

// Mobile Cart Click - Check for empty or full cart, add/remove class
function cartClicked() {
    if (cartIsEmpty === true) {
        resetStyles(cartWrapperEmpty)
        cartWrapperEmpty.classList.toggle('mob-empty')
    } else if (cartIsEmpty === false) {
        resetStyles(cartWrapperFull)
        cartWrapperFull.classList.toggle('mob-full')
    }
}

// Transitions for Hover Over 
function transitionsHoverOver(cartWrapper) {
    cartWrapper.style.display = 'block'
    cartWrapper.style.visibility = 'visible'
    cartWrapper.style.opacity = '1'
}

// Transitions for Hover Out
function transitionsHoverOut(cartWrapper) {
    cartWrapper.style.opacity = '0'
    cartWrapper.style.transition = 'opacity 0.5s'
}

// Reset styles for cartWrapper on Resize for cartClicked
function resetStyles(cartWrapper) {
    cartWrapper.style.display = ''
    cartWrapper.style.opacity = ''
    cartWrapper.style.visibility = ''
}
 
// Hover Over Cart Wrapper - sets true and calls mouseOverCartCheck
function mouseOverCartTrue() {
    mouseOverCart = true
    mouseOverCartCheck(cartWrapperFull)
}

// Hover Over Cart Wrapper - sets false and calls mouseOverCartCheck
function mouseOverCartFalse() {
    mouseOverCart = false
    mouseOverCartCheck(cartWrapperFull)
    cartWrapperFull.style.display = 'none'
}

// Hover Over Cart Wrapper Check
function mouseOverCartCheck(cartWrapper) {
    if (mouseOverCart === true) {
        transitionsHoverOver(cartWrapper)
    } else if (mouseOverCart === false) {
        transitionsHoverOut(cartWrapper)
    }
}

// Disable Cart Hover on Mobile & Enable Click on Mobile
function cartHover() {
    if (screenWidth() <= 540) {
        cartIcon.removeEventListener('mouseover', cartMouseHoverOver)
        cartIcon.removeEventListener('mouseout', cartMouseHoverOut)
        cartIcon.addEventListener('click', cartClicked)
        cartWrapperFull.removeEventListener('mouseover', mouseOverCartTrue)
        cartWrapperFull.removeEventListener('mouseout', mouseOverCartFalse)
    } else {
        cartIcon.addEventListener('mouseover', cartMouseHoverOver)
        cartIcon.addEventListener('mouseout', cartMouseHoverOut)
        cartIcon.removeEventListener('click', cartClicked)
        cartWrapperFull.addEventListener('mouseover', mouseOverCartTrue)
        cartWrapperFull.addEventListener('mouseout', mouseOverCartFalse)
    }
}

// ------------------------------------------------------
// Qty Counter & Add to basket

const minusQtyBtn = document.querySelector('.minus-qty-btn')
const plusQtyBtn = document.querySelector('.plus-qty-btn')
const qtyInputNum = document.querySelector('.qty-input span')
const addToCartBtn = document.querySelector('.add-to-cart-btn')
const cartBubbleIcon = document.querySelector('.cart')
const cartContents = document.querySelector('.cart-wrapper.full .cart-contents')
const productDescription = document.querySelector('.product-headers h2')
const productPrice = document.querySelector('.product-price span')
const productImg = document.querySelector('.product-thumbnail img')

let qtyCounter = 0

// Add "disabled" styling on -/+ button, depending on input qty
function qtyCounterMinMax() {
    if (qtyCounter <= 0) {
        minusQtyBtn.style.opacity = '0.5'
    } else if (qtyCounter > 9) {
        plusQtyBtn.style.opacity = '0.5'
    } else if (qtyCounter < 10) {
        plusQtyBtn.style.opacity = '1'
        minusQtyBtn.style.opacity = '1'
    }

    addToCartDisabledCheck()
}

// Disable/Enable "add to cart" btn, if qty is === 0 or > 0
function addToCartDisabledCheck() {
    if (qtyCounter === 0) {
        addToCartBtn.disabled = true
        addToCartBtn.style.cursor = 'not-allowed'
    } else {
        addToCartBtn.disabled = false
        addToCartBtn.style.cursor = 'pointer'
    }
}

// Qty Minus Btn 
minusQtyBtn.addEventListener('click', () => {
    qtyCounter--
    qtyInputNum.textContent = qtyCounter

    qtyCounterMinMax()
    
    if (qtyCounter <= 0) {
        qtyCounter = 0
        qtyInputNum.textContent = 0
    }
    
    addToCartDisabledCheck()
})

// Qty Plus Btn 
plusQtyBtn.addEventListener('click', () => {
    qtyCounter++
    qtyInputNum.textContent = qtyCounter

    qtyCounterMinMax()

    if (qtyCounter > 10) {
        qtyCounter = 10
        qtyInputNum.textContent = qtyCounter
       
    }

    addToCartDisabledCheck()
})

qtyCounterMinMax()

// --------------------------------------
// Add To Cart

let cartItems = []
let itemsQty = []
let deleteBtns = []

// Gather product data from product page, adds to cart
function addToCart() {
    let itemImg = productImg.src
    let itemDescription = productDescription.textContent
    let itemPrice = +productPrice.textContent
    let itemQty = +qtyInputNum.textContent
    let itemTotalPrice = itemPrice * itemQty

    const productEl = document.createElement('div')
    productEl.classList.add('cart-item')
    productEl.innerHTML = `
    <div class="cart-product-img" >
        <img src="${itemImg}" alt="product-thumbnail-1">
    </div>
    <div class="cart-product-item">
        <p class="item-description">${itemDescription}</p>
        <div class="item-pricing">
        <p class="item-price">$${itemPrice}</p>
        <span class="item-qty">x ${itemQty}</span>
        <span class="item-total-price">$${itemTotalPrice}</span>
        </div>
    </div>
    <div class="delete-icon">
        <svg
        width="14"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        >
        <defs>
            <path
            d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
            id="a"
            />
        </defs>
        <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
        </svg>
    </div>
        `

    // Pushes productEl to cartItems Arr
    cartItems.push(productEl)
    // Appends each product item to DOM
    cartItems.forEach(item => cartContents.prepend(item))

    // Adds deleteBtn to global arr
    const deleteBtn = document.querySelector('.delete-icon')
    deleteBtns.push(deleteBtn)

    // Set cart empty to false, reset inputQty to 0 and input textContent to 0, after product added to cart
    cartIsEmpty = false
    qtyCounter = 0
    qtyInputNum.textContent = 0

    // Push itemQty to itemQtys Arr and add class to cartBubbleIcon
    itemsQty.push(itemQty)
    cartBubbleIcon.classList.add('full')

    // Call FUNCS
    cartItemsTotal()
    deleteCartItem()
    qtyCounterMinMax()
}

addToCartBtn.addEventListener('click', addToCart)

// Calculates the itemsQty Arr and displays in the cartBubbleIcon, or '' if Arr is empty
function cartItemsTotal() {
    if (itemsQty.length > 0) {
        let itemsTotal = itemsQty.reduce((item1, item2) => item1 + item2)
        cartBubbleIcon.dataset.content = itemsTotal
    } else {
        cartBubbleIcon.dataset.content = ''
        cartBubbleIcon.classList.remove('full')
    }
}


// ----------------------------------------------------------------------
// Delete btn
function deleteCartItem() {
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            removeItem(btn)
            cartItemsTotal()

            // Resets if cart is empty
            if (!cartItems.length) {
                cartIsEmpty = true
                cartItems = []
                itemsQty = []
                deleteBtns = []
                cartBubbleIcon.classList.remove('full')
                cartBubbleIcon.dataset.content = ''
                cartWrapperFull.style.display = 'none'
                cartWrapperFull.classList.remove('mob-full')
                qtyCounterMinMax()
            }
        })
    }) 


}

// Removes cart item
function removeItem(btn) {
        const idx = deleteBtns.indexOf(btn);

        if (idx > -1) {
            cartItems.splice(idx, 1)
            itemsQty.splice(idx, 1)
            deleteBtns.splice(idx, 1);
            btn.parentElement.remove()
        }
}


// ----------------------------------------------------------------------
//   Mobile Img Slider

const mobileSliderImgs = document.querySelectorAll('.product-img-mobile')
const prevArrowMobile = document.querySelector('.prev-arrow-mobile')
const nextArrowMobile = document.querySelector('.next-arrow-mobile')

let count = 0

// Mobile Slider - Next Btn
nextArrowMobile.addEventListener('click', () => {
    count++

    if (count > mobileSliderImgs.length - 1) {
        count = 0
    }

    setMobileImgActive() 
})

// Mobile Slider - Prev Btn
prevArrowMobile.addEventListener('click', () => {
    count--
   
    if (count < 1) {
        count = mobileSliderImgs.length - 1
    }

    setMobileImgActive()
})

// Add active class to mobile img, passing in the count as the index
function setMobileImgActive() {
    for (let i = 0; i < mobileSliderImgs.length; i++) {
        removeMobileImgActive()
        mobileSliderImgs[count].classList.add('active')
    }
}

// Remove active class from mobile img
function removeMobileImgActive() {
    mobileSliderImgs.forEach(img => img.classList.remove('active'))
}

// ----------------------------------------------------------------------
// Disable Lightbox Click
// all screens under 768, lightbox modal and click to open is disabled 
function disableLightbox() {
    if (screenWidth() <= 768 && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active')
        productImgActive.style.cursor = 'default'
        productImgActive.removeEventListener('click', openAndCloseLightbox)
    } else if (screenWidth() <= 768) {
        productImgActive.style.cursor = 'default'
        productImgActive.removeEventListener('click', openAndCloseLightbox)
    } else {
        productImgActive.style.cursor = 'pointer'
        productImgActive.addEventListener('click', openAndCloseLightbox)
    }
}

// ----------------------------------------------------------------------
// Load and resize listens for cartHover and disableLightbox
window.addEventListener('load', () => {
    cartHover()
    disableLightbox()
});

window.addEventListener('resize', () => {
    cartHover()
    disableLightbox()
});
