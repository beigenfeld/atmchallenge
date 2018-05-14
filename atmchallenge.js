var till = [
	{
		//0
		"slot": "Ones",
		"quantity": 10,
		"value": 1
	},
	{
		//1
		"slot": "fives",
		"quantity": 10,
		"value": 5
	},
	{
		//2
		"slot": "tens",
		"quantity": 10,
		"value": 10
	},
	{
		//3
		"slot": "twenties",
		"quantity": 10,
		"value": 20
	},
	{
		//4
		"slot": "fifties",
		"quantity": 10,
		"value": 50
	},
	{
		//5
		"slot": "hundreds",
		"quantity": 10,
		"value": 100
	}
];


function mainMenu (list) {
	console.log("Please make a selection:")
	
	for (let i=0; i<list.length; i++){
		console.log(list[i].key + " = " + list[i].message);
	}
	var userInput = prompt("What would you like to do?");
	verifySelection(userInput, till);
}

var options = [];
function Option (key, message, method) {
	this.key = key;
	this.message = message;
	options.push(this);
}

var withdrawl = new Option("W", "Make a withdrawl");
var refill = new Option("R", "Refill this ATM");
var indicate = new Option("I", "Inquirey of remaining bills");
var quit = new Option("Q", "Quit this transaction");

var par = 10;

function verifySelection(option, till) {
	option = option.toUpperCase();
	switch (option) {
		case "W":
			return withdraw();
			break;
		case "R":
			refillMachine();
			break; 
		case "I":
			inquire(till);
			break;
		case "Q":
			quitProgram();
			break;
		default:
			alert("Not a valid selection.  Please enter one of the options below.");
			var userInput = prompt("What would you like to do?");
			verifySelection(userInput, till);
	}
}

function withdraw() {
	//get withdrawl amount
	var userInput = prompt("How much would you like to withdraw?");
	//verify that it is a whole number and enough money is available
	var amount = parseInt(userInput);
	if (amount == NaN) {
		alert("Invalid amount, please enter a whole number");
		return withdraw();
	}	else  {
		verifyWithdrawl(amount, till);
		retrieveMoneyFromTill(withdrawlArray, till);
		dispense(amount);
	}
}

function refillMachine() {
	console.log("Machibe restocked.");
	for (var i = 0; i<till.length; i++){
		till[i].quantity = par;
	}
	inquire(till);
	mainMenu(options);
}

function inquire(till) {
	console.log("Current contents:");
	for (var i = 0; i<till.length; i++){
		console.log(till[i].slot + ": " + till[i].quantity);
	}
	mainMenu(options);
}

function quitProgram() {
	console.log("Thank you for using this ATM.  Goodbye!");
}

function retrieveMoneyFromTill(array, till){
	till[0].quantity -= array[0];
	till[1].quantity -= array[1];
	till[2].quantity -= array[2];
	till[3].quantity -= array[3];
	till[4].quantity -= array[4];
	till[5].quantity -= array[5];
}

function verifyWithdrawl(amount, till) {
	var hundredsCount = 0;
	var fiftiesCount = 0;
	var twentiesCount = 0;
	var tensCount = 0;
	var fivesCount = 0;
	var onesCount = 0;

	while (amount >= till[5].value && till[5].quantity > hundredsCount){
		amount -= till[5].value;
		hundredsCount++;
	}
	while (amount >= till[4].value && till[4].quantity > fiftiesCount){
		amount -= till[4].value;
		fiftiesCount++;
	}
	while (amount >= till[3].value && till[3].quantity > twentiesCount) {
		amount -= till[3].value;
		twentiesCount++;
	}
	while (amount >= till[2].value && till[2].quantity > tensCount) {
		amount -= till[2].value;
		tensCount++;
	}
	while (amount >= till[1].value && till[1].quantity > fivesCount) {
		amount -= till[1].value;
		fivesCount++;
	}
	while (amount >= till[0].value && till[0].quantity > onesCount) {
		amount -= till[0].value;
		onesCount++;
	}
	if (amount != 0) {
		insufficientFunds();
	} else {
		return withdrawlArray = [onesCount, fivesCount, tensCount, twentiesCount, fiftiesCount, hundredsCount];
	}
}

function insufficientFunds() {
	console.log("Insufficient funds. Select another amount.");
	withdraw();
}

function dispense(amount) {
	console.log("Here is your $" + amount + ". Thank you!");
	mainMenu(options);
}

//known bugs: withdraw function accepts decimals and rounds down
//if till is empty, need to withdraw $0 to continue, and creates a problem with the quitProgram function
//where it will cycle through each denomination before alloqing quit