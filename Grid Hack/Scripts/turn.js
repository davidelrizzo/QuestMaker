/**

What sort of turn structure do I want.

Sort first by teams.  Each team goes at one time.

This should be a list to allow for easy rotation.

Assume the players belong to one team.

*/

"use strict"

var gh = (function(gh){


	/**
	 * INPUT
	 *		players: the players.  EG. "Empire" and "Zargon"
	 *		playrs need to be set up in advance.
	 *      Players need 
	 */
    function TurnOrder(playerOrder){
    	this.playerOrder = playerOrder;
    	this.currentTurn = 0;
    }

    TurnOrder.getNextPlayer = function(){
    	return this.playerOrder[this.currentTurn];
    };



    gh.TurnOrder = TurnOrder;

	return gh;
})(gh || {});