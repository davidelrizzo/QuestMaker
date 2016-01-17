"use strict"

var messagePump = (function (messagePump){

    /**
     * Private Globals
     */
    var msgQueue = {};

    messagePump.getMessage = function(message){
    	if(msgQueue[message] === undefined){
    		return undefined;
    	} 

    	return msgQueue[message].shift();
    };

    messagePump.postMessage = function(message, args){
    	if(msgQueue[message] === undefiend){
    		return;
    	}

    	for(var it = 0; it < msgQueue[message].length; it++){
    		msgQueue[message].fn(args);
    	}
    };

    messagePump.addListener = function(message, fn){
        msgQueue[message] = msgQueue[message] || [];
        msgQueue[message].push({"el": el, "fn" : fn});
    };


	
	return messagePump;
})(messagePump || {});