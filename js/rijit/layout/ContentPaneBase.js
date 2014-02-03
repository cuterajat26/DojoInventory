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

				if(this.baseHash !== null) {
					this.primaryTab = this.baseHash.segments[0];
				}

				on(navMngr, "preNavigationChange", lang.hitch(this, this.preNavigationCheck));
				on(navMngr, "navigationChange", lang.hitch(this, this.navigationChange));

				var tabContainer = dijit.byId("primaryTabs");
				this.tab = tabContainer.getTabByTitle(this.primaryTab);

				var hash = new Hash();
				this.parameters = hash.getParameters();

				if(this.primaryTab == hash.getPrimaryTab()){
					this.visited = true;
					this.updateContent();
				}
			},

			isRelevantHashChange: function(proposedHash){
				var isRelevant = false;
				//The change is relevant if...

				//it affects this primary tab
				if(proposedHash.getPrimaryTab() == this.tab.tabHash.getPrimaryTab()){

					//and there is any difference in the hash segments
					for(var i=1; i < this.tab.tabHash.getSegments().length || i < proposedHash.getSegments().length; i++){
						if(this.tab.tabHash.getSegments()[i] != proposedHash.getSegments()[i]){
							isRelevant = true;
						}
					}

					//or there is a change to the region and fabric
					if(proposedHash.getRegion() != this.tab.tabHash.getRegion()
						|| proposedHash.getFabric() != this.tab.tabHash.getFabric()){
						isRelevant = true;
					}
				}

				return isRelevant;
			},

			preNavigationCheck: function(event){
				//Override this. Use this.isRelevantHashChange(event.hash)
				//to see if it is necessary to generate navigation warnings.
				//A navigation warning must be issued if there is any
				//potential of losing work due to navigating to event.hash.
			},

			navigationChange: function(event){
				if(this.isRelevantHashChange(event.hash)){
					this.updateContent();
				} else if(event.hash.getPrimaryTab() == this.primaryTab && !this.visited){
					this.visited = true;
					this.updateContent();
				}
			},

			updateContent: function(){
				//Override this. Update the current content based on hash.
			}


		});
	});
