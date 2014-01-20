define(["dojo/_base/lang", "dojo/_base/declare", "dijit/layout/TabContainer", "dijit/layout/ScrollingTabController",
         "dojo/on", "rijit/navigation/NavigationManager","rijit/navigation/hash"],
	function(lang, declare, TabContainer, ScrollingTabController, on, navMngr, Hash){
		return declare("rijit.layout.TabContainer", [TabContainer], {

			baseHash: null,
			linkParametersToTabs: false,

			onNavigationChange: null,

			getTabByTitle: function (title){
				var tabs = this.getChildren();
				var i;
				for(i=0; i<tabs.length; i++){
					if(tabs[i].get("title") == title) {
						return tabs[i];
					}
				}
				return undefined;
			},

			navigationChange: function(event){

				var relevantHashSegment = typeof this.selectedChildWidget !== "undefined" ? this.selectedChildWidget.title : undefined;

			//	if(navMngr.isRelevantNavigationChange({
			//	newHash: event.hash,
			//	baseHash: this.baseHash,
			//	relevantHashSegment: relevantHashSegment
			// }))
				{
					var tab = this.getTabByTitle(event.hash.segments[this.baseHash.segments.length]);

					// Tab is specified in the hash. Select that tab.
					if(typeof tab !== "undefined") {
						this.selectChild(tab);
					}
					// Tab is not specified in the hash. Set the hash to the currently selected tab.
					else if(typeof this.selectedChildWidget !== "undefined"){
						navMngr.setHash(this.selectedChildWidget.tabHash);
					}

					// Tab is not specified in the hash and no tab has been selected. Set hash to the first tab.
					else if(this.getChildren().length > 0){
						navMngr.setHash(this.getChildren()[0].baseHash);
					}

					// There aren't any tabs to select.
				}
			},

			postMixInProperties: function(){
				this.inherited(arguments);

				this.onNavigationChange = on(navMngr, "navigationChange", lang.hitch(this, this.navigationChange));
			},

			startup: function(){

				/*
				 * Programmatically created rijits should not make a call to startup. However, startup does seem to get
				 * called when programmatically creating a TabContainer. This causes issues. If the TabContainer has
				 * no children (or no tabs) then startup is skipped.
				 *
				 * TODO Is this okay?
				 */

				/*var hash = new Hash();
				var isTabSpecified = false; // Is the tab specified in the hash?

				this.getChildren().forEach(function(tab){

					this._prepareTab(tab);

					// If a tab is specified in the hash, then select it.
					if(hash.segments[this.baseHash.segments.length] == tab.title){
						this.selectChild(tab);
						isTabSpecified = true;
					}

				}, this);

				// If a tab is not specified in the hash, then set the hash to specify the first tab
				if(!isTabSpecified && this.getChildren().length > 0){
					var newHash = new Hash(this.getChildren()[0].baseHash);
					newHash.setParametersFromCurrentURL();
					navMngr.setHash(newHash);
				}*/

				this.inherited(arguments);
			},

			addChild: function(tab){
				if(this._started){
					this._prepareTab(tab);
				}

				this.inherited(arguments);

				// If a tab is specified in the hash, then select it.
				/*var hash = new Hash();
				if(hash.segments[this.baseHash.segments.length] == tab.title){
					this.selectChild(tab);
				}*/
			},

			_prepareTab: function(tab){
				// Tell the lab if it should store the last region and fabric is was set to.
				tab.linkParametersToTabs = this.linkParametersToTabs;

				// Give the tab a baseHash
				tab.baseHash = new Hash(this.baseHash);
				tab.baseHash.segments.push(tab.title);
			},

			uninitialize: function(){
				this.onNavigationChange.remove();
			}
		});
	});
