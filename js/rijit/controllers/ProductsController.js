define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin","dojo/hash",
  "dojo/_base/xhr","dojo/_base/array", "dojo/_base/lang", "dojo/on","dojo/text!./templates/ProductLayout.html",
  "dojo/dom-class","dijit/Menu","dijit/MenuItem","dojo/topic","dojo/dom-construct","dijit/PopupMenuItem","dijit/layout/SplitContainer"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,hash, xhr, array, lang, on,
                          template,domClass,Menu,MenuItem,topic,domConstruct){
  
                  return declare("rijit.controllers.ProductsController", [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
  
                         
                           baseClass: "rijitProductController",
                          templateString: template,
                      
  
                      postCreate: function(){
                                  this.inherited(arguments);
                                  eval("this."+this.action+"();");
                                  },
                      add:function(){
                        this.body.innerHTML="this is the body";
                      },
                      list:function(){
                        this.body.innerHTML="this is the list body";
                      },

                      _onList:function(item){
                         
                      }

                  });
});