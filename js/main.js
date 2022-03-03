import { add , subtract ,multiply } from './calculatorFunctions.js';

function setMathState(e){
    if(storedNum!=null && textClearState==false){
        operate();
    }
    storedNum = textBox.textContent;
    textClearState = true;
    mathState=e.target.classList[1];
}

function operate(){
    let num1=Number(storedNum);
    let num2=Number(textBox.textContent);

    if(mathState=="add"){
        textBox.textContent=(Math.round(add(num1,num2)*1000)/1000);
    }

    else if(mathState=="sub"){
        textBox.textContent=(Math.round(subtract(num1,num2)*1000)/1000);
    }

    else if(mathState=="mult"){
        textBox.textContent=(Math.round(multiply([num1,num2])*1000)/1000);
    }

    else if(mathState=="div"){
        if(num2==0){
            textBox.textContent="Cannot divide by 0";
            textClearState = true;
            mathState = null;
            return;
        }
        textBox.textContent=(Math.round(multiply([num1,1/num2])*1000)/1000);
    }
    storedNum = textBox.textContent;
    mathState = null;
}

function inputNumber(e){
    if(textClearState==true || textBox.textContent=="0"){
        textBox.textContent="";
        textClearState=false;
    }
    
    if (textBox.textContent.length>15){
        alert("Overflow");
        /* textBox.textContent = Number(textBox.textContent+e.target.textContent).toExponential(); */

    }
    else{
        textBox.textContent = textBox.textContent+e.target.textContent;
        
    } 
}

function inputDecimal(e){
    if(textBox.textContent.indexOf('.') != -1){
        return;
    }
    if (textBox.textContent.length>15){
        alert("Overflow");
    }
    else{
        textBox.textContent = textBox.textContent+'.';
        decimalState=true; 
    } 
}

function makeNegative(){
    if (textBox.textContent[0]=='-'){
        textBox.textContent = textBox.textContent.slice(1,textBox.textContent.length);
    }
    else{
        textBox.textContent = '-' + textBox.textContent;
    }
}

function clear(){
    textBox.textContent = "0";
    storedNum = null;
    mathState = null;
}

let textClearState = true;
let storedNum = null;
let mathState = null;
let decimalState = false;

const numPadBtns = Array.from(document.querySelectorAll('.number'));
const operatorBtns = Array.from(document.querySelectorAll('.operator'));
const textBox = document.querySelector('.text-box');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const negativeBtn = document.querySelector('.negative');
const decimalBtn = document.querySelector('.decimal');

numPadBtns.forEach(function(thisObj){thisObj.addEventListener('click',inputNumber)});
operatorBtns.forEach(function(thisObj){thisObj.addEventListener('click',setMathState)});
equalBtn.addEventListener('click',operate);
clearBtn.addEventListener('click',clear);
negativeBtn.addEventListener('click',makeNegative);
decimalBtn.addEventListener('click',inputDecimal);
