
var Floor = function(initObj, tile) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.facing = initObj.facing || 0;
  this.tile = tile || null;
  this.graphicsID = initObj.graphicsID || null;


  /* Init
  ****************************/
  console.log("New Floor");

};
