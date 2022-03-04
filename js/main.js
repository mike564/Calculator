import { add , subtract ,multiply } from './calculatorFunctions.js';

//Sets math state when operators are clicked. If already in math state, perform math operation only if a previous number and new number has been entered.
function setMathState(e){
    if(actualNum=='.'){//Prevents a single "." from being used in calculation
        textBox.textContent='"." is not a number';
        textClearState = true;
        mathState=null;
        storedNum=null;
        return;
    }
    if(storedNum!=null && textClearState==false){
        operate();
    }
    storedNum = actualNum;
    textClearState = true;
    mathState=e.target.classList[1];
}

function operate(){
    if(actualNum=='.'){//Prevents a single "." from being used in calculation
        textBox.textContent='"." is not a number';
        textClearState = true;
        mathState=null;
        storedNum=null;
        return;
    }

    let num1=Number(storedNum);
    let num2=Number(actualNum);
    let result=null;
    
    if(mathState=="add"  && storedNum != null){
        result=(Math.round(add(num1,num2)*1000)/1000);
    }

    else if(mathState=="sub" && storedNum != null){
        result=(Math.round(subtract(num1,num2)*1000)/1000);
    }

    else if(mathState=="mult" && storedNum != null){
        result=(Math.round(multiply([num1,num2])*1000)/1000);
    }

    else if(mathState=="div" && storedNum != null){
        if(num2==0){//Handles divide by 0 error
            textBox.textContent="Cannot divide by 0";
            textClearState = true;
            mathState = null;
            return;
        }
        result=(Math.round(multiply([num1,1/num2])*1000)/1000);
    }
    
    if(result!=null){//Only display and store a result that properly executes
        actualNum=String(result);
        if(actualNum.length>15){//Handling of results that are too large to fit on the screen
            textBox.textContent = Number(result).toExponential(3);
        }
        else{
            textBox.textContent = actualNum;
        }

        storedNum = actualNum;
        mathState = null;
    }
    
    textClearState = true;
}

//Sets number(s) when num pad is clicked
function inputNumber(e){
    if(textClearState==true || textBox.textContent=="0"){//Clears window for new number if previous number and math state is set, or if 0 is the only number displayed
        textBox.textContent="";
        actualNum="";
        textClearState=false;
    }

    actualNum = actualNum+e.target.textContent;
    if (actualNum.length>15 || textBox.textContent.indexOf('e') != -1){//Handling of results that are too large to fit on the screen
        textBox.textContent = String(Number(actualNum).toExponential(3));
    }
    else{
        textBox.textContent = actualNum;      
    }
}

//Inputs "." when decimal button is clicked and there is currently no other decimal within the number
function inputDecimal(e){
    if(textClearState==true || actualNum=="0"){
        textBox.textContent="";
        actualNum="";
        textClearState=false;
    }

    if(actualNum.indexOf('.') != -1){
        return;
    }

    actualNum = actualNum+e.target.textContent;

    if (actualNum.length>15 || actualNum.indexOf('e') != -1){//Handling of results that are too large to fit on the screen
        textBox.textContent = String(Number(actualNum).toExponential(3));
    }
    else{
        textBox.textContent = actualNum;
    }
}

//Toggles whether current number is positive negative when +/- button is clicked
function changeSign(){
    if (actualNum[0]=='-'){
        actualNum = actualNum.slice(1,actualNum.length);
    }
    else if(actualNum!=0){
        actualNum = '-' + actualNum;  
    }
    textBox.textContent=actualNum;
}

//Clears display, resets mathstate, and whipes all current and stores numbers when C button is clicked
function clear(){
    actualNum = "0";
    storedNum = null;
    mathState = null;
    textBox.textContent = actualNum;
}

//Removes the character furthest to the right.
function backSpace(){
    if(actualNum.indexOf('e')!=-1){//Prevents removal if actualNum is stored in scientific notation in JS, usually after a large calculation
        textBox.textContent ="Too large to remove";
        textClearState=true;
        return;
    }

    if(actualNum.length==1){//Sets number to 0 rather than having an empty display and number
        actualNum = "0";
        textBox.textContent=actualNum;
        return;
    }

    actualNum = String(actualNum.slice(0,actualNum.length-1))

    if(actualNum.length<16){//Handling of results that are too large to fit on the screen.
        textBox.textContent = actualNum;
    }
    else{
        textBox.textContent = String(Number(actualNum).toExponential(3));
    }
    
    textClearState=false;
}

//Initial global variables
let textClearState = true;//clears textbox when the second number is being entered
let actualNum = "0";//Number that is actually being used in the math operations. Needed, as number shown on display only fits 15 characters before using scientific notation
let storedNum = null;//Stores previous number that was entered
let mathState = null;//Dictates what math operation is performed 

//DOM objects
const numPadBtns = Array.from(document.querySelectorAll('.number'));
const operatorBtns = Array.from(document.querySelectorAll('.operator'));
const textBox = document.querySelector('.text-box');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.back'); 
const negativeBtn = document.querySelector('.negative');
const decimalBtn = document.querySelector('.decimal');

//eventlistners
numPadBtns.forEach(function(thisObj){thisObj.addEventListener('click',inputNumber)});
operatorBtns.forEach(function(thisObj){thisObj.addEventListener('click',setMathState)});
equalBtn.addEventListener('click',operate);
clearBtn.addEventListener('click',clear);
backBtn.addEventListener('click',backSpace)
negativeBtn.addEventListener('click',changeSign);
decimalBtn.addEventListener('click',inputDecimal);

