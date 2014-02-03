define([
	 "dojo/_base/declare",
	 "dojo/_base/lang",
	 "dojo/dom-construct",
	 "dojo/_base/xhr",
	 "dijit/_TemplatedMixin",
	 "dijit/_WidgetsInTemplateMixin",
	 "dijit/layout/_LayoutWidget",
	 "rijit/content/ContentPaneBase",
	 "dijit/layout/TabContainer",
	 "rijit/navigation/NavigationManager",
	 "rijit/navigation/hash",
	 "dojo/text!./templates/NavPluginContent.html",
	 "dojox/layout/TableContainer",
	 "dijit/form/TextBox",
	 "dijit/form/SimpleTextarea",
	 "rijit/config/AutogenPropertyTypeMap",
	 // "rijit/navigation/NavigationPluginManager",
	 // "rijit/navigation/Iframe",
	 "dojo/_base/array",
	 "dojo/dom-style",
	 "dojo/json",
	 "dojo/on",
	 // "rijit/Messaging",
	 // "gijit/Dialog",
	 "rijit/helpers/util"
], function(
	declare,
	lang,
	domConstruct,
	xhr,
	TemplatedMixin,
	WidgetsInTemplateMixin,
	LayoutWidget,
	ContentPaneBase,
	TabContainer,
	navMngr,
	Hash,
	template,
	TableContainer,
	TextBox,
	TextArea,
	AutogenPropertyTypeMap,
	// NavPluginManager,
	// Iframe,
	array,
	domStyle,
	JSON,
	on,
	// Messaging,
	// Dialog,
	util
){
    /**
	 * Creates the content according to the tree item selected via NavigatonSection.This
	 * is also responsible for generating inner subtabs and handle their corresponding
	 * hash changes.
	 *
	 *
	 * @name gijit.navigation.NavigationPluginContent
	 */


        return declare("rijit.navigation.NavPluginContent", [ ContentPaneBase, LayoutWidget, TemplatedMixin,
	    WidgetsInTemplateMixin ],
	    {
		/** @lends gijit.navigation.NavigationPluginContent# */
		templateString : template,
		baseClass : "rijitNavPluginContent",
		baseHash : null,
		currentHash:null,
		content : null,
		sca_label:'MockProduct_1',
		store : null,
		relevantHashSegment : undefined,
		preNavigationCheckList : {},
		innerTabStore:{},
		proposedInnerTabHashSegment : null,
		startup : function() {
		    this.inherited(arguments);

		    // on(NavPluginManager, "storeCreated", lang.hitch(this, this.storeCreated));
		    // on(NavPluginManager, "landingPageAvailable", lang.hitch(this, this._landingPageAvailable));
		    // on(NavPluginManager, "message", lang.hitch(this, this._handleWindowMessage));
		    // on(NavPluginManager, "block", lang.hitch(this, this._handleWindowMessage));
		    // on(NavPluginManager, "unBlock", lang.hitch(this, this._handleWindowMessage));
		    // on(NavPluginManager, "updateContentParams", lang.hitch(this, this._handleWindowMessage));

		    // Messaging.init();
		},
		layout : function() {
			var children = this.getChildren();
			for ( var c in children) {
				if ("resize" in children[c]) {
					children[c].resize(this._contentBox);
				}
			}
		},
		postCreate: function(){
			this.inherited(arguments);
			this.updateContent();
		},
		updateContent:function(){
			var contract = null;
			var url =
			xhr.get({
				sync: true,
				handleAs: "json",
				url : "js/rijit/contracts/"+this.sca_label+".json",
				load: lang.hitch(this,function(data){
					this.contract =  data;
					this._updateTable(data);
				})

			});
		},
		_updateTable: function(contract){
				var programmatic = new dojox.layout.TableContainer(
				{
				 	cols: 4,
				  	customClass:"autogenTable",
				  	"labelWidth": "150"
				}, this.autogenTable);
                var tab = new TextBox();
           
    array.forEach(contract.properties,lang.hitch(this,function(property){
					var Type = AutogenPropertyTypeMap.getDijitForType(property.property_type)[0];

					var text1 = new Type({style:{width:"100%"},label: property.property_name,colspan:2});
								programmatic.addChild(text1);
				}));


			programmatic.startup();
		}


	});
});
