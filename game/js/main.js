
//(function() {

  // Run the main game
  // ======================================

  //'use strict';


  // Create new campaign
  var campaign = new Campaign(campaignJSON);
  campaign.players.push( new Player({ name:"Davide", isHuman:true, creatures:[{"type":"barbarian"}] }) );
  campaign.players.push( new Player({ name:"Morcar", isHuman:true, }) );
  campaign.currentLevel = campaign.getNextLevel(); // returns Level
  //campaign.currentLevel.startLevel();

  // start new level
  // Draw map
  // Add hero
  // start turn
    // move
    // end turn

//})();

