define(["dojo/_base/declare",
    "dijit/_WidgetBase",
    "dojo/_base/xhr",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/on",
  ],
  function(
    declare,
    WidgetBase,
    xhr,
    array,
    lang,
    on
  ) {

    return declare("rijit.model.Model", [], {

        db:null,
        name: null,
        version:null,
        label:null,
        indexes: null,
        objectStore: null,
        constructor: function() {
          var request = indexedDB.open("MyTestDatabase");
          this.label = this.name + this.verison;
          request.onerror = function(event) {
            alert("Database error: " + event.target.errorCode);
          };
          request.onsuccess = function(event) {
            this.db = request.result;
            lang.hitch(this,'postCreate');

          };
        },

        postCreate: function(){
          if(!this.db.objectStoreNames.contains(this.label)){
               this.objectStore = db.createObjectStore("customers", { autoincrement: true });
               this.objectStoreCreated();

          }
        },

        objectStoreCreated: function(){

        },
        _getObjectStore: function(mode){
          return this.db.transaction([this.label], mode).objectStore(this.label);
        },
        add: function(params){

              var request = this._getObjectStore().add(params.data);
              request.onerror = params.error;
              request.onsuccess = params.callback;

              //  alert("Name for SSN 444-44-4444 is " + request.result.name);
              return request;
        },

        put: function(params){
            /*
        params = {
          data:{name:"rajat",id:"1"},
          callback: function(){},
          error: function(){}
         }
         */
                var request = this._getObjectStore().get(params.data[this.keyPath]);
                request.onerror = params.error;
                request.onsuccess = function(event){
                  var data  = request.result;
                  lang.mixin(data,params.data);

                  var requestUpdate = objectStore.put(data);
                  requestUpdate.onerror = params.error;
                  requestUpdate.onsuccess = params.callback;
                  return requestUpdate;
                };
        },

        get: function(keyPath){
          var request = this._getObjectStore().get(keyPath);
          request.onerror = params.error;
          request.onsuccess = params.callback;
          return request;
        },



        list: function(params){
            /*
        params = {
          record:true,
          callback: function(){},
          error: function(){}
         }
         */
          var list = [];
          var objectStore = this._getObjectStore("readonly");
         var request = objectStore.openCursor();
         request.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor){

                list.push(params.record?cursor.value: cursor.key);

              cursor['continue'].call();
            }
            else {
              params.callback(list);
            }
          };

          request.onerror = params.error;

        }

    });
  });