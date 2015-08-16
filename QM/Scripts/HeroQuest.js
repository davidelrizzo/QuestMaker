/**
 * File: HeroQuest.js
 * Desc: This file contains the relevant data to the Hero Qeust main campaign.  It
 *		is an instance of the Camaign class.
 */

"use strict"

var QM = (function(QM){

	QM.HeroQuest = new QM.Campaign(getAJAX("http://localhost/QuestMaker/QM/Data/HeroQuest.json"));

	return QM;
})(QM || {});