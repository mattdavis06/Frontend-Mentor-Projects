const inputs = [
    document.getElementById('bill'),
    document.getElementById('btn-input'), 
    document.getElementById('numofpeople')
]
const btnInputs = document.querySelectorAll('input.btn')
const zeroInputErrorMsg = document.querySelector('span')
const resetBtn = document.querySelector('.btn-reset')
const tipAmount = document.querySelector('.tip-amount-num')
const totalAmount = document.querySelector('.total-amount-num')

let bill = 0
let percentage = 0
let custom = 0
let people = 0

// Inputs Styling - Bill, Btn & People Inputs
// Sets maxlength of inputs
inputs.forEach((input, index) => {
    const maxLengths = [7, 2, 2]
    input.maxLength = maxLengths[index]
})

// Clears placeholder inputs onFocus
function onFocus() {
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.placeholder = ''
        })
    })
}
// Add 0 placeholder onBlur
function onBlur() {
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if(input.id !== 'btn-input') {
                this.placeholder = 0
            } else {
                input.placeholder = 'Custom'
            }
        })
    })
}
// Adds active class to btns, resets 'custom' when btn is clicked & updates percentage GV & calculates
function percentageSum() {
    btnInputs.forEach(input => {
        input.addEventListener('click', () => {
            removeActiveClass()
            input.classList.add('active')

            if(input.type === 'button' && input.classList.contains('active')) {
                inputs.forEach(input => {
                    if(input.id === 'btn-input') {
                        input.value = ''
                        input.placeholder = 'Custom'
                    }
                })
            }

            let clickPercentage = input.value
            percentage = parseFloat(clickPercentage)
           
            calculate() 
        })
    })
}
// Check for custom percentage change, updates DOM and GV 
function checkCustomChange() {
    btnInputs.forEach(input => {
        input.addEventListener('change', () => {
            
            let clickPercentage = input.value
            percentage = parseFloat(clickPercentage)

            calculate()
        })
    })
}

// Remove active class from btns
function removeActiveClass() {
    btnInputs.forEach(input => {
        input.classList.remove('active')
    })
}
// Display num of people input error
function inputErrMsg() {
    inputs.forEach(input => {
        if(input.id === 'numofpeople' && input.value === '') {
            zeroInputErrorMsg.style.display = 'flex'
        } else {
            zeroInputErrorMsg.style.display = 'none'
        }
    })
}
// Adds decimal points to bill input as you type
function addDecimal(input) {
    if(input.value.length <= 7){
        var val = input.value.replace(/[^\d]/, '')
        
        if(input.value.length > 2)
        val = val.substr(0, val.length - 2) + "." + val.substr(-2)
        input.value = val
      }
}

// Limits input characters, using maxlength html attribute 
function limitCharCount(input) {
    if(input.value.length > input.maxLength) {
        input.value = input.value.slice(0, input.maxLength);
    }
}

// Number formatter for inputs - Set to US
// https://stackoverflow.com/a/16233919/14088200
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// Get all input values and update GV
function getValues() {
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {  
            if(input.id === 'bill') {
                limitCharCount(input)
                addDecimal(input)

                let billSum = e.target.value
                bill = +billSum 
             }
    
             if(input.id === 'btn-input') {
                limitCharCount(input)

                let customVal = e.target.value
                custom = +customVal
             }
    
             if(input.id === 'numofpeople') {
                limitCharCount(input)
                inputErrMsg(input)

                let totalPeople = e.target.value
                people = +totalPeople
            }
            calculate() 
        })
    })
}

// Calculate tip amount and total
function calculate() {
    let tipTotalAmount = Math.round((percentage / 100) * bill)
    let tipAmountPerPerson = Math.round(tipTotalAmount / people)
    let totalPerPerson = Math.round((bill + tipTotalAmount) / people)
    
    let customTipAmount = Math.round((custom / 100) * bill)
    let customAmountPerPerson = Math.round(customTipAmount / 100)
    let customTotalPerPerson = Math.round((bill + customTipAmount) / people)

    if(tipTotalAmount === 0 || totalAmount.innerText === '$Infinity') {
        tipAmount.innerHTML = `<h3>$0.00</h3>`
        totalAmount.innerHTML = `<h3>$0.00</h3>` 
    }

    if(bill > 0 && percentage > 0 && people > 0) {
        tipAmount.innerHTML = `<h3>${formatter.format(tipAmountPerPerson)}</h3>`
        totalAmount.innerHTML = `<h3>${formatter.format(totalPerPerson)}</h3>`
    } else if(bill > 0 && custom > 0 && people > 0) {
        tipAmount.innerHTML = `<h3>${formatter.format(customAmountPerPerson)}</h3>`
        totalAmount.innerHTML = `<h3>${formatter.format(customTotalPerPerson)}</h3>`
    }      
}

// Reset all DOM values
function resetValues() {
    bill = 0
    custom = 0
    people = 0
    percentage = 0

    removeActiveClass()

    inputs.forEach(input => {
        input.value = ''
    })

    tipAmount.innerHTML = `<h3>$0.00</h3>`
    totalAmount.innerHTML = `<h3>$0.00</h3>` 
}

// Reset btn event listener
resetBtn.addEventListener('click', resetValues)

onFocus()
onBlur()
getValues()
percentageSum()
checkCustomChange()
inputErrMsg() 