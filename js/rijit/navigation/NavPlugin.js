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
	"rijit/navigation/NavPluginContent",
	"rijit/navigation/NavSection",
	"dojo/json",
	"dojo/dom-construct",
	"dojo/text!./templates/NavPlugin.html",
	"dijit/layout/AccordionContainer",
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
	NavPluginContent,
	NavSection,
	JSON,
	domConstruct,
	template,
	AccordionContainer,
	ContentPane,
	BorderContainer
) {
	    /**
	 * Creates a navigation area which is in form of an accordian containing
	 *  different nav sections(s).
	 *
	 *
	 * @name rijit.navigation.NavPlugin
	 * @constructor
	 * @param {Object} params
	 * @param {DomNode,String} srcRefNode
	 */

	    return declare("rijit.navigation.NavPlugin", [ WidgetBase, _LayoutWidget, TemplatedMixin,
		    WidgetsInTemplateMixin ], {
		/** @lends rijit.navigation.NavPlugin# */

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
		constructor: function(){

		},
		postCreate: function(){
			this.inherited(arguments);
			this._buildNavigation();
		},
		_buildNavigation:function(){
			this._setupAccordion();
			this._buildNavigationSections();
			this.layout();

		},
		_buildNavigationSections: function(){
			for(var i = 0; i < 1; i++){
				var divNavSection = domConstruct.create("div", {});
				var navSection =   new NavSection({
				style : "height: 100%; width: 100%;"
			},divNavSection);
				navSection.startup();
				this.accordian.addChild(new ContentPane({
					title : 'Items',
					content : navSection
				}));
			}
		},
		_setupAccordion: function(){
			if (this.accordian) {
				this.accordian.destroyDescendants();
				this.accordian.destroyRecursive();
				this.accordian = null;

			}
			var divAccordian = domConstruct.create("div", {}, this.navigation, "first");
			this.accordian = new AccordionContainer({
				style : "height: 100%; width: 100%;"
			}, divAccordian);
			this.accordian.startup();
		},
		layout : function() {
			var children = this.getChildren();
			for ( var c in children) {
				if ("resize" in children[c]) {
					children[c].resize(this._contentBox);
				}
			}
		},

		});

	});
