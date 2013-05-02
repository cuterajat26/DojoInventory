define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin","dojo/hash",
  "dojo/_base/xhr","dojo/_base/array", "dojo/_base/lang", "dojo/on","dojo/text!./templates/ProductLayout.html",
  "dojo/dom-class","rijit/helpers/FormHelper",
  "dijit/Menu","dijit/MenuItem","dojo/topic","dojo/dom-construct","dijit/PopupMenuItem","dijit/layout/SplitContainer"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,hash, xhr, array, lang, on,
                          template,domClass,FormHelper,Menu,MenuItem,topic,domConstruct){
  
                  return declare("rijit.controllers.ProductsController", [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
  
                         
                           baseClass: "rijitProductController",
                          templateString: template,
                      
  
                      postCreate: function(){
                                  this.inherited(arguments);
                                  eval("this."+this.action+"();");
                                  },
                      add:function(){
                        var form = new FormHelper();
                         var formDom = form.createForm("Product");
                        domConstruct.place(formDom,this.body,"last");
                        form.input("name");
                        form.input("address");
                        form.end("Submit it");

                      },
                      list:function(){
                        this.body.innerHTML="this is the list body";
                      },

                      _onList:function(item){
                         
                      }

                  });
});