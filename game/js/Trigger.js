
var Trigger = function(initObj, tile) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.type = initObj.type || "defaulttrigger";
  this.tile = tile || null;


  /* Init
  ****************************/
  console.log("New Trigger");

};
