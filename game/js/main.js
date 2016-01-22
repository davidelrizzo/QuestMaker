//(function() {

  // Run the main game
  // ======================================

  //'use strict';


  // Create new campaign
  var c = new Campaign(campaignJSON);
  c.players.push( new Player({ name:"Davide", isHuman:true, creatures:[new Creature("barbarian")] }) );
  c.players.push( new Player({ name:"Morcar", isHuman:true, }) );
  c.currentLevel = c.getNextLevel(); // returns Level
  //c.currentLevel.startLevel();

  // start new level
  // Draw map
  // Add hero
  // start turn
    // move
    // end turn

//})();

