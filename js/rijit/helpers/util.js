define(["dojo/json"],function(JSON){
	/**
	 * @class
	 * @name rijit.helper.util
	 */
	var util = {};
	var OLDER_VERSION = 1;
	var NEWER_VERSION  = 2;


	util.equal = function(a, b){
		if( a !== null && typeof a === "object"){
			if(b === null || typeof b !== "object"){
				return false;
			}
			var prop;
			for(prop in a){
				if(!(prop in b)){
					return false;
				} else if(!util.equal(a[prop], b[prop])){
					return false;
				}
			}

			for(prop in b){
				if(!(prop in a)){
					return false;
				}
			}

			return true;
		} else {
			return a == b; //It is not strict type checking
		}
	};

	return util;
});
