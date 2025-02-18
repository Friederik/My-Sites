//document.querySelector('#number').value = "7"
//document.querySelector('#expresion').value = "777"
//document.querySelector('input[type=checkbox]').checked = true;
//console.log(document.getElementsByClassName('btn'))

let numberValue = ''
let expressionValue = ''
let memory = ''
let isCalc = false

function addNumber(num) {
    if (expressionValue.slice(-1) === '=') {
        numberValue = ''
        expressionValue = ''
    }
    if ((expressionValue.slice(-1) === '÷' ||
    expressionValue.slice(-1) === '×' ||
    expressionValue.slice(-1) === '-' ||
    expressionValue.slice(-1) === '+') && isCalc) {
        numberValue = ''
        isCalc = false
    }
    if (numberValue === '0') {
        numberValue = String(num)    
    }
    else {
        numberValue += num
    }
    updateNumber()
}

function rounded() {
    numberValue = String(Math.round(Number(numberValue) * 100000) / 100000)
    console.log(numberValue)
}

function equals() {
    if (numberValue.slice(-1) === '.') {
        numberValue += '0'
    }
    let operation = expressionValue.slice(-1)
    let curNumber = numberValue
    numberValue = doOperation(operation)
    expressionValue += ' ' + curNumber + ' ='
    rounded()
    updateNumber()
}

function doOperation(operation) {
    switch(operation) {
        case '÷':
            return String(Number(expressionValue.slice(0, -2)) / Number(numberValue))
        case '×':
            return String(Number(numberValue) * Number(expressionValue.slice(0, -2)))
        case '-':
            return String(Number(expressionValue.slice(0, -2)) - Number(numberValue))
        case '+':
            return String(Number(numberValue) + Number(expressionValue.slice(0, -2)))
    }
}

function changeNumber(operation) {
    if (numberValue.slice(-1) === '.') {
        numberValue += '0'
    }
    if (expressionValue.slice(-1) === '=') {
        expressionValue = ''
    }
    let curExpressionValue = expressionValue
    switch(operation) {
        case '1/x':
            expressionValue += '1/' + numberValue
            numberValue = String(1 / Number(numberValue))
            break
        case 'x²':
            expressionValue += 'sqr(' +numberValue + ')'
            numberValue = String(Number(numberValue) * Number(numberValue))
            break
        case '√x':
            expressionValue += '√(' +numberValue + ')'
            numberValue = String(Math.sqrt(Number(numberValue)))
            break
    }
    rounded()
    updateNumber()
    expressionValue = curExpressionValue
}

function setOperation(operation) {
    if (numberValue.slice(-1) === '.') {
        numberValue += '0'
    }
    if (expressionValue.slice(-1) === '=') {
        expressionValue = numberValue
        updateNumber()
    }
    if (isCalc) {
        let nextResult = doOperation(operation)
        expressionValue = nextResult + ` ${operation}`
        numberValue = nextResult
    }
    else {
        expressionValue = numberValue + ` ${operation}`
    }
    isCalc = true
    updateNumber()
}

function setPoint() {
    if (numberValue.indexOf('.') !== -1) {
        return
    }
    if (expressionValue.slice(-1) === '=') {
        numberValue = '0.'
        expressionValue = ''
    }
    else if (expressionValue.slice(-1) === '÷' ||
    expressionValue.slice(-1) === '×' ||
    expressionValue.slice(-1) === '-' ||
    expressionValue.slice(-1) === '+') {
        numberValue = numberValue +  '.'
    }
    else {
        numberValue += '.'
    }
    updateNumber()
}

function changeMinus() {
    if (numberValue === '' || numberValue === '0') return
    if (numberValue[0] === '-') {
        numberValue = numberValue.slice(1)
    }
    else {
        numberValue = '-' + numberValue
    }
    updateNumber()
}

function memoryRead() {
    numberValue = memory
    updateNumber()
}

function memorySave() {
    memory = numberValue
    console.log(memory)
}

function restart() {
    numberValue = ''
    expressionValue = ''
    isCalc = false
    updateNumber()
}

function erase() {
    if (expressionValue.slice(-1) === '=') {
        expressionValue = ''
    }
    if (numberValue === "NaN" || numberValue === "Infinity") {
        numberValue = ''
    }
    else {
        numberValue = numberValue.slice(0,-1)
    }
    updateNumber()
}

function updateNumber() {
    if (numberValue === '' || numberValue === '-') 
        numberValue = '0'
    document.querySelector('#number').value = numberValue
    document.querySelector('#expression').value = expressionValue
}

function themeChange() {    
    if (document.querySelector('#theme').checked) {
        let btns = document.querySelectorAll('.btn')
        let inputs = document.querySelectorAll('.input')
        document.querySelector('.calculator').className = 'calculator-dark'
        document.querySelector('.wrapper').className = 'wrapper-dark'
        document.querySelector('.settings').className = 'settings-dark'
        for (let input of inputs) {
            input.className = 'input-dark'
        }    
        for (let btn of btns) {
            btn.className = 'btn-dark'
        }    
    } else {
        let btns = document.querySelectorAll('.btn-dark')
        let inputs = document.querySelectorAll('.input-dark')
        document.querySelector('.calculator-dark').className = 'calculator'
        document.querySelector('.wrapper-dark').className = 'wrapper'
        document.querySelector('.settings-dark').className = 'settings'
        for (let input of inputs) {
            input.className = 'input'
        }    
        for (let btn of btns) {
            btn.className = 'btn'
        }    
    }
}

updateNumber()