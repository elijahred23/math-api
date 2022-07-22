const express = require('express');
const ejs = require('ejs');
const port = 3000;
const app = express();

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
	res.render("index");
});

app.get("/math", (req,res)=>{
	let query = res.query;
	let num1 = parseFloat(query.num1);
	let num2 = parseFloat(query.num2);
	let operator = query.operator;
	let result;
	switch(operator){
		case '+': result = num1+num2;
			break;
		case '-': result = num1-num2;
			break;
		case '*': result = num1*num2;
			break;
		case '/': result = num1/num2;
			break;
	}
	res.send({
		num1: num1,
		num2: num2,
		operator: operator,
		result: result
	});
})

app.listen(port, () =>{

	console.log(`Listening on port ${port}`);
});
