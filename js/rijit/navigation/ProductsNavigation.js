define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin","dojo/hash",
  "dojo/_base/xhr","dojo/_base/array", "dojo/_base/lang", "dojo/on","dojo/text!./templates/ProductsNavigation.html",
  "dojo/dom-class","dijit/Menu","dijit/MenuItem","dojo/topic","dojo/dom-construct","dojo/query","dojo/dom-style",
  "rijit/controllers/ProductsController","dojo/fx","dijit/PopupMenuItem","dijit/layout/SplitContainer","dojo/NodeList-traverse"],
          function(declare, WidgetBase, TemplatedMixin, WidgetsInTemplateMixin,hash, xhr, array, lang, on,
                          template,domClass,Menu,MenuItem,topic,domConstruct,query,domStyle,ProductsController,coreFx){

                  return declare("rijit.navigation.ProductsNavigation", [WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {

                          /*
                           * TODO: Filter tree by region and fabric.
                           * TODO: Update tree when region and fabric changes
                           * TODO: Figure out why the toggles are not showing up
                           */

                           baseClass: "rijitNavigation",
                          templateString: template,


                      postCreate: function(){
                                  console.log(bongo);
                                  this.inherited(arguments);
                                  console.log(this.mainMenu);
                                  this.items = [];
                                  this.itemReferenceMap = {};
                                  this.mainMenu.addChild(new MenuItem({
                                    label:"Add product",
                                    id:"add",
                                    height:"200px",
                                    navigation:this,
                                    onClick:this._onMenuClick
                                  }));
                                  this.mainMenu.addChild(new MenuItem({
                                    label:"List products",
                                    id:"list",
                                    navigation:this,
                                    onClick:this._onMenuClick
                                  }));
                                  /*topic.subscribe("/dojo/hashchange", function(hashstr){
                                    if(hashstr === "products_listProduct")
                                      on.emit(listProductMenuItem,"click",{cancelable:true,bubbles:false});

                                  });*/

                                  //this.mainMenu.startup();
                                  },
                      _slideIt: function(amt,nodeItem){
                                    coreFx.slideTo({
                                      node: nodeItem,
                                      top: amt,
                                      left: 0,
                                      unit: "px"
                                    }).play();
                                  },
                      _onMenuClick:function(item){
                        var str = "products/"+this.id;
                        var targetDom=null;
                        hash(str);
                        var allChildren = query(this.navigation.contentNode.containerNode).children();
                        var divAlreadyExists = false;
                          for(var i =0;i<allChildren.length;i++){
                            if(allChildren[i].id===str+"_container"){
                              divAlreadyExists = true;
                              // domStyle.set(allChildren[i],"visibility","visible");
                              targetDom = allChildren[i];

                              continue;
                            }

                               domStyle.set(allChildren[i],"opacity",0);

      //                          var fadeArgs = {
      //   node: allChildren[i],
      //   duration: 300,

      // };
      // dojo.fadeOut(fadeArgs).play();

  }


                            //domStyle.set(allChildren[i],"visibility","hidden");

                          if(targetDom){
                               domConstruct.place(targetDom, this.navigation.contentNode.containerNode, "first");

                              var fadeArgs = {
        node: targetDom,
        duration: 300,

      };
      dojo.fadeIn(fadeArgs).play();

                            }


                        if(divAlreadyExists)
                          return;
                        var divDate = domConstruct.create("div", {id:str+"_container","class":"actionContent"}, this.navigation.contentNode.containerNode,"first");
                        this.productController = new ProductsController({name:this.label,action:this.id},divDate);
                        this.productController.startup();

                      }


                  });
});