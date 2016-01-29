
//(function() {
  //'use strict';

  /* Variables
  ****************************/
  var campaign;
  var i, j;
  var activeCreature;
  var activePlayer;
  var activeLevel;


  /* Run the main game
  ****************************/

  // Create new campaign
  campaign = new Campaign(campaignDATA);
  activePlayer = campaign.addPlayer({ name:"Davide", isHuman:true });
  activeCreature = campaign.addCreature( {"type":"barbarian"}, null, activePlayer );
  campaign.addPlayer({ name:"Morcar", isHuman:false });
  activeLevel = campaign.startLevel(0);

  console.log(activeLevel);
  console.log(activePlayer);
  console.log(activeCreature);

  // Start first turn
  activeLevel.startTurn(activeCreature);

  // get creature visibility
  // update revealed tiles
  // draw map
  // if human
  // build player action interface buttons
  // else if AI
  // do creature actions


  // loop through turns
  // PROBLEM: loop is not going to work here!!
      // try: campaign.startTurn(0);
      // keep a counter for current player/creature


  // for( i=0 ; i<campaign.players.length ; i++ ) {
  //   currentPlayer = campaign.players[i];
  //   for( j=0 ; j<campaign.players[i].creatures.length ; j++ ) {
  //     currentCreature = campaign.players[i].creatures[j];
  //     console.log("Start turn: Player["+campaign.players[i].name+"], Creature["+currentCreature.name+"]");

  //     // creature 'enters' if not already on map
  //     if( currentCreature.tile === null ) {
  //       currentLevel.addCreature(currentCreature, "entry");
  //     }

  //
  //   }
  //}


//})();

