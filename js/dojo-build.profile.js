var profile = (function() {
    return {
	basePath : ".",
	//This assumes the source is located in ${putput.dir}/tmp/build/js
	releaseDir : ".",
	releaseName: "lib",
	action : "release",
	layerOptimize : "shrinksafe",
	optimize : "shrinksafe",
	cssOptimize : "comments",
	mini : true,
	stripConsole : "all",
	selectorEngine : "lite",
	defaultConfig : {
	    hasCache : {
		"dojo-built" : 1,
		"dojo-loader" : 1,
		"dom" : 1,
		"host-browser" : 1,
		"config-selectorEngine" : "lite"
	    },
	    async : 1
	},

	staticHasFeatures : {
	    "config-deferredInstrumentation" : 0,//Disables automatic loading of code that reports un-handled rejected promises
	    "config-dojo-loader-catches" : 0, //Disables some of the error handling when loading modules
	    "config-tlmSiblingOfDojo" : 0, //Disables non-standard module resolution code.
	    "dojo-amd-factory-scan" : 0, //Assumes that all modules are AMD
	    "dojo-combo-api" : 0, //Disables some of the legacy loader API
	    "dojo-config-api" : 1, //Ensures that the build is configurable
	    "dojo-config-require" : 0, //Disables configuration via the require()
	    "dojo-debug-messages" : 0, //Disables some diagnostic information
	    "dojo-dom-ready-api" : 1, //Ensures that the DOM ready API is available
	    "dojo-firebug" : 0, //Disables Firebug Lite for browsers that don't have a developer console (e.g. IE6)
	    "dojo-guarantee-console" : 1, //Ensures that the console is available in browsers that don't have it available (e.g. IE6)
	    "dojo-has-api" : 1, //Ensures the has feature detection API is available.
	    "dojo-inject-api" : 1, //Ensures the cross domain loading of modules is supported
	    "dojo-loader" : 1, //Ensures the loader is available
	    "dojo-log-api" : 0, //Disables the logging code of the loader
	    "dojo-modulePaths" : 0, //Removes some legacy API related to loading modules
	    "dojo-moduleUrl" : 0, //Removes some legacy API related to loading modules
	    "dojo-publish-privates" : 0, //Disables the exposure of some internal information for the loader
	    "dojo-requirejs-api" : 0, //Disables support for RequireJS
	    "dojo-sniff" : 1, //Enables some legacy module loading behavior when loading modules from a CDN
	    "dojo-sync-loader" : 1, //Enables the legacy loader
	    "dojo-test-sniff" : 0, //Disables some features for testing purposes
	    "dojo-timeout-api" : 0, //Disables code dealing with modules that don't load
	    "dojo-trace-api" : 0, //Disables the tracing of module loading.
	    "dojo-undef-api" : 0, //Removes support for module unloading
	    "dojo-v1x-i18n-Api" : 1, //Enables support for v1.x i18n loading (required by Dijit)
	    "dom" : 1, //Ensures the DOM code is available
	    "host-browser" : 1, //Ensures the code is built to run on a browser platform
	    "extend-dojo" : 1
	//Ensures pre-Dojo 2.0 behavior is maintained
	},

	packages : [ {
	    name : "dojo",
	    location : "dojo"
	}, {
	    name : "dijit",
	    location : "dijit"
	}, {
	    name : "dojox",
	    location : "dojox"
	}, {
	    name : "rijit",
	    location : "rijit"
	} ],

	layers : {
	    "dojo/dojo" : {
		include : [ "dojo/dojo", "dojo/query", "dojo/hash", "dojo/on", "dojo/aspect", "dojo/dom",
			"dojo/_base/lang", "dojo/i18n", "dojo/domReady", "dojo/parser", "dojo/_base/window",
			"dijit/layout/BorderContainer", "dijit/layout/ContentPane","dijit/layout/TabContainer", ],
		boot : true
	    },

	    "rijit/rijit.manage" : {
		include : [ "rijit/TabManager", "rijit/navigation/NavigationManager","rijit/navigation/hash",
    		"rijit/navigation/NavPlugin","rijit/navigation/NavPluginContent","rijit/navigation/NavSection",
    		"rijit/layout/TabContainer"],
		exclude : [ "dojo/dojo", "dojo/query", "dojo/hash", "dojo/on", "dojo/aspect", "dojo/dom",
			"dojo/_base/lang", "dojo/i18n", "dojo/domReady", "dojo/parser", "dojo/_base/window",
			"dijit/layout/BorderContainer", "dijit/layout/ContentPane" ]
	    }

	}
    };
})();
