// Stops jsLint complaining about the global 'window' object
/*jslint browser: true*/

// Sets JavaScript to scrict mode
"use strict";

// Creates the QuestMaker global namespace if it doesn't already exist
var QM = window.QM || {};




/**********************************************************
* CLASS Campaign
* ====
* The Campaign class contains the methods used to run a campaign of game levels. It contains all data that is carried between levels.
**********************************************************/
QM.Campaign = function (args) {


  // CONSTRCUTOR function for Campaign
  this.init = function (args) {
    console.log(args);
  };
  this.init(args);


  // private property
  var _privateProperty = "foo";


  // private method
  var _privateMethod = function (arg) {
    console.log(arg);
  };


  // public property
  this.publicProperty = "bar";


  // public method
  // - from my understanding this is created EVERY time a new instance is, which is less efficient than using .prototype
  this.publicMethod = function (arg1, arg2) {
    console.log(arg1 + arg2);
    console.log(this.publicProperty);
  };


  // privileged public method (like a get function)
  this.privilegedMethod = function () {
    console.log(_privateProperty);
    console.log(_privateMethod("baz"));
  };


  // immutable public property (that instances of this class can't modify)
  var _imutableProperty = "qux";
  this.immutableVariable = function () {
    return _imutableProperty;
  };


};


// Public method added later, available to all instances but only loads once in memory
QM.Campaign.prototype.publicMethod = function () {
  console.log(this.publicVariable);
};


// Static variable shared by all instances
QM.Campaign.STATIC_PROPERTY = "corge";


// static function shared by all instances
QM.Campaign.STATIC_FUNCTION = function (arg) {
  console.log(arg);
};



// Create new instance of this class
var myCampaign = new QM.Campaign({"name": "snaffu"});

