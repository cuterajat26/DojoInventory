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

        constructor: function() {
          window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
          // DON'T use "var indexedDB = ..." if you're not in a function.
          // Moreover, you may need references to some window.IDB* objects:
          window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
          window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
          // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
      }


    });
  });