let calculation = '';
const buttons = document.querySelectorAll('.btn');
const calculationDisplay = document.querySelector('.calculation-display');
const calculationHistoryDisplay = document.querySelector('.calculation-history-display');
const clearCalculationBtn = document.getElementById('clear-calculation-btn');
const deleteCalculationBtn = document.getElementById('delete-calculation-btn');
const equalsBtn = document.getElementById('equals-btn');
const percentageBtn = document.getElementById('percentage-btn');
const plusMinusBtn = document.getElementById('plus-minus-btn');

function calculationDisplayFun() {
    calculationDisplay.textContent = String(calculation);
}

function calculationFun(value) {
    if (!value) return;
    
    const operators = [' + ', ' - ', ' * ', ' / '];
    const lastThree = calculation.slice(-3);

    if (operators.includes(value)  && calculation === '') return;

    if (operators.includes(lastThree) && operators.includes(value)) return;

    const tokens = calculation.split(/[+\-\*\/]/);

    for (let i = 0; i < tokens.length; i++) {
        tokens[i] = tokens[i].trim();
    }

    const lastPart = tokens[tokens.length - 1];

    if (lastPart.includes('.') && value === '.') return;

    if (lastPart === '0' && !isNaN(value)) {
        calculation = calculation.slice(0, -1);
    }
    
    calculation += value;
    calculationDisplayFun();
}

function clearCalculationFun() {
    calculation = '';
    calculationDisplayFun();
}

function deleteCalculationFun() {
    if (calculation.endsWith(' + ') ||
        calculation.endsWith(' - ') ||
        calculation.endsWith(' * ') ||
        calculation.endsWith(' / ') 
    ) {
        calculation = calculation.slice(0, -3);
    } else {
        calculation = calculation.slice(0, -1);
    }
    
    calculationDisplayFun();
}

function calculate() {
    const tokens = calculation.split(' ');

    for (let i = 0; i < tokens.length; i++) {
        tokens[i] = isNaN(tokens[i]) ? tokens[i] : Number(tokens[i]);
    }
    
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const leftNum = tokens[i - 1];
            const rightNum = tokens[i + 1];
            const operator = tokens[i];
            const value = operator === '*' ? leftNum * rightNum : leftNum / rightNum;
            tokens.splice(i - 1, 3, value);
            i = 0;
        } else {
            i++;
        }
    }

    i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '+' || tokens[i] === '-') {
            const leftNum = tokens[i - 1];
            const rightNum = tokens[i + 1];
            const operator = tokens[i];
            const value = operator === '+' ? leftNum + rightNum : leftNum - rightNum;

            tokens.splice(i - 1, 3, value);
            i = 0;
        } else {
            i++;
        }
    }

    calculation = String(tokens[0]);
    calculationDisplayFun();
}

function percentage() {
    const tokens = calculation.split(/[+\-\*\/]/);

    for (let i = 0; i < tokens.length; i++) {
        tokens[i] = tokens[i].trim();
    }

    let lastPart = tokens[tokens.length - 1];

    if (lastPart === '' || isNaN(lastPart) || Number(lastPart) < 0.0001) return;

    const percentValue = Number(lastPart) / 100;

    calculation = calculation.slice(0, -lastPart.length) + percentValue;
    calculationDisplayFun();
}

function plusMinus() {
    if (!calculation) return;

    const tokens = calculation.split(' ');
    const lastPart = tokens[tokens.length - 1].trim();

    if (lastPart === '' || isNaN(lastPart)) return;

    const plusMinusValue = String(-Number(lastPart)); 

    calculation = calculation.slice(0, -lastPart.length) + plusMinusValue;
    calculationDisplayFun();
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.value;
        calculationFun(input);
    })
})

clearCalculationBtn.addEventListener('click', clearCalculationFun);

deleteCalculationBtn.addEventListener('click', deleteCalculationFun);

equalsBtn.addEventListener('click', calculate);

percentageBtn.addEventListener('click', percentage);

plusMinusBtn.addEventListener('click', plusMinus);

calculationDisplayFun();



