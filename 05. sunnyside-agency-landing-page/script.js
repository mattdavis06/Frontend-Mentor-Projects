
const navToggleBtn = document.querySelector('.nav-toggle')
const navToggleLinks = document.querySelector('.nav-toggle-links')

navToggleBtn.addEventListener('click', () => {
    navToggleLinks.classList.toggle('show')
})

