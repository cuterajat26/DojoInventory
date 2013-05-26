define(["dojo/_base/declare", "dijit/_WidgetBase","dojo/_base/lang","dojo/Deferred"],
  function(declare, WidgetBase,
    lang,Deferred){

    var FileManager =declare("rijit.helpers.FileHelper", null, {


      baseClass: "rijitFileHelper",
      model:null,
      modelName:null,
      fields:null,
      constructor:function(args){
        this.grantedBytes = 100*1024*1024;
      },
      saveFile:function(file,fileName){
        var deffered = new Deferred();

        var errorHandler = this._fileErrorHandler;
        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        var self =this;
        window.requestFileSystem(window.PERSISTENT, this.grantedBytes, function(fs) {
                                      // Duplicate each file the user selected to the app's fs.

                                        // Capture current iteration's file in local scope for the getFile() callback.

      self._coreSaveFileFunc(file,fs,fileName,deffered);


      }, errorHandler);

        return deffered.promise;
      },
      _coreSaveFileFunc:function(f,fs,fileName,deffered) {

        var errorHandler = this._fileErrorHandler;

                                          // var fileName = result.insertId+'_'+f.name
                                          fs.root.getFile(fileName, {create: true, exclusive: true}, function(fileEntry) {
                                            fileEntry.createWriter(function(fileWriter) {
                                              fileWriter.write(f); // Note: write() can take a File or Blob object.
                                              // thisFormData['Product']['image']=fileName;
                                              // self.Product.save(thisFormData, lang.hitch(self,"_addedImageSuccessfully"));
                                              console.log("image save successfully: "+fileName);
                                              deffered.resolve(fileName);
                                            }, errorHandler);
                                          }, errorHandler);
                                        },

      _fileErrorHandler:function(e){
       var msg = '';

       switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
        case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
        case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
        case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
        case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
        default:
        msg = 'Unknown Error';
        break;
      };

      console.log('Error: ' + msg);
      alert('Error: ' + msg);

    }



                                    });

var fileMngr = new FileManager();//singleton instance
return fileMngr;
});