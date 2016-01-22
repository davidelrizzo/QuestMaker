
var Level = function(initObj) {
  'use strict';


  /* Static variables
  ****************************/
  //Level.DATA - Blueprint data for all levels


  /* Public variables
  ****************************/
  this.name = "Anonymous level";
  this.map = [[]];


  /* Private methods
  ****************************/
  var _buildMap = function(mapDATA) {
    // Take map JSON data and build 2D array of Class objects
    console.log( "_buildMap()" );
  };


  /* Init
  ****************************/
  if( initObj.name ) this.name = initObj.name;
  console.log( "New Level: "+this.name );
  if( initObj.map ) this.map = _buildMap(initObj.map);


};
