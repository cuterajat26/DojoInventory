define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin","dojo/hash",
  "dojo/_base/xhr","dojo/_base/array", "dojo/_base/lang", "dojo/on","dojo/text!./templates/ProductLayout.html",
  "dojo/dom-class","rijit/helpers/FormHelper","rijit/helpers/FileHelper",
  "dijit/Menu","dijit/MenuItem","dojo/topic","dojo/dom-construct","dijit/PopupMenuItem","dijit/layout/SplitContainer"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,hash, xhr, array, lang, on,
                          template,domClass,FormHelper,FileHelper,Menu,MenuItem,topic,domConstruct){

                  return declare("rijit.controllers.ProductsController", [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {


                           baseClass: "rijitController",
                          templateString: template,
                          Product:new Product(),
                          formData:null,
                      postCreate: function(){
                                  this.inherited(arguments);

                                  eval("this."+this.action+"();");
                                  },
                      add:function(){
                        var form = new FormHelper();
                         var formDom = form.createForm("Product");
                        domConstruct.place(formDom,this.body,"last");
                        form.input("image",{title:"Add Image",type:"file"});

                        form.input("name",{width:"50em"});

                        form.input("colour");

                        form.input("quantity");
                        form.input("price");
                        form.end("Submit it",lang.hitch(this,"_addedSubmitted"));

                      },
                      list:function(){
                        this.body.innerHTML="this is the list body";
                      },

                      _onList:function(item){

                      },
                      _addedSubmitted:function(formData){

                    this.formData = formData;
                         this.Product.save(formData, lang.hitch(this,"_addedSuccessfully"));
                      },
                      _addedImageSuccessfully: function(status,result){
                       document.getElementById('debug').innerHTML=  "Product saved successfully";
                      },
                      _updateModelWithFileName:function(fileName){
                                            this.formData['Product']['image']=fileName;
                                            this.Product.save(this.formData, lang.hitch(this,"_addedImageSuccessfully"));
                      },
                      _addedSuccessfully:function(status,result){
                        if(!status)
                        alert(this.Product.validationErrors[0]);
                      else{
                        this.formData['Product']['id']=result.insertId;

                        var self = this;

                        if(this.formData['Product']['image'] instanceof File){
                                    //*************************FILE saving**************//
                                    var fileName = this.formData['Product']['id']+'_'+this.formData['Product']['image'].name;
                                    var promise=FileHelper.saveFile(this.formData['Product']['image'],fileName);
                                    promise.then(function(result){
                                      self._updateModelWithFileName(result);

                                    });


                        }
                        else{
                       document.getElementById('debug').innerHTML=  "Product saved successfully";

                        }



                      }
                    }

                  });
});