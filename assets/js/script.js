var result=document.querySelector(".result");
var display=document.querySelector(".display");
var operand1="";
var operand2="";
var currOperator="";
var prevOperator="";
var op=['+','-','*','/','=','%'];
var answr="";

// Gets Input from HTML Elements
function getInput(data){
	if(checkIteration(data))
		return;
	// check '=' is pressed
	if (currOperator==""&&prevOperator==""&&operand1==""&&operand2==""&&answr!="") {
		display.classList.toggle("dim");
		result.classList.toggle("highlight");
		// evaluation continued then continue operation
		if (op.indexOf(data)!=-1) {
			operand1=answr.toString();
			display.innerHTML=operand1;
			result.innerHTML="";
		} 
		// evaluation completed then clear display
		else {		
			clearDisplay();
			answr="";
		}
	} 
	// clears the display
	if(data=='C')	
		clearDisplay();
	// Set first operand
	else if ((currOperator=="")&&(prevOperator=="")&&(op.indexOf(data)==-1)) {
		if(data==".")
			//Check if decimal point is present more than once in operand1
			if(check_dec_iteration(operand1,data))
				return;
		operand1+=data;
		updateDOM(data);
	}
	//Set the operator 
	else if ((op.indexOf(data)!=-1)&&(operand1!="")) {
		if (prevOperator=="") {
			prevOperator=data;
			updateDOM(data);
		}	 	
		else{
			currOperator=data;
			//If operands and operators are set, evaluate the operation.
			evaluate();
		}
		
	}
	// Set the second operand
	else if (op.indexOf(data)==-1)
	{
		if(data==".")
			//Check if the decimal point is present more than once in operand1
			if(check_dec_iteration(operand2,data))
				return;
		operand2+=data;
		updateDOM(data);
		if (currOperator!=""&&prevOperator!=""){
			evaluate();
		}
	}
}

// Clears the display
clearDisplay=()=>{
	display.innerHTML="";
	result.innerHTML="";
	operand1="";
	operand2="";
	currOperator="";
	prevOperator="";
}

// Update the display shows the equation
updateDOM=(data)=>{
	display.innerHTML+=data;
}
// Evaluate the expression
evaluate=()=>{
	//parse the operand to float, if the operand contains a float value
	if (operand1.includes(".")||operand2.includes(".")) {
			operand1=parseFloat(operand1);
	  		operand2=parseFloat(operand2);	
		}
		//parse the operand to Int, if the above fails 
		else {
		  	operand1=parseInt(operand1);
		  	operand2=parseInt(operand2);
	  	}
	//Perform operation
	switch(prevOperator){
	  case '+':
	    answr=operand1+operand2;
	    break;
	  case '-':
	   	answr=operand1-operand2;
	    break;
	  case '*':
	    answr=operand1*operand2;
	    break;
	  case '/':
	    answr=operand1/operand2;
	    break;
	   case '%':
	    answr=operand1%operand2;
	    break;
	}
	//If '=' pressed, clears the variable
	if (currOperator=="=") {
		operand1="";
		operand2="";
		currOperator="";
		prevOperator="";
		result.innerHTML=answr;
		display.classList.add("dim");
		result.classList.add("highlight");
	}
	//else set the operands for next operation
	else {
		display.innerHTML+=currOperator;
		operand1=answr.toString();
		operand2="";
		prevOperator=currOperator;
		currOperator="";
		result.innerHTML=answr;
	}
}

//Check the operator/decimal point pressed continuously 
checkIteration=(data)=>{
	const value=display.innerHTML.slice(-1);
	if (op.indexOf(value)!=-1&&op.indexOf(data)!=-1) {
		return true;
	}
	if (value=='.'&&data==".") {
		return true;
	}
		return false;
	
}

//check operand contains more than one decimal point
check_dec_iteration=(operand,data)=>{
	if(operand.includes('.')&&data==".")
		return true;
}
