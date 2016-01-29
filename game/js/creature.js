
var Creature = function(initObj, tile, player) {
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


  /* Init
  ****************************/
  // merge initObj with Template initObj if 'types' match
  var result = Creature.TEMPLATES.filter( function(prop) {
    return prop.type == initObj.type;
  });
  result = result[0];
  for (var prop in result) { initObj[prop] = result[prop]; }


  /* Public variables
  ****************************/
  this.type = initObj.type || "defaultcreature";
  this.name = initObj.name || "Default Creature";
  this.tile = tile || null;
  this.player = player || null;
  this.graphicsID = initObj.graphicsID || null;

  console.log( "New Creature: "+this.name );

};
