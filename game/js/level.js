
var Level = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};
  var i, x, y;


  /* Public variables
  ****************************/
  this.name = initObj.name || "Default level";
  //this.furnitureGroups = initObj.furnitureGroups || [];
  this.map = [];
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


  // CONSIDER: adding creatures 'next to' location if it is already occupied
  this.addCreature = function(creature,location) {
    // creature: Creature object
    // location: Pt object or String("entry") for 'enter on random (unocupied) entry trigger'
    if( !(creature instanceof Creature) ) {
      console.log( "Level: addCreature(fail) creature not supplied." );
      return false;
    } else {
      if( location instanceof Pt ) {
        if( this.map[location.x][location.y].creature === null ) {
          this.map[location.x][location.y].creature = creature;
          this.map[location.x][location.y].creature.tile = this.map[location.x][location.y].creature;
          console.log( "Level: addCreature(success) '"+creature.name+"' added at "+location.toString() );
          return true;
        } else {
          console.log( "Level: addCreature(fail) creature already exists at "+location.toString() );
          return false;
        }
      } else if( location == "entry" ) {
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
          var rand = Math.randomInt( 0, entryPts.length-1 );
          if( this.map[entryPts[rand].x][entryPts[rand].y].creature === null ) {
            this.map[entryPts[rand].x][entryPts[rand].y].creature = creature;
            this.map[entryPts[rand].x][entryPts[rand].y].creature.tile = this.map[entryPts[rand].x][entryPts[rand].y];
            console.log( "Level: addCreature(success) '"+creature.name+"' added at 'Entry Trigger' ("+entryPts[rand].x+","+entryPts[rand].y+") " );
            return true;
          }
          entryPts.splice(rand,1);
        }
        console.log( "Level: addCreature(fail) no entry triggers available."  );
        return false;
      }
    }
  };


};
