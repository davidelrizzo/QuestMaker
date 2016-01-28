
//(function() {
  //'use strict';

  /* Variables
  ****************************/
  var i, j;
  var curentPlayer;
  var curentCreature;
  var curentLevel;


  /* Run the main game
  ****************************/

  // FIX - make method calls from classes more 'clean'

  // Create new campaign
  var campaign = new Campaign(campaignDATA);
  campaign.players.push( new Player({ name:"Davide", isHuman:true, creatures:[{"type":"barbarian"}] }) );
  campaign.players.push( new Player({ name:"Morcar", isHuman:true, }) );
  campaign.currentLevelIndex = 0;
  curentLevel = campaign.generateLevel( campaign.currentLevelIndex );
  campaign.currentPlayerIndex = 0;
  curentPlayer = campaign.getCurrentPlayer();

  // loop through turns
  for( i=0 ; i<campaign.players.length ; i++ ) {
    for( j=0 ; j<campaign.players[i].creatures.length ; j++ ) {
      curentCreature = curentLevel.activeCreature = campaign.players[i].creatures[j];

      console.log(curentLevel);
      console.log(curentPlayer);
      console.log(curentCreature);

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

