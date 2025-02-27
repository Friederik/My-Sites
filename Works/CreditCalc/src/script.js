document.getElementById("submit-button").addEventListener("click", function () {

    let amountObj = document.getElementById("amount");
    let rateObj = document.getElementById("rate");
    let monthsObj = document.getElementById("months");
    let rangeObj = document.getElementById("range");

    calculateLoan(amountObj, rateObj, monthsObj, rangeObj);
});

document.getElementById("currency").addEventListener('change', function(){
    document.querySelectorAll(".currency-val").forEach(val => {
        val.innerText = this.options[this.selectedIndex].text
        console.log(val.innerText)
    })
});

function calculateLoan(amountObj, rateObj, monthsObj, rangeObj) {
    let amount = amountObj.value;
    let rate = rateObj.value;
    let months = monthsObj.value;
    let range = rangeObj.value;
    if(range === 'years') {
        months *= 12
    }

    console.log(months)

    let numbers = [amountObj, rateObj, monthsObj]

    let flag = true
    numbers.forEach(num => {
        num.value == '' 
        ? (num.className = "loan-input-error", flag = false)
        : num.className = "loan-input"
    })

    if(flag === false) return
    let monthlyRate = rate / 100 / 12;
    let payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    let allPayments = payment * months
    let overpayment = allPayments - amount

    document.getElementById("sum-in-month-num").innerText = payment.toFixed(2)
    document.getElementById("sum-all-num").innerText = allPayments.toFixed(2)
    document.getElementById("overpayment-num").innerText = overpayment.toFixed(2)
    document.getElementById("overpayment-percent-num").innerText = (overpayment / amount * 100).toFixed(3)

    document.getElementById("conclusion").style.display = "block"
}
