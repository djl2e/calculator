let prevNumber = "";
let curNumber = "";
let operator = "";
let dotExists = false;
const display = document.querySelector("#display-num");
const topDisplay = document.querySelector("#display-full");
const cf = 10;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return (a * cf) * (b * cf) / (cf * cf);
}

function divide(a, b) {
    if (b == 0) return null;
    return (a * cf) / (b * cf);
}

function operate(a, b, operator) {
    if (operator == '﹢') return add(a, b);
    else if (operator == '﹣') return subtract(a, b);
    else if (operator == '×') return multiply(a, b);
    else if (operator == '÷') return divide(a, b);
    else return null;
}

function clear() {
    prevNumber = 0;
    curNumber = ""
    operator = "";
    dotExists = false;
    reload();
}

function newDigit(digit) {
    if (curNumber == "0" && digit != ".") curNumber = "";
    curNumber = curNumber + digit.toString();
    reload();
}

function dot() {
    if (!dotExists) {
        if (curNumber.length == 0 || curNumber == "-") {
            curNumber += "0";
        }
        dotExists = true;
        newDigit(".");
    }
}

function sign() {
    if (curNumber[0] == "-") {
        curNumber = curNumber.slice(1);
    } else {
        curNumber = "-" + curNumber;
    }
    reload();
}

function del() {
    if (curNumber.length == 0) return;
    if (curNumber[curNumber.length - 1] == ".") {
        dotExists = false;
    }
    curNumber = curNumber.slice(0, -1);
    if (curNumber == "-") del();
    reload();
}

function equals() {
    if (operator == "") return
    if (curNumber == "" || curNumber == "-") {
        curNumber = 0;
    }
    operatorSign = getOperatorSign(operator);
    newVal = operate(parseFloat(prevNumber), 
        parseFloat(curNumber), operatorSign);
    newVal = Math.round(newVal * 10000) / 10000;
    prevNumber = prevNumber + " " + operatorSign + " " + curNumber;
    operator = "equals";
    curNumber = newVal.toString();

    reload();
}


// rethink cases about
// simply changing the operation when theres no curNum
// curNum is not empty so new operation causes equals to happen
function newOp(newOperator) {

    if (operator != "equals" && operator.length > 0) {
        if (curNumber.length == 0) {
            operator = newOperator;
            reload();
            return;
        } else {
            equals(); 
        }
    }

    if (curNumber.length == 0 && 
            (operator == "" || operator == "equals")) {
        prevNumber = "0";
    } else {
        prevNumber = curNumber;
    }

    curNumber = "";
    operator = newOperator;
    dotExists = false;
    reload();
}

function getOperatorSign() {
    operatorSign = ""
    switch(operator) {
        case "add":
            operatorSign = "﹢";
            break;
        case "subtract":
            operatorSign = "﹣";
            break;
        case "multiply":
            operatorSign = "×";
            break;
        case "divide":
            operatorSign = "÷";
            break;
        case "equals":
            operatorSign = "＝";
            break;
        default:
            operatorSign = "";
    }
    return operatorSign;
}

// displaying large numbers
function reload() {
    reloadTopDisplay();
    if (curNumber.length == 0) {
        display.textContent = "0";
    } else if (curNumber == "-") {
        display.textContent = "-0";
    } else {
        display.textContent = curNumber; 
    }
}

function reloadTopDisplay() {
    if (operator == "") {
        topDisplay.textContent = "";
        return;
    }

    operatorSign = getOperatorSign();
    topDisplay.textContent = prevNumber + " " + operatorSign;
}


function switchOperator(newOperator) {
    switch(newOperator) {
        case "cancel":
            clear();
            break;
        case "dot":
            dot();
            break;
        case "sign":
            sign();
            break;
        case "delete":
            del();
            break;
        case "equals":
            equals();
            break;
        default:
            newOp(newOperator);
    }
}

function click() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            if (e.target.classList[0] == "number") {
                newDigit(e.target.textContent);
            }
            else {
                switchOperator(e.target.id);
            }
        });
    });
}





function main() {
    click();
}

main();

