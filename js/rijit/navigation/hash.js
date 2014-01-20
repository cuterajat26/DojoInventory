define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/hash",
	"dojo/io-query"
], function(
	declare,
	lang,
	dojoHash,
	ioQuery
){
	/***************************************************************************
		Hash provides a convenient way of storing the hash from the end of
		the URL. A particular format of the hash is expected. It begins with
		0 or more navigation clues delimited by "/". URL parameters follow,
		beginning with a "?" and match the standard format for URL
		parameters.
			|
			| www.example.com/#Servies/sca?region=na&fabric=devo
			|

		Hash is very robust. If you don't get out what you
		wanted, then you probably messed up on what you put in.

		The constructor is quasi-overloaded to serve the following purposes:
			- convert a hash string into a usable object
				|
				| var hash = "Service Resources/sca?region=na&fabric=devo";
				| var myHash = new Hash(hash);
				|
			- convert a Hash-like object into a hash string
				|
				| var hashObj =
				| {
				|	segments: ["Service Resources","sca"],
				|	parameters:
				|	{
				|		region: "na",
				|		fabric: "corp"
				|	}
				| };
				| var myHash = new Hash(hashObj);
				| var hashString = myHash.getHash();
				|
			- duplicate an existing hash object
				|
				| var currentHash = new Hash();
				| var duplicateHash = new Hash(currentHash);
				|
			- get the current hash and convert it into a usable object
				|
				| var myHash = new Hash();
				|

		The following useful functions are made available:
			- <string> getHash: the actual hash string
			- <string> getPrimaryTab: the primary tab specified by the hash
			- <string array> getSegments: an array of navigation clues
			- <object> getParameters: parameters' key-value pairs
			- <string> getRegion: returns null if parameters have not been set
			- <string> getFabric: returns null if parameters have not been set
			- setHash(<string> hash): updates the Hash object to match the give hash
			- setPrimaryTab(<string> primaryTab): sets the primaryTab
			- setParameters(<object> parameters): sets parameters to the give object
			- setParametersFromCurrentURL: Set the parameters to be the same as the parameters in the current URL
			- setRegion(<string> region): sets the region in the parameters object
			- setFabric(<string> fabric): sets the fabric in the parameters object
			- isEqual(<object> hashObj): compares this instance to the given Hash object
			-instance and returns true if they are equal; false otherwise. Equality
			-is determined by comparing hash strings.

	***************************************************************************/
	var Hash = declare("Hash", null, {
		primaryTab: null,
		segments: null, // TODO Consider naming this to hashSegments.
		parameters: null,
		contentParamsPrefix: "contentParams.",
		constructor: function(hash) {
			if (typeof hash === "string") {

				this.parseHashString(hash);

			} else if (hash instanceof Hash) {
				this.primaryTab = hash.getSegments()[0]; // TODO Remove the notion of primaryTab
				this.segments = hash.getSegments();
				this.parameters = hash.getParameters();

			} else if (hash && typeof hash === "object") {
				this.primaryTab = hash.segments[0];
				this.segments = hash.segments;
				this.parameters = hash.parameters;
			} else {
				this.parseHashString(this.getHashFromURL());
			}
		},

		generateHashString: function() {
			var hash = this.getSegmentsAsString();

			if (this.parameters !== null) {
				hash += "?" + ioQuery.objectToQuery(this.parameters);
			}
			return hash;
		},

		parseHashString: function(hash) {
			hash = decodeURI(hash);
			var uri = hash.split('?');

			if (uri[0] === "") {
				this.segments = [];
			} else {
				this.segments = uri[0].split('/');
			}

			this.primaryTab = this.segments[0];

			if (uri.length > 1) {
				this.parameters = ioQuery.queryToObject(uri[1]);
			}
		},

		getHashFromURL: function() {
			//return decodeURIComponent(dojoHash());
			return dojoHash();
		},

		getHash: function() {
			return this.generateHashString();
		},

		getPrimaryTab: function() {
			return this.primaryTab;
		},

		getSegments: function() {
			return lang.clone(this.segments);
		},

		getSegmentsAsString: function() {
			var segments = "";
			if (this.segments) {
				segments = this.segments.join("/");
			}
			return segments;
		},

		getParameters: function() {
			return lang.clone(this.parameters);
		},



		setHash: function(hash) {
			this.parseHashString(hash);
		},

		setPrimaryTab: function(pimaryTab) {
			this.primaryTab = this.segments[0] = pimaryTab;
		},

		setParameters: function(parameters) {
			this.parameters = parameters;
		},

		setParametersFromCurrentURL: function() {
			this.parameters = new Hash().getParameters();
		},

		isEqual: function(hashObj) {
			return this.generateHashString() === hashObj.getHash();
		},

		setContentParams: function(params) {
			this.clearContentParams();
			var contentParams = {};
			for (var i in params) {
				contentParams[this.contentParamsPrefix + i] = (typeof params[i] === "string") ? params[i] : JSON.stringify(params[i]);
			}
			var updatedParams = this.getParameters();
			lang.mixin(updatedParams, contentParams);
			this.setParameters(updatedParams);
		},

		getContentParams: function() {
			var currentParams = this.getParameters();
			var contentParams = null;
			for (var i in currentParams) {
				if (i.indexOf(this.contentParamsPrefix) === 0) {
					if (contentParams === null) {
						contentParams = {};
					}
					/*Extract the text after contentParamsPrefix which represents the actual name
					 * of content query param*/
					var contentParamKey = i.slice(this.contentParamsPrefix.length, i.length);
					contentParams[contentParamKey] = currentParams[i];
				}
			}
			return contentParams;
		},

		clearContentParams: function() {
			var currentParams = this.getParameters();
			var updatedParams = {};
			for (var i in currentParams) {
				if (i.indexOf(this.contentParamsPrefix) === 0) {
					continue;
				}
				updatedParams[i] = currentParams[i];
			}
			this.setParameters(updatedParams);
		}

	});
	return Hash;
});