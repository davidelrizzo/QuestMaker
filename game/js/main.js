
//(function() {
  //'use strict';

  /* Variables
  ****************************/
  var i, j;
  var curentCreature;
  var curentPlayer;
  var curentLevel;


  /* Run the main game
  ****************************/

  // Create new campaign
  var campaign = new Campaign(campaignDATA);
  campaign.addPlayer( new Player({ name:"Davide", isHuman:true, creatures:[{"type":"barbarian"}] }) );
  campaign.addPlayer( new Player({ name:"Morcar", isHuman:false, }) );
  curentLevel = campaign.startLevel(0);


  // loop through turns
  // PROBLEM: loop is not going to work here!!
      // try: campaign.startTurn(0);
      // keep a counter for current player/creature

  for( i=0 ; i<campaign.players.length ; i++ ) {
    curentPlayer = campaign.players[i];
    for( j=0 ; j<campaign.players[i].creatures.length ; j++ ) {
      curentCreature = campaign.players[i].creatures[j];
      console.log("Start turn: Player["+campaign.players[i].name+"], Creature["+curentCreature.name+"]");

      // creature 'enters' if not already on map
      if( curentCreature.tile === null ) {
        curentLevel.addCreature(curentCreature, "entry");
      }

      // get creature visibility
        // update revealed tiles
      // draw map
      // if human
        // build player action interface buttons
      // else if AI
        // do creature actions
    }
  }


//})();

