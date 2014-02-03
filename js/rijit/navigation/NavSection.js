define(
		[
				"dojo/_base/declare",
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
				"dojo/text!./templates/NavSection.html",
				"dojo/json",
				"dijit/form/Button",
				"dojo/dom-construct",
				"dojo/io-query",
				"dijit/layout/BorderContainer",
				"dijit/layout/ContentPane",
				"dojox/widget/Standby",
				"dojo/dom-style",
				"dojo/store/Memory",
				"dijit/tree/ObjectStoreModel",
				"dojo/store/Observable",
				"dijit/Tree"
				],
		function(
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
				template,
				JSON,
				Button,
				domConstruct,
				ioQuery,
				BorderContainer,
				ContentPane,
				Standby,
				domStyle,
				Memory,
				ObjectStoreModel,
				Observable,
				Tree) {

				return declare(
					"rijit.navigation.NavSection",
					[ WidgetBase, _LayoutWidget, TemplatedMixin, WidgetsInTemplateMixin],
					/** @lends rijit.navigation.NavSection# */
					{
						baseClass : "rijitNavigationSection",
						templateString : template,
						items : null,
						itemReferenceMap : null,
						tree : null,
						configurationData : null,
						table : null,
						_isSubmitButtonRequired : false,
						_tableGroups : null,
						filterQueryObject : null,
						_timer : null,
						_listeners:null,
						navigationStack:undefined,
						_navigationDataRequest : null,
						_pollingRequest : null,
						_navigationHashSectionIndex : 1,
						queryObject : {},
						_loadingIndicator : null,
						buildingNavTree : false,
						GROUP_KEY : "group",
						pendingNavigation : null,
						scaSpecificHumanReadableNameMap : null,

						postCreate : function() {

							this.inherited(arguments);
							this.buildNavTree();
						},
						buildNavTree: function(){
							 myStore = new Memory({
						        data: [
						            { id: 'world', name:'The earth', type:'planet', population: '6 billion'},
						            { id: 'AF', name:'Africa', type:'continent', population:'900 million', area: '30,221,532 sq km',
						                    timezone: '-1 UTC to +4 UTC', parent: 'world'},
						                { id: 'EG', name:'Egypt', type:'country', parent: 'AF' },
						                { id: 'KE', name:'Kenya', type:'country', parent: 'AF' },
						                    { id: 'Nairobi', name:'Nairobi', type:'city', parent: 'KE' },
						                    { id: 'Mombasa', name:'Mombasa', type:'city', parent: 'KE' },
						                { id: 'SD', name:'Sudan', type:'country', parent: 'AF' },
						                    { id: 'Khartoum', name:'Khartoum', type:'city', parent: 'SD' },
						            { id: 'AS', name:'Asia', type:'continent', parent: 'world' },
						                { id: 'CN', name:'China', type:'country', parent: 'AS' },
						                { id: 'IN', name:'India', type:'country', parent: 'AS' },
						                { id: 'RU', name:'Russia', type:'country', parent: 'AS' },
						                { id: 'MN', name:'Mongolia', type:'country', parent: 'AS' },
						            { id: 'OC', name:'Oceania', type:'continent', population:'21 million', parent: 'world'},
						            { id: 'EU', name:'Europe', type:'continent', parent: 'world' },
						                { id: 'DE', name:'Germany', type:'country', parent: 'EU' },
						                { id: 'FR', name:'France', type:'country', parent: 'EU' },
						                { id: 'ES', name:'Spain', type:'country', parent: 'EU' },
						                { id: 'IT', name:'Italy', type:'country', parent: 'EU' },
						            { id: 'NA', name:'North America', type:'continent', parent: 'world' },
						            { id: 'SA', name:'South America', type:'continent', parent: 'world' }
						        ],
						        getChildren: function(object){
						            // Add a getChildren() method to store for the data model where
						            // children objects point to their parent (aka relational model)
						            return this.query({parent: object.id});
						        }
						    });

						    // Wrap the store in Observable so that updates to the store are reflected to the Tree
						    myStore = new Observable(myStore);

						    myModel = new ObjectStoreModel({
						        store: myStore,
						        query: { id: "world" }
						    });
						    var divTree = domConstruct.create("div", {}, this.treeNode.domNode, "first");

						    this.tree = new Tree({
						    	model:myModel,
						   		autoExpand : true,
							},divTree);
						    this.tree.startup();
						}
					});
			});