
var Tile = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.loc = null;
  this.creature = null;
  this.furniture = null;
  this.trigger = null;
  this.topWall = null;
  this.rightWall = null;
  this.bottomWall = null;
  this.leftWall = null;
  this.floor = null;


  /* Init
  ****************************/
  if( initObj.x!==undefined && initObj.y!==undefined ) this.loc = new Pt(initObj.x,initObj.y);
  if(initObj.creature) this.creature = new Creature( Creature.TEMPLATE(initObj.creature) );
  if(initObj.floor) this.floor = new Floor(initObj.floor);
  console.log( "New Tile" );

};
