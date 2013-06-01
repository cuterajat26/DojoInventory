define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "dijit/form/ValidationTextBox","dijit/form/Button","dojo/dom-construct","dojo/_base/lang","dojo/_base/array","dojo/on",
  "dojo/query","dojo/dom-attr"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,ValidationTextBox,Button,domConstruct,
            lang,array,on,query,domAttr){
  
                  return declare("rijit.helpers.FormHelper", null, {
  
                         
                           baseClass: "rijitForm",
                      model:null,
                      modelName:null,
                      fields:null,
                      createForm: function(arg){

var errorHandler = function(e){
    console.log('Error', e);

};

    window.webkitStorageInfo.requestQuota(PERSISTENT, 100*1024*1024, function(grantedBytes) {
                                               window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

                                      window.requestFileSystem(window.PERSISTENT, grantedBytes, function(fs) {
                                      // Duplicate each file the user selected to the app's fs.

                                       
                                         fs.root.getFile('30_Landscape-wallpaper 665.jpg', {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(theFile) {
      document.getElementById('debug').innerHTML = ['<img class="thumb" src="', theFile.target.result,
                            '" title="', "Image", '"/>'].join('');
       };

       reader.readAsDataURL(file);
    }, errorHandler);

  }, errorHandler);


                                      
                                    }, errorHandler);

                                          }, function(e) {
                                            console.log('Error', e);
                                          });

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
                        var inputField = domConstruct.create("input", {id:field,class:"file",type:"file"}, divField,"last");
                        

                        var labelField = domConstruct.create("div", {class:"title"}, divField,"last");

                        labelField.innerHTML='<p>'+(options.title?options.title:"Drop files here")+'</p>';


                          
                        on(inputField, "change", lang.hitch(this, "_handleFileSelect"));
    
                      },
                      _handleFileSelect: function(evt){
                         var files = evt.target.files; // FileList object

if(files[0] && files[0].type.match('image.*')){
var reader = new FileReader();
var self = this;
      // Closure to capture the file information.
      reader.onload = function(theFile) {
          // Render thumbnail.

                      
         var n1 = query('.title',evt.target.parent)
      n1[0].innerHTML = ['<img class="thumb" src="', theFile.target.result,
                            '" title="', "Image", '"/>'].join('');
      };

                document.getElementById('debug').innerHTML=files[0].name;


      // Read in the image file as a data URL.
     
      reader.readAsDataURL(files[0]);
       files[0].id=domAttr.get(evt.target,"id");
self.fields.push(files[0]);
}
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
                          if(entry instanceof File){
                            modelobject[modelName][entry.id] = entry;
                          }
                          else{
                          modelobject[modelName][entry.get("id")]=entry.get("value");
                          }
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
                       callBack(formData);
                      },
                      _saveCallBack:function(status,result){
                        
                      }
                      

                  });
});