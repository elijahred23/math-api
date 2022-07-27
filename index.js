const express = require('express');
const ejs = require('ejs');
const port = 3000;
const app = express();

function isOperator(char) {
    return !(char != '*' && char != '+' && char != '-' && char != '/');
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/css/style.css");
});

app.get("/math", (req, res) => {
    let query = req.query;
    let num1 = parseFloat(query.num1);
    let num2 = parseFloat(query.num2);
    let operator = query.operator;
    let result;

    let missing = [];

    if (num1 == null)
        missing.push("num1");
    if (num2 == null)
        missing.push("num2");
    if (operator == null)
        missing.push("operator");

    if (missing.length > 0) {
        res.send({
            error: "data missing: " + missing.join(" ")
        });
        return;
    }

    if (!isOperator(operator)) {
        res.send({
            error: "incorrect operator, use one of the following: + - * /"
        });
        return;
    }
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    res.send({
        num1: num1,
        num2: num2,
        operator: operator,
        result: result
    });
})

app.listen(port, () => {

    console.log(`Listening on port ${port}`);
});