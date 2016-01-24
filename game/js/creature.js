
var Creature = function(initObj) {
  'use strict';


  /* Static variables
  ****************************/

  // data for Creature templates (loaded by Campaign)
  /* jshint ignore:start */
  Creature.TEMPLATES;
  /* jshint ignore:end */


  /* Private variables
  ****************************/
  initObj = initObj || {};
  var i, p;


  /* Public variables
  ****************************/
  this.type = initObj.type || "defaultcreature";
  this.name = initObj.name || "Default Creature";
  this.graphicsID = initObj.graphicsID || null;



  /* Init
  ****************************/
  console.log( "New Creature: "+this.name );

};



/* Static methods
  ****************************/

// merges Creature init object with Template init object if matching
Creature.TEMPLATE = function(initObj) {
  var result = Creature.TEMPLATES.filter( function(prop) {
    return prop.type == initObj.type;
  });
  result = result[0];
  for (var prop in result) { initObj[prop] = result[prop]; }
  return initObj;
};
