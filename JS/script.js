
const currentDisplay = document.getElementById("current-display");
const previousOperation = document.getElementById("previous-operation");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history");

let currentValue = "0";
let previousValue = null;
let currentOperator = null;
let shouldResetDisplay = false;


function updateDisplay() {
    currentDisplay.textContent = currentValue;
}


function appendNumber(number) {

    if (shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
    }

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    if (currentValue === "0" && number !== ".") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}


function chooseOperator(operator) {

    if (currentOperator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousValue = parseFloat(currentValue);

    currentOperator = operator;

    previousOperation.textContent =
        `${formatNumber(previousValue)} ${getOperatorSymbol(operator)}`;

    shouldResetDisplay = true;
}



function calculate() {

    if (currentOperator === null || previousValue === null) {
        return;
    }

    const currentNumber = parseFloat(currentValue);

    let result;

    switch (currentOperator) {

        case "+":
            result = previousValue + currentNumber;
            break;

        case "-":
            result = previousValue - currentNumber;
            break;

        case "*":
            result = previousValue * currentNumber;
            break;

        case "/":

            if (currentNumber === 0) {

                currentValue = "Erro";

                previousOperation.textContent =
                    "Não é possível dividir por zero";

                currentOperator = null;
                previousValue = null;

                updateDisplay();

                return;
            }

            result = previousValue / currentNumber;
            break;

        default:
            return;
    }

    const expression =
        `${formatNumber(previousValue)} ${getOperatorSymbol(currentOperator)} ${formatNumber(currentNumber)}`;

    const formattedResult = formatNumber(result);

    addToHistory(`${expression} = ${formattedResult}`);

    currentValue = formattedResult;

    previousValue = null;
    currentOperator = null;

    previousOperation.textContent =
        `${expression} =`;

    shouldResetDisplay = true;

    updateDisplay();
}




function percentage() {

    const number = parseFloat(currentValue);

    currentValue = String(number / 100);

    updateDisplay();
}




function toggleSign() {

    if (currentValue === "0" || currentValue === "Erro") {
        return;
    }

    if (currentValue.startsWith("-")) {
        currentValue = currentValue.substring(1);
    } else {
        currentValue = "-" + currentValue;
    }

    updateDisplay();
}



function deleteNumber() {

    if (currentValue === "Erro") {
        clearCalculator();
        return;
    }

    if (currentValue.length === 1) {
        currentValue = "0";
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}


function clearCalculator() {

    currentValue = "0";
    previousValue = null;
    currentOperator = null;

    shouldResetDisplay = false;

    previousOperation.textContent = "";

    updateDisplay();
}



function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "Erro";
    }

    const roundedNumber =
        Math.round((number + Number.EPSILON) * 100000000) / 100000000;

    return String(roundedNumber);
}



function getOperatorSymbol(operator) {

    switch (operator) {

        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";
    }
}



function addToHistory(operation) {

    const item = document.createElement("li");

    item.textContent = operation;

    historyList.prepend(item);
}




document.querySelectorAll(".number").forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        appendNumber(number);
    });
});


document.querySelectorAll(".operator").forEach(button => {

    button.addEventListener("click", () => {

        const operator = button.dataset.operator;

        chooseOperator(operator);
    });
});


document.querySelectorAll("[data-action]").forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        switch (action) {

            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteNumber();
                break;

            case "percentage":
                percentage();
                break;

            case "toggle-sign":
                toggleSign();
                break;

            case "calculate":
                calculate();
                break;
        }
    });
});



clearHistoryButton.addEventListener("click", () => {

    historyList.innerHTML = "";
});


document.addEventListener("keydown", event => {

    const key = event.key;

    if (!isNaN(key) || key === ".") {

        appendNumber(key);

        return;
    }

    if (["+", "-", "*", "/"].includes(key)) {

        chooseOperator(key);

        return;
    }

    if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();

        return;
    }

    if (key === "Backspace") {

        deleteNumber();

        return;
    }

    if (key === "Escape") {

        clearCalculator();

        return;
    }

    if (key === "%") {

        percentage();
    }
});

updateDisplay();

