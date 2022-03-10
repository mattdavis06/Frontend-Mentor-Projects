const pageViews = document.querySelector('.pageviews-amount')
const monthlyAmount = document.querySelector('.monthly-amount')
const sliderInput = document.getElementById('slider-progress')
const toggleSwitch = document.getElementById('billing-toggle')

const monthlyPrices = [
    {
        value: 0,
        pageViews: '10K',
        costPerMonth: '8.00',
    },
    {
        value: 25,
        pageViews: '50K',
        costPerMonth: '12.00',
    },
    {
        value: 50,
        pageViews: '100K',
        costPerMonth: '16.00',
    },
    {
        value: 75,
        pageViews: '500K',
        costPerMonth: '24.00',
    },
    {
        value: 100,
        pageViews: '1M',
        costPerMonth: '36.00',
    }
]

// Global Variables (GV)
let sliderValue = 50
let discountPercentage = 25
let discountChecked = false

// Checks if discount toggle switch is checked, then runs FUNC
function discountChecker() {
    if(toggleSwitch.checked === true) {
        discountChecked = true
        updateMonthlyCost()
    } else {
        discountChecked = false
        updateMonthlyCost()
    }
}

// Gets slider value, updates GV, destructures through and updates slider with pageviews and cost per month. 
// Also checks from slider true/false value and calls FUNC
function updateMonthlyCost(sliderValue) {
    let inputValue = sliderInput.value

    sliderValue = +inputValue

    for(const { value, pageViews, costPerMonth } of monthlyPrices) {
        if(sliderValue === value && discountChecked === false) {
            pageViews.textContent = `${pageViews}`
            monthlyAmount.textContent = `$${costPerMonth}`
        } else if(sliderValue === value && discountChecked === true) {
            calculateDiscount(costPerMonth)
        }
    }
}

// Calculates discount from cost per month amount
function calculateDiscount(costPerMonth) {
    let discountAmount = (discountPercentage / 100) * costPerMonth
    let total = costPerMonth - discountAmount

    for(const { pageViews } of monthlyPrices) {
            pageViews.textContent = `${pageViews}`
            monthlyAmount.textContent = `$${total}.00`
    }
}

// Gets range input value and updates background size CSS with value
function handleInputProgressChange(e) {
    let target = e.target
  
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  }
  
// Event Listeners
sliderInput.addEventListener('input', updateMonthlyCost)
sliderInput.addEventListener('input', handleInputProgressChange)
toggleSwitch.addEventListener('change', discountChecker)



