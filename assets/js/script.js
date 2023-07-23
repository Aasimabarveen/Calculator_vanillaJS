var result=document.querySelector(".result");
var display=document.querySelector(".display");
var operand1="";
var operand2="";
var currOperator="";
var prevOperator="";
var op=['+','-','*','/','=','%'];
var answr="";

function getInput(data){
	if(checkIteration(data))
		return;
	if (currOperator==""&&prevOperator==""&&operand1==""&&operand2==""&&answr!="") {
		display.classList.toggle("dim");
		result.classList.toggle("highlight");		
		clearDisplay();
		answr="";
	} 
	if(data=='C')	
		clearDisplay();
	else if ((currOperator=="")&&(prevOperator=="")&&(op.indexOf(data)==-1)) {
		if(data==".")
			if(check_dec_iteration(operand1,data))
				return;
		operand1+=data;
		updateDOM(data);
	}
	else if ((op.indexOf(data)!=-1)&&(operand1!="")) {
		if (prevOperator=="") {
			prevOperator=data;
			updateDOM(data);
		}	 	
		else{
			currOperator=data;
			evaluate();
		}
		
	}
	else if (op.indexOf(data)==-1)
	{
		if(data==".")
			if(check_dec_iteration(operand2,data))
				return;
		operand2+=data;
		updateDOM(data);
		if (currOperator!=""&&prevOperator!=""){
			evaluate();
		}
	}
	if (data=='=') {console.log('operand1 '+operand1+'prevOperator '+prevOperator+'currOperator '+currOperator+'operand2 '+operand2)}
}

clearDisplay=()=>{
	display.innerHTML="";
	result.innerHTML="";
	operand1="";
	operand2="";
	currOperator="";
	prevOperator="";
}

updateDOM=(data)=>{
	display.innerHTML+=data;
}
evaluate=()=>{
	if (operand1.includes(".")||operand2.includes(".")) {
			operand1=parseFloat(operand1);
	  		operand2=parseFloat(operand2);	
		} else {
		  	operand1=parseInt(operand1);
		  	operand2=parseInt(operand2);
	  	}
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
	if (currOperator=="=") {
		operand1="";
		operand2="";
		currOperator="";
		prevOperator="";
		result.innerHTML=answr;
		display.classList.add("dim");
		result.classList.add("highlight");
		// console.log("display "+display.innerHTML+" result "+result.innerHTML+" operand1 "+operand1+" operand2 "+operand2)
	} else {
		display.innerHTML+=currOperator;
		operand1=answr.toString();
		operand2="";
		prevOperator=currOperator;
		currOperator="";
		result.innerHTML=answr;
		console.log("operand1 "+operand1+"prevOperator "+prevOperator)
	}
}

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
check_dec_iteration=(operand,data)=>{
	if(operand.includes('.')&&data==".")
		return true;
}