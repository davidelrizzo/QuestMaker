"use strict"

var file = file || {};


/**
 * Description
 * @method getAJAX
 * @param {} path
 * @return Literal
 */
file.getAJAX = function(path){
	var request = new XMLHttpRequest();
	request.open("GET", path, false);
	request.send(null);
	if(request.status == 200){
		return request.response;
	} else {
		alert("Error- " + request.status + ": " + request.statusText);
	}

	return null;
};
