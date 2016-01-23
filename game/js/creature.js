
var Creature = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.type = initObj.type || "defaultcreature";
  this.name = initObj.name || "Default Creature";
  this.graphicsID = initObj.graphicsID || null;



  /* Init
  ****************************/
  console.log( "New Creature: "+this.name );

};
