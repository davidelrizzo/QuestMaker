/*jslint browser: true, white: true*/

"use strict";



console.log("hello");

var myCampaign = new api.Campaign('{"p": 5}');

var p = new api.Pt(1,2);
var k = new api.Pt(1,(1+1));
console.log( p.toString() );
console.log( k.toString() );
console.log( p.equalTo(k) );
