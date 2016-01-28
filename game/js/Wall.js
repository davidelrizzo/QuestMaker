
var Wall = function(initObj, tile) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.type = initObj.type || "defaultwall";
  this.facing = initObj.facing || null;
  this.tile = tile || null;
  this.graphicsID = initObj.graphicsID || null;


  /* Init
  ****************************/
  console.log("New Wall");

};
