define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "rijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "rijit/navigation/NavigationManager",
    "rijit/navigation/hash",
    "rijit/navigation/NavPlugin"
], function(
	lang,
    declare,
    TabContainer,
    ContentPane,
    navMngr,
    Hash,
    NavPlugin
){
		return declare("rijit.TabManager", [TabContainer], {
			postCreate:function(){
				var navPlugin = new NavPlugin();
				this.addChild(new ContentPane({
									title: "hello",
									selected: true,
									style:"height:100%",
									content: navPlugin
								}));
				navPlugin.startup();
				navPlugin = new NavPlugin();
				this.addChild(new ContentPane({
									title: "hello2",
									selected: false,
									content: navPlugin
								}));
				navPlugin.startup();

				navPlugin = new NavPlugin();
				this.addChild(new ContentPane({
									title: "hello3",
									selected: false,
									content: navPlugin
								}));
				navPlugin.startup();
				this.inherited(arguments);
			}
	});
});