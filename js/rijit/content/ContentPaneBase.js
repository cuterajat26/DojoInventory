define(["dojo/_base/declare", "dijit/_WidgetBase", "dojo/on", "dojo/_base/lang", "rijit/navigation/NavigationManager", "rijit/navigation/hash"],
	function(declare, WidgetBase, on, lang, navMngr, Hash){
		return declare("rijit.content.ContentPaneBase", [WidgetBase], {

			// TODO Update to use the new method of using the hash.

			primaryTab: "", //Override with the name of the primary tab associated with this content widget
			tab: null,
			visited: false,
			parameters: null,
			baseHash: null,

			startup: function(){
				this.inherited(arguments);
				on(navMngr, "preNavigationChange", lang.hitch(this, this.preNavigationCheck));
				on(navMngr, "navigationChange", lang.hitch(this, this.navigationChange));
				this.updateContent();
			},

			isRelevantHashChange: function(proposedHash){

			},

			preNavigationCheck: function(event){
				//Override this. Use this.isRelevantHashChange(event.hash)
				//to see if it is necessary to generate navigation warnings.
				//A navigation warning must be issued if there is any
				//potential of losing work due to navigating to event.hash.
			},

			navigationChange: function(event){
			},

			updateContent: function(){
				//Override this. Update the current content based on hash.
			}


		});
	});
