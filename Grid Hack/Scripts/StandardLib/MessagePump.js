"use strict"


var stdlib = (function(stdlib){
	console.log("StandardLib/MessagePump.js loaded");

	/**
	 * Description
	 * @method MessagePump
	 * @return 
	 */
	function MessagePump(){
		this.msgQueue = [];
		this.listeners = {};
	}

    /**
     * Description
     * @method addListener
     * @param {} msg
     * @param {} el
     * @param {} fn
     * @return 
     */
    MessagePump.prototype.addListener = function(msg, el, fn){
        this.listeners[msg] = this.listeners[msg] || [];
        this.listeners[msg].push({"el" : el, "fn" : fn});
    };

    /**
     * Description
     * @method postMessage
     * @param {} msg
     * @param {} args
     * @return 
     */
    MessagePump.prototype.postMessage = function(msg, args){
        this.msgQueue.push({"msg" : msg, "args" : args});
    };

    /**
     * Description
     * @method getMessage
     * @return undefined
     */
    MessagePump.prototype.getMessage = function(){
        if(this.msgQueue.length > 0){
        	return this.msgQueue.shift();
        }

        return undefined;
    };

    /**
     * Description
     * @method handleMessages
     * @return 
     */
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

    MessagePump.prototype.removeListener = function(msg, el){
        console.log(arguments);
        for(var it = 0; it < this.listeners[msg].length; it++){
            if(el === this.listeners[msg][it].el){
                console.log(this.listeners[msg][it]);
                this.listeners[msg].splice(it, 1);
                it--;
                console.log(this.listeners[msg]);
            }
        }
    };

    stdlib.MessagePump = MessagePump;
	return stdlib;
})(stdlib || {});