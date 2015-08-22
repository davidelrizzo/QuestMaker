/**
 * File: Utility.js
 * Desc:
 */


var QM = QM || {};
QM.API = QM.API || {};
QM.API.Utility = QM.API.Utility || {};

QM.API.Utility.rollDice = function(numDice){
	if(numDice < 0){
		alert("Number of dice rolled must exceed 0");
		return 0;
	}

	var total = 0;
	for(var count = 0; count < numDice; count++){
		total += Math.floor((Math.random() * 6) + 1);
	}

	return total;
};