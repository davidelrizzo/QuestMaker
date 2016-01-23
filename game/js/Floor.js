
var Floor = function(initObj) {
  'use strict';


  /* Private variables
  ****************************/
  initObj = initObj || {};


  /* Public variables
  ****************************/
  this.facing = initObj.facing || 0;
  this.graphicsID = initObj.graphicsID || null;


  /* Init
  ****************************/
  console.log("New Floor");

};
