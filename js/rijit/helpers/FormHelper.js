define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "dijit/form/TextBox","dojo/dom-construct"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,TextBox,domConstruct){
  
                  return declare("rijit.helpers.FormHelper", [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
  
                         
                           baseClass: "rijitForm",
                      model:null,
                      modelName:null,
                      fields:new Array(),

                      create: function(arg){
                        this.modelName = arg;
                        // this.model = eval("new " + arg+"();");
                        this.domNode = domConstruct.create("div",{class:"form "+arg});
                        return this.domNode;
                      },
                      input: function(field,options){
                        if(typeof options ==="object")
                          options.id = field;
                        var divField = domConstruct.create("div", {class:"form-row"}, this.domNode,"last");
                        var labelField = domConstruct.create("div", {class:"form-row-field"}, divField,"last");
                        labelField.innerHTML=field;
                        var labelField = domConstruct.create("div", {class:"form-row-value"}, divField,"last");

                        var field = new TextBox(options,labelField);
                        field.startup();
                        this.fields.push(field);

                      }
                      

                  });
});