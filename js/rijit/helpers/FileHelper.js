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
    var promise = self._resizeFile(file,640,480);
promise.then(function(blob){
        self._coreSaveFileFunc(blob,fs,fileName,deffered);

});


      }, errorHandler);

        return deffered.promise;
      },
      _resizeFile:function(file,maxWidth,maxHeight){
var deferred = new Deferred();
        var reader = new FileReader();

          reader.onload = function(theFile) {

              var img = new Image();


            img.onload = function()
            {
                var ratio = 1;
                var finalWidth,finalHeight;
                var ratioWidth =maxWidth/img.width;
                var ratioHeight = maxHeight/img.height;

if(ratioWidth>=1 && ratioHeight>=1){
  finalWidth=img.width;
  finalHeight=img.height;
}
else if(ratioWidth<=ratioHeight){

finalWidth=maxWidth;
finalHeight=img.height*ratioWidth;
}
else{
  finalHeight=maxHeight;
finalWidth=img.width*ratioHeight;
}
                // if(img.width > maxWidth)
                //     ratio = maxWidth / img.width;
                // else if(img.height > maxHeight)
                //     ratio = maxHeight / img.height;
    var canvas = document.createElement("canvas");
canvas.width=finalWidth;
canvas.height=finalHeight;
                var ctx = canvas.getContext("2d");
               ctx.drawImage(img, 0, 0, img.width, img.height,0,0,finalWidth,finalHeight);

canvas.toBlob(function(blob) {
  // saveAs(blob, "yo.png");
  deferred.resolve(blob);
});

               // var dataurl = ctx.toDataURL("image/png");
               // console.log("dataurl is "+dataurl);
               // var file = new File(dataurl);
                // canvasCopy.width = img.width;
                // canvasCopy.height = img.height;
                // copyContext.drawImage(img, 0, 0);

                // canvas.width = img.width * ratio;
                // canvas.height = img.height * ratio;
                // ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
            };

            img.src = theFile.target.result;


        }
              reader.readAsDataURL(file);

return deferred.promise;
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
        msg = 'Unknown file save Error';
        break;
      };

      console.log('Error: ' + msg);
      alert('Error: ' + msg);

    }



                                    });

var fileMngr = new FileManager();//singleton instance
return fileMngr;
});