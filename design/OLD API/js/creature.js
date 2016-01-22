/*jslint browser: true, white: true*/
"use strict";


var api = window.api || {};

// Class: Creature
// ======================================
api.Creature = function () {

  // id - String: lowercase only
  // name - String
  // team - arrayIndex
  // player - arrayIndex
  // location - Pt
  // visibleTiles - [[Tile]]
  // actionQueue - []
  // inventory - [Equipment]
  // conditions - [Condition]
  // spells - [Spell]
  // spellsPerSchool - int
  // spellSchoolsKnown - [spellSchoolID];
  // graphics - JSON

  /* Integer Stats
  ********************/
  // body, bodyToltal
  // mind, mindTotal
  // move, moveTotal, moveDice
  // attack, attackChance
  // defence, defenceChance
  // disarmChance
  // actions, actionsTotal
  // attacks, attacksTotal
  // searches, searchesTotal, searchRadius

  /* Boolean Stats
  ********************/
  // canActivateTriggers
  // canActivateWalls
  // canRevealMap


  /* Methods
  ********************/
  // rollMove() - rolls moveDice + moveTotal
  // heal(amount)
  // damage(amount)
  // die()
  // move(Pt)
  // attack(Creature)
  // defend() - returns defence rolls [int]
  // search(Furniture) - for treasure
  // search(Pt) - for traps
  // activate(Wall) - eg. open door
  // activate(Trigger) - eg. step on trap
  // trade(Creature|Furniture, Equipment, quantity)
  // add(Equipment, quantity)
  // remove(Equipment, quantity)
  // drop(Equipment, quantity)
  // buy(Equipment, quantity)
  // addCondition(Condition)
  // removeCondition(Condition)

  /* Check methods (Return Boolean)
  ********************/
  // canMove(Pt)
  // canAttack(Creature)
  // .. pretty much most methods with 'can'



};

