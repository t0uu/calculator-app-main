// Buttons Toggle Theme Solution
const inputTheme = document.querySelectorAll('.input-theme')
const theme1 = document.getElementById('theme1')
const theme2 = document.getElementById('theme2')
const theme3 = document.getElementById('theme3')

const body = document.body

inputTheme.forEach(btn => {
    
    btn.addEventListener('click', e =>{
        if(e.target === theme1){
            if(body.classList.contains('Light-Theme') || body.classList.contains('Dark-Theme')){
                body.classList.remove('Dark-Theme')
                body.classList.remove('Light-Theme')
                body.classList.add('Default-Theme')
            }
           return;
        }
        if(e.target === theme2){
            body.classList.remove('Dark-Theme')
            body.classList.remove('Default-Theme')
            body.classList.add('Light-Theme')
            return;
        }
        if(e.target === theme3){
            body.classList.remove('Default-Theme')
            body.classList.remove('Light-Theme')
            body.classList.add('Dark-Theme')
            return;
        }
    })
});










// Calculator Solution

const display = document.querySelector('.calculator-screen')
const keys = document.querySelector('.calculator-keys')

const calculator = {
    displayValue: '0',
    firstOperator: null,
    waitingForSecondOperand: false,
    operator: null,
}


function inputDigit(digit){
    const {displayValue, waitingForSecondOperand} = calculator;
    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false
    }else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    // If the `displayValue` does not contain a decimal point
    if(calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }

  function calculate(firstOperator,secondOperator, operator){
    if(operator === '+'){
        return firstOperator + secondOperator;
    }else if(operator === '/'){
        return firstOperator / secondOperator;
    }else if(operator === '*'){
        return firstOperator * secondOperator;
    }else if(operator === '-'){
        return firstOperator - secondOperator;
    }
    return secondOperator;
}
function handleOperator(nextOperator){

    //first step is destructring properthies in calculator object
    const {firstOperator, displayValue, operator} = calculator;
    
    const inputValue = parseFloat(displayValue);

    if(firstOperator === null && !isNaN(inputValue)){
        calculator.firstOperator = inputValue;
    }else if(operator){
        const result = calculate(firstOperator,inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperator = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}


function updateDisplay()  {
    display.value = calculator.displayValue;
}


function ResetValues(){
    calculator.displayValue = '0';
    calculator.firstOperator = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
function DeleteValue(){
   const large = calculator.displayValue.length
   calculator.displayValue = calculator.displayValue.slice(0, large -1)
    
}
// updateDisplay()


keys.addEventListener('click', e => {
    const target = e.target;
    if(target.classList.contains('operator')){
    handleOperator(target.value);;
    updateDisplay();
    return;
}
if(target.classList.contains('Delete')){
    DeleteValue();
    updateDisplay();
    return;
}
if(target.classList.contains('Decimal')){
    inputDecimal(target.value);
     updateDisplay();
    return;
}
if(target.classList.contains('Reset')){
    ResetValues();
    updateDisplay();
    return;
}
inputDigit(target.value);
inputDecimal(target.value);
updateDisplay();
})