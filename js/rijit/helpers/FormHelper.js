define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "dijit/form/ValidationTextBox","dijit/form/Button","dojo/dom-construct","dojo/_base/lang","dojo/_base/array"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,ValidationTextBox,Button,domConstruct,lang,array){
  
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
                      _inputFile:function(field,options){
                        if(typeof options ==="object")
                          options.id = field;
                        else{
                          options = {};
                          options.id=field;
                        }
                        var divField = domConstruct.create("div", {class:"form-row-file"}, this.domNode,"last");
                        var inputField = domConstruct.create("input", {class:"file",type:"file"}, divField,"last");

                        var labelField = domConstruct.create("div", {class:"title"}, divField,"last");

                        labelField.innerHTML=options.title?options.title:"Drop files here";

                      },
                      input: function(field,options){
                        if(options && options.type==="file"){
                          this._inputFile(field,options);
                          return;
                        }
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

                        options.required=true;
                        if(this.model.validation[field]['required']===false){
                          options.required=false;
                        }
                        else if(this.model.validation[field]['rule'] !== "notempty"){
                        options.regExp=this.model.validationHash[this.model.validation[field]['rule']].source;
                        }
                        
                     options.missingMessage = options.invalidMessage=this.model.validation[field]['message'];

                        var field = new ValidationTextBox(options,labelField);
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
                      end:function(label,callBack){
                        var arg={
                        label : label,
                        onClick:lang.hitch(this,"submit",callBack)
                        }
                         var divField = domConstruct.create("div", {class:"form-row"}, this.domNode,"last");

                        var button = new Button(arg,divField);
                        button.startup();
                      },
                      submit:function(callBack){
                      
                       var formData = this._getData();
                       var model = this.model;
                         this.model.save(formData, callBack);
                      },
                      _saveCallBack:function(status,result){
                        
                      }
                      

                  });
});