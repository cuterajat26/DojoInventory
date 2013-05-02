define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "dijit/form/TextBox","dijit/form/Button","dojo/dom-construct","dojo/_base/lang"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,TextBox,Button,domConstruct,lang){
  
                  return declare("rijit.helpers.FormHelper", [WidgetBase], {
  
                         
                           baseClass: "rijitForm",
                      model:null,
                      modelName:null,
                      fields:new Array(),
                      createForm: function(arg){
                        this.modelName = arg;
                         this.model = eval("new " + arg+"();");
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

                      },
                      end:function(label){
                        arg={};
                        arg.label = label;
                          arg.onClick=lang.hitch(this,"submit");
                         var divField = domConstruct.create("div", {class:"form-row"}, this.domNode,"last");

                        var button = new Button(arg,divField);
                        button.startup();
                      },
                      submit:function(){
                        alert("yo");
                      }
                      

                  });
});