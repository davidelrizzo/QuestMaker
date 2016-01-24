
var Level = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};
  var x, y;


  /* Public variables
  ****************************/
  this.name = initObj.name || "Default level";
  this.map = [];



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


};
