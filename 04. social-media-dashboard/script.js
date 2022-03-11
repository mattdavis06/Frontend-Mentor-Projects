
const body = document.body
const toggle = document.getElementById('toggle')

// Add Light Mode class to body onload
window.onload = () => {
    body.classList.add('light-mode')
}
// Toggle Dark Mode class on toggle switch
toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode')
}) 