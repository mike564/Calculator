import { add , subtract ,multiply } from './calculatorFunctions.js';

function setMathState(e){
    if(storedNum!=null && textClearState==false){
        operate();
    }
    storedNum = actualNum;
    textClearState = true;
    mathState=e.target.classList[1];
}

function operate(){
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
        if(num2==0){
            textBox.textContent="Cannot divide by 0";
            textClearState = true;
            mathState = null;
            return;
        }
        result=(Math.round(multiply([num1,1/num2])*1000)/1000);
    }

    if(result!=null){
        actualNum=String(result);
        if(actualNum.length>15){
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

function inputNumber(e){
    if(textClearState==true || textBox.textContent=="0"){
        textBox.textContent="";
        actualNum="";
        textClearState=false;
    }
    actualNum = actualNum+e.target.textContent;
    if (actualNum.length>15 || textBox.textContent.indexOf('e') != -1){
        textBox.textContent = String(Number(actualNum).toExponential(3));
    }
    else{
        textBox.textContent = actualNum;      
    }
}

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
    if (actualNum.length>15 || actualNum.indexOf('e') != -1){
        textBox.textContent = String(Number(actualNum).toExponential(3));
    }
    else{
        textBox.textContent = actualNum;
    }
}

function makeNegative(){
    if (actualNum[0]=='-'){
        actualNum = actualNum.slice(1,actualNum.length);
    }
    else if(actualNum!=0){
        actualNum = '-' + actualNum;  
    }
    textBox.textContent=actualNum;
}

function clear(){
    actualNum = "0";
    textBox.textContent = actualNum;
    storedNum = null;
    mathState = null;
}

function backSpace(){
    if(actualNum.indexOf('e')!=-1){
        textBox.textContent ="Too large to back";
        textClearState=true;
    }
    else{
        if(actualNum.length==1){
            actualNum = "0";
            textBox.textContent=actualNum;
            return;
        }
        else{
            actualNum = String(actualNum.slice(0,actualNum.length-1))
            if (textBox.textContent.indexOf('e') != -1){
                if(actualNum.length<16){
                    textBox.textContent = actualNum;
                }
                else{
                    textBox.textContent = String(Number(actualNum).toExponential(3));
                }
            }
            else{
                textBox.textContent = String(textBox.textContent).slice(0,textBox.textContent.length-1);
            }
        }
        textClearState=false;
    }   
}

let textClearState = true;
let actualNum = "0";
let storedNum = null;
let mathState = null;

const numPadBtns = Array.from(document.querySelectorAll('.number'));
const operatorBtns = Array.from(document.querySelectorAll('.operator'));
const textBox = document.querySelector('.text-box');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.back'); 
const negativeBtn = document.querySelector('.negative');
const decimalBtn = document.querySelector('.decimal');

numPadBtns.forEach(function(thisObj){thisObj.addEventListener('click',inputNumber)});
operatorBtns.forEach(function(thisObj){thisObj.addEventListener('click',setMathState)});
equalBtn.addEventListener('click',operate);
clearBtn.addEventListener('click',clear);
backBtn.addEventListener('click',backSpace)
negativeBtn.addEventListener('click',makeNegative);
decimalBtn.addEventListener('click',inputDecimal);

