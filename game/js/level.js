
var Level = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};
  var i, r, x, y;


  /* Public variables
  ****************************/
  this.name = initObj.name || "Default level";
  this.map = [];
  //this.furnitureGroups = initObj.furnitureGroups || [];
  //this.turnCounter = null;
  //this.activeCreature = null;



  /* Init
  ****************************/

  // Build map
  if( initObj.map ) {
    for( x=0 ; x<initObj.map.length ; x++ ) {
      if( this.map[x] === undefined ) this.map[x] = [];
      for( y=0 ; y<initObj.map.length ; y++ ) {
        initObj.map[x][y].x = x;
        initObj.map[x][y].y = y;
        this.map[x][y] = new Tile(initObj.map[x][y]);
      }
    }
  }

  console.log( "New Level: "+this.name );



  /* Public methods
  ****************************/


  this.enterCreature = function(creature) {
    if( !(creature instanceof Creature) ) {
      throw new Error('Level:enterCreature() creature not supplied.');
    } else {
      var entryPts = [];
      for( x=0 ; x<this.map.length ; x++ ) {
        for( y=0 ; y<this.map[x].length ; y++ ) {
          if( this.map[x][y].trigger && this.map[x][y].trigger.type == "entry" ) {
            var newPt = new Pt(x,y);
            entryPts.push(newPt);
          }
        }
      }
      while(entryPts.length > 0) {
        var r = Math.randomInt( 0, entryPts.length-1 );
        var creatureAtEntry = this.map[entryPts[r].x][entryPts[r].y].creature;
        if( creatureAtEntry === null ) {
          creatureAtEntry = creature;
          this.map[entryPts[r].x][entryPts[r].y].creature = creatureAtEntry;
          creatureAtEntry.tile = this.map[entryPts[r].x][entryPts[r].y];
          console.log( "Level:enterCreature() '"+creature.name+"' entered at entry Trigger ("+entryPts[r].x+","+entryPts[r].y+") " );
          this.updateLineOfSight(creatureAtEntry);
          return true;
        }
        entryPts.splice(r,1);
      }
      throw new Error('Level:enterCreature() no entry triggers available.');
    }
  };


  this.updateLineOfSight = function(creature) {
    var origin = creature.tile.location;
    console.log( "Creature:updateLineOfSight() for '"+creature.name+"' from "+origin.toString() );

  };


};
