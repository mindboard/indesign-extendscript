//@target InDesign

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var dir = Folder( currentDir().fullName + "/res/" );
var targetFileList = dir.getFiles('*.idml');

for(var i=0; i<targetFileList.length; i++ ){
    var file = targetFileList[i];
    $.writeln( file );
}
