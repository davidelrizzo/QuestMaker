"use strict"


var stdlib = (function(stdlib){
	console.log("StandardLib/MessagePump.js loaded");

	function MessagePump(){
		this.msgQueue = [];
		this.listeners = {};
	}

    MessagePump.prototype.addListener = function(msg, el, fn){
        this.listeners[msg] = this.listeners[msg] || [];
        this.listeners[msg].push({"el" : el, "fn" : fn});
    };

    MessagePump.prototype.postMessage = function(msg, args){
        this.msgQueue.push({"msg" : msg, "args" : args});
    };

    MessagePump.prototype.getMessage = function(){
        if(this.msgQueue.length > 0){
        	return this.msgQueue.shift();
        }

        return undefined;
    };

    MessagePump.prototype.handleMessages = function(){
        while(this.msgQueue.length > 0){
            var msg = this.msgQueue.shift();
            var listeners = this.listeners[msg.msg];
            if(listeners){
                for(var it = 0; it < listeners.length; it++){
                    listeners[it].el[listeners[it].fn](msg.args);
                }
            }
        }
    };

    stdlib.MessagePump = MessagePump;
	return stdlib;
})(stdlib || {});