
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
  activePlayer = campaign.addPlayer({ name:"Davide", isHuman:true, team:0 });
  activeCreature = campaign.addCreature( {"type":"barbarian"}, null, activePlayer );
  campaign.addPlayer({ name:"Morcar", isHuman:false, team:1 });
  activeLevel = campaign.startLevel(0);

  console.log(activeLevel);
  console.log(activePlayer);
  console.log(activeCreature);

  // Start first turn
  activeLevel.enterCreature(activeCreature);
  //activeLevel.revealMap(activeCreature.lineOfSight);


  // draw map
  // if human
    // build player action interface buttons
  // else if AI
    // do creature actions



//})();

