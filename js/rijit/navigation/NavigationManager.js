define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/Deferred",
	"dojo/_base/lang",
	"dojo/DeferredList",
	"dojo/Evented",
	"dojo/hash",
	"dojo/on",
	"rijit/navigation/hash",
], function(
	array,
	declare,
	Deferred,
	lang,
	DeferredList,
	Evented,
	dojoHash,
	on,
	Hash
){
		var MAX_CONSECUTIVE_HASH_CHANGES = 20;

		var NavigationChangeEvent = function(hash){
			this.cancelable = true;
			this.preventDefault = function(){
				this.cancelable = false;
			};
			this.hash = hash;
		};

		var NavMngr = declare(Evented,{
			declaredClass: "NavMngr",

			constructor: function(args){
				this._filters = [];
			},

			_skipPreNav: false,
			_filters: undefined,

			onHashChange: function(hash){
				var hashObject = new Hash(hash);
				if (!hashObject.isEqual(new Hash(hash))) {
					this.setHash(filteredHash);
					return;
				}


				this._skipPreNav = false;

				//Proceed with requested navigation

			this.emitNavigationChangeEvent(hashObject);

			},



			emitNavigationChangeEvent: function(hash){
				var navChngEvent = new NavigationChangeEvent(hash);
				navChngEvent = on.emit(this, "navigationChange", navChngEvent);
				this.updatePageTitle(hash);
			},

			updatePageTitle: function(hash){
				//TODO: hash.getSegments()[2] is not going to return the best title. We need to implement something better here.
				document.title = ("eCP Management Console - " + (hash.getSegments()[2] || hash.getPrimaryTab())).replace(/undefined/,"Home");
			},

			setHash: function (newHash, skipPreNav){
				if(skipPreNav){
					this._skipPreNav = true;
				}

				if(typeof newHash === "object"){
					newHash = newHash.getHash();
				}

				dojoHash(newHash);
			},

			getHash: function (){
				return new Hash();
			},




			relevantHashSegmentMatch: function(args){
				var newHash = args.newHash || new Hash();
				var baseHash = args.baseHash;
				var relevantHashSegment = args.relevantHashSegment;
				var newRelevantHashSegment = newHash.segments[baseHash.segments.length];

				if(relevantHashSegment === newRelevantHashSegment){
					return true;
				}
				else if(typeof newRelevantHashSegment !== "undefined" && relevantHashSegment == this.decodeHashSegment(newRelevantHashSegment)){
					return true;
				}
				else {
					return false;
				}
			},

			hashParametersMatch: function(args){
				var newParameters = args.newHash.getParameters();
				var origParameters = args.parameters;

				if(typeof origParameters === "undefined" || origParameters === null || newParameters === null) {
					return true; // ignore this case
				}
				for(var p in newParameters){
					if(newParameters[p] != origParameters[p]) {
						return false;
					}
				}
				for(var p in origParameters){ // jshint ignore:line
					if(origParameters[p] != newParameters[p]) {
						return false;
					}
				}

				return true;
			}

		});

		//Instantiate the navigation manager's singleton instance
		var navMngr = new NavMngr();

		//Setup the navigation manager singleton instance to listen to hash changes
		require(["dojo/topic", "dojo/_base/lang"], function(topic, lang){
			topic.subscribe("/dojo/hashchange", null, lang.hitch(navMngr, navMngr.onHashChange));
		});

		return navMngr;
	});