// Request JSON from data.json file
let dataPath = '/data/data.json'
let request = new XMLHttpRequest();
request.open('GET', dataPath);
request.responseType = 'json';
request.send();
request.onload = function() {
    // Get data response and pass data into getDataValues FUNC
    const data = request.response;
    getDataValues(data)
  }

// Variables
const timeSelector = document.querySelectorAll('.profile-time-selector p')
const cardHeader = document.querySelectorAll('.card-header h2')
const currentHours = document.querySelectorAll('.current-hours span')
const previousHours = document.querySelectorAll('.previous-hours span')

let titleArr = []
let dailyArr = []
let weeklyArr = []
let monthlyArr = []

// Get data func and save values to GV arrays
function getDataValues(data) {
    data.forEach(item => {
        const title = item.title
        const daily = item.timeframes.daily
        const weekly = item.timeframes.weekly
        const monthly = item.timeframes.monthly

        titleArr.push(title)
        dailyArr.push(daily)
        weeklyArr.push(weekly)
        monthlyArr.push(monthly)
    })

}

// Update Card Title, Current & Previous Hours
function updateCard(title, value) {
    cardHeader.forEach((cardHeader, i) => {
        cardHeader.textContent = `${title[i]}`
    })
    currentHours.forEach((currentHour, i) => {
        currentHour.textContent = `${value[i].current}`
    })
    previousHours.forEach((previousHour, i) => {
        previousHour.textContent = `${value[i].previous}`
    })
}

// Check for clicked inner text value, call updateCard func and pass in GV array values
// Also adds "active" class to time option
function timeOptionCheck() {
    removeActive()
    this.classList.add('active')
    
    if(this.innerText === 'Daily') {
        updateCard(titleArr, dailyArr)
    } else if(this.innerText === 'Weekly') {
        updateCard(titleArr, weeklyArr)
    } else if(this.innerText === 'Monthly'){
        updateCard(titleArr, monthlyArr)
    }
}

// Removes active class from time options
function removeActive() {
    timeSelector.forEach(timeOption => {
        timeOption.classList.remove('active')
    })
}

// Event Listener for click on time option and calls timeOptionCheck func
timeSelector.forEach(timeOption => {
    timeOption.addEventListener('click', timeOptionCheck)
})

