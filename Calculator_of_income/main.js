// Income
const incomeSalary = document.getElementById(`income-salary`);
const incomeFreelance = document.getElementById(`income-freelance`);
const incomeExtra1 = document.getElementById(`income-extra-1`);
const incomeExtra2 = document.getElementById(`income-extra-2`);

// Costs
const costsFlat = document.getElementById(`costs-flat`);
const costsHouseServices = document.getElementById(`costs-house-services`);
const costsTransport = document.getElementById(`costs-transport`);
const costsCredit = document.getElementById(`costs-credit`);


//Total inputs
const TotalMonthInput = document.getElementById(`total-month`);
const TotalDayInput = document.getElementById(`total-day`);
const TotalYearInput = document.getElementById(`total-year`);


let totalMonth, totalDay, totalYear


//Monay box
const moneyBoxRange = document.getElementById(`money-box-range`);
const accumulationInput = document.getElementById(`accumulation`);
const spend = document.getElementById(`spend`);


let accumulation = 0;
let totalPrecents = 0;


const inputs = document.querySelectorAll(`.input`);
for(input of inputs){
    input.addEventListener(`input`, () =>{
        countingAvailableMoney();
        calculationPrecents();
    });
};


const stringToNumber = string => string.value ? parseInt(string.value) : 0;


const countingAvailableMoney = () => {
    const totalPerMonth = stringToNumber(incomeSalary) + stringToNumber(incomeFreelance) + stringToNumber(incomeExtra1) + stringToNumber(incomeExtra2);
    const totalcosts = stringToNumber(costsFlat) + stringToNumber(costsHouseServices) + stringToNumber(costsTransport) + stringToNumber(costsCredit);

    totalMonth = totalPerMonth - totalcosts
    TotalMonthInput.value = totalMonth
};


moneyBoxRange.addEventListener(`input`, e => {
    const totalPrecentElement = document.getElementById(`total-precents`);
    totalPrecents = e.target.value;
    totalPrecentElement.innerHTML = totalPrecents;
    calculationPrecents();
});


const calculationPrecents = () => {
    accumulation = ((totalMonth * totalPrecents) / 100).toFixed();
    accumulationInput.value = accumulation;

    spend.value = totalMonth - accumulation;

    totalDay = (spend.value / 30).toFixed();
    TotalDayInput.value = totalDay;

    totalYear = accumulation * 12;
    TotalYearInput.value = totalYear;
}