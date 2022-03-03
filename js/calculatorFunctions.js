const add = function(num1,num2) {
  return num1+num2;
};

const subtract = function(num1,num2) {
	return num1-num2;
};

const sum = function(arr) {
  let output=0;
  
  for(let i=0;i<arr.length;i++){
      output+=arr[i];
  }
  return output;
};

const multiply = function(arr) {
  let output=1;
  
  for(let i=0;i<arr.length;i++){
      output*=arr[i];
  }
  return output;
};

const power = function(num,exp) {
	return num**exp;
};

const factorial = function(num) {

  if(num<=0){
    return 1;
  }

  else{
	  return num*factorial(num-1);
  }

};

export{add,subtract,multiply};

// Do not edit below this line
/* module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
}; */
