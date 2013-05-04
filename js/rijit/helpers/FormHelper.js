define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "dijit/form/TextBox","dijit/form/Button","dojo/dom-construct","dojo/_base/lang","dojo/_base/array"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,TextBox,Button,domConstruct,lang,array){
  
                  return declare("rijit.helpers.FormHelper", null, {
  
                         
                           baseClass: "rijitForm",
                      model:null,
                      modelName:null,
                      fields:null,
                      createForm: function(arg){
                        this.modelName = arg;
                        this.fields = new Array();
                         this.model = eval("new " + arg+"();");
                        this.domNode = domConstruct.create("div",{class:"form "+arg});
                        return this.domNode;
                      },
                      input: function(field,options){
                        if(typeof options ==="object")
                          options.id = field;
                        else{
                          options = {};
                          options.id=field;
                        }
                        var divField = domConstruct.create("div", {class:"form-row"}, this.domNode,"last");
                        var labelField = domConstruct.create("div", {class:"form-row-field"}, divField,"last");
                        labelField.innerHTML=field;
                        var labelField = domConstruct.create("div", {class:"form-row-value"}, divField,"last");

                        var field = new TextBox(options,labelField);
                        field.startup();
                        this.fields.push(field);

                      },
                      _getData:function(){
                        var modelName = this.modelName;
                        var modelobject = new Array();
                        modelobject[modelName]=new Array();
                        array.forEach(this.fields, function(entry, i){
                          modelobject[modelName][entry.get("id")]=entry.get("value");
                        });
                        return modelobject;
                      },
                      end:function(label){
                        var arg={
                        label : label,
                        onClick:lang.hitch(this,"submit")
                        }
                         var divField = domConstruct.create("div", {class:"form-row"}, this.domNode,"last");

                        var button = new Button(arg,divField);
                        button.startup();
                      },
                      submit:function(){
                      
                       var formData = this._getData();
                       var model = this.model;
                         this.model.save(formData, lang.hitch(this,"_saveCallBack"));
                      },
                      _saveCallBack:function(status,result){
                        if(status){
                        alert(this.modelName+' saved successfully');
                        }
                        else if(this.model.validationErrors[0])
                        {
                            alert(this.model.validationErrors[0]);
                        }
                      }
                      

                  });
});