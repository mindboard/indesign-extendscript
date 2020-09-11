//@target InDesign

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var dir = Folder( currentDir().fullName + "/res/" );
var targetFileList = dir.getFiles('*.idml');

var doc1 = null;

for(var i=0; i<targetFileList.length; i++ ){
    var file = targetFileList[i];
    if( i==0 ){
        // merge source document
        doc1 = app.open(file);
    }
    else if( doc1!=null ){
        var doc2 = app.open(file);

        // 1) add dummy spread for escaping from error.
        doc2.spreads.add();

        // 2) perform move spread.
        doc2.spreads[0].move( LocationOptions.AT_END ,doc1 );
        doc2.close(SaveOptions.no);
    }
}
