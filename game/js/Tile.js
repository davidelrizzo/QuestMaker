
var Tile = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.location = null;  // x,y Pt of this Tile's location on the map
  this.revealed = false;  // true if this Tile has been revealed by any creature
  this.creature = null;
  this.furniture = null;
  this.trigger = null;
  this.wallRight = null;
  this.wallBottom = null;
  this.floor = null;


  /* Init
  ****************************/
  if(initObj.x!==undefined && initObj.y!==undefined) this.location = new Pt(initObj.x,initObj.y);
  if(initObj.creature) this.creature = new Creature(initObj.creature, this);
  if(initObj.furniture) this.furniture = new Furniture(initObj.furniture, this);
  if(initObj.trigger) this.trigger = new Trigger(initObj.trigger, this);
  if(initObj.wallRight) {
    initObj.wallRight.facing = 1;
    this.wallRight = new Wall(initObj.wallRight, this);
  }
  if(initObj.wallBottom) {
    initObj.wallBottom.facing = 2;
    this.wallBottom = new Wall(initObj.wallBottom, this);
  }
  if(initObj.floor) this.floor = new Floor(initObj.floor, this);
  console.log( "New Tile" );

};
