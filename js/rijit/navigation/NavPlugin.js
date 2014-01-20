define([ "dojo/_base/declare",
         "dijit/_WidgetBase",
         "dijit/layout/_LayoutWidget",
         "dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/_base/xhr",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/on",
	"rijit/navigation/NavigationManager",
	"rijit/navigation/hash",
	"dojo/json",
	"dojo/dom-construct",
	"dojo/text!./templates/NavPlugin.html",
	"dijit/layout/ContentPane",
	"dijit/layout/BorderContainer",


], function(
	declare,
	WidgetBase,
	_LayoutWidget,
	TemplatedMixin,
	WidgetsInTemplateMixin,
	xhr,
	array,
	lang,
	on,
	navMngr,
	Hash,
	JSON,
	domConstruct,
	template,
	ContentPane,
	BorderContainer
) {
	    /**
	 * Creates a navigation area which is in form of an accordian containing
	 *  different nav sections(s).
	 *
	 *
	 * @name gijit.navigation.NavPlugin
	 * @constructor
	 * @param {Object} params
	 * @param {DomNode,String} srcRefNode
	 */

	    return declare("rijit.navigation.NavPlugin", [ WidgetBase, _LayoutWidget, TemplatedMixin,
		    WidgetsInTemplateMixin ], {
		/** @lends gijit.navigation.NavPlugin# */

		baseClass : "rijitNavPlugin",
		templateString : template,
		items : null,
		itemReferenceMap : null,
		tree : null,
		filterProperties : {},
		configurationData : [],
		filterQueryObject : null,
		queryObject : {},
		navigationSections : [],
		accordian : null,
		hash : null,
		buildingNavTree : false,
		layout : function() {
			var children = this.getChildren();
			for ( var c in children) {
				if ("resize" in children[c]) {
					children[c].resize(this._contentBox);
				}
			}
		}
		});

	});
