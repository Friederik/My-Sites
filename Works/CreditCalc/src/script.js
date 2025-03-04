import * as flatpickr from 'https://cdn.jsdelivr.net/npm/flatpickr';

function setup() {
    
}

document.getElementById("submit-button").addEventListener("click", function () {

    let amountObj = document.getElementById("amount");
    let rateObj = document.getElementById("rate");
    let monthsObj = document.getElementById("months");
    let rangeObj = document.getElementById("range");
    let dateCreditObj = document.getElementById("date-credit");


    calculateLoan(amountObj, rateObj, monthsObj, rangeObj, dateCreditObj);
});

document.getElementById("print-button").addEventListener('click', function() {
    window.print();
})

document.getElementById("currency").addEventListener('change', function(){
    document.querySelectorAll(".currency-val").forEach(val => {
        val.innerText = this.options[this.selectedIndex].text
        console.log(val.innerText)
    })
});

document.getElementById("range").addEventListener('change', function(){
    let val = this.options[this.selectedIndex].value
    if(val === "years") {
        document.getElementById("months").placeholder = "Введите к. лет"
    }
    else {
        document.getElementById("months").placeholder = "Введите к. месяцев"
    }
    
});

function calculateLoan(amountObj, rateObj, monthsObj, rangeObj, dateCreditObj) {
    let amount = amountObj.value;
    let rate = rateObj.value;
    let months = monthsObj.value;
    let dateCredit = new Date(dateCreditObj.value);

    let numbers = [amountObj, rateObj, monthsObj, dateCreditObj]

    let range = rangeObj.value;
    if(range === 'years') {
        months *= 12
    }

    let flag = true
    numbers.forEach(num => {
        num.value == '' 
        ? (num.className = "loan-input-error", flag = false)
        : num.className = "loan-input"
    })

    if(flag === false) return

    let monthlyRate = rate / 100 / 12
    let payment = ((amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))).toFixed(0)
    let allPayments = (payment * months).toFixed(0)
    let overpayment = (allPayments - amount).toFixed(0)

    document.getElementById("sum-in-month-num").innerText = payment
    document.getElementById("sum-all-num").innerText = allPayments
    document.getElementById("overpayment-num").innerText = overpayment
    document.getElementById("overpayment-percent-num").innerText = (overpayment / amount * 100).toFixed(3)

    document.getElementById("conclusion").style.display = "block"
    document.getElementById("print-button").style.color = "white"

    console.log(amount)
    calculateLoanTable(months, monthlyRate, payment, amount, dateCredit)
}

function calculateLoanTable(months, monthlyRate, payment, amount, dateCredit) {
    document.getElementById('conclusion-table').innerHTML = `
        <tr>
            <th>Дата</th>
            <th>Платеж</th>
            <th>Процент</th>
            <th>Основной долг</th>
            <th>Остаток</th>
        </tr>        
    `
    let calcDate = new Date(dateCredit)
    let nextDate = dateCredit.getMonth() + 1
    let originalDay = dateCredit.getDate()

    for(let i = 0; i < months; i++) {
        let row = document.createElement('tr')

        let percents = (amount * monthlyRate).toFixed(2)
        let mainCredit = (payment - percents).toFixed(0)
        if(i === months-1) {
            mainCredit = amount
            payment = mainCredit * (1 + monthlyRate).toFixed(0)
        }
        amount -= mainCredit

        let newMonth = nextDate + i;
        let oldDate = new Date(calcDate)
        calcDate.setFullYear(dateCredit.getFullYear() + Math.floor(newMonth / 12)); // Коррекция года
        calcDate.setMonth(newMonth % 12);
        if (calcDate.getDate() < 5) {
            calcDate.setDate(0);
        }
        else {
            calcDate.setDate(originalDay)
        }
        if (calcDate.getMonth() === oldDate.getMonth()) {
            calcDate.setDate(originalDay)
            calcDate.setMonth(calcDate.getMonth() + 1)
        }
        console.log(calcDate, oldDate)
        let formattedDate = calcDate.toLocaleDateString("ru-RU")

        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${payment}</td>
            <td>${percents}</td>
            <td>${mainCredit}</td>
            <td>${amount}</td>
        `
        document.getElementById('conclusion-table').appendChild(row)
    }
}

setup()