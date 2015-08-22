"use strict"

var QM = (function(QM){

	// Class Creature
	function Creature(){
		this.team = undefined;
		this.user = undefined;

		this.name = undefined;

		this.body = {
			"base" : undefined,
			"damage" : 0
		};

		this.mind = {
			"base" : undefined,
			"damage" : 0
		};

		this.attackDice = undefined;
		this.defendDice = undefined;

		this.moveDice = undefined;
		this.moveTotal = undefined;
		this.moveCount = 0;

		this.leftHand = undefined;
		this.rightHand = undefined;
		this.chest = undefined;
		this.head = undefined;

		this.posX = undefined;
		this.posY = undefined;
	}

	Creature.prototype.move = function(){
		if(this.moveDice === undefined){
			return this.moveTotal;
		}

		move = this.API.Utility.rollDice(this.moveDice);

		return move;
	};

	Creature.prototype.attack = function(){
	};

	Creature.prototype.defend = function(){
		var defendDice = 0;
		if(this.chest !== undefined){
			// Check for armor
			// defendDice += 
		}
		if(this.leftHand !== undefined){
			// Check for shield
			// defendDice +=
		}
		if(this.head !== undefined){
			// Check for helmet
			// defendDice +=
		}

		if(defendDice == 0){
			// return;
		}

		//return this.defendDice;
	};

	QM.Creature = Creature;
	return QM;
})(QM || {});