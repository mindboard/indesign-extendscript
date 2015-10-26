
var currentDir = function(){
	return File($.fileName).parent;
};


var dir = Folder( currentDir().fullName + "/res/" );
var targetFileList = dir.getFiles('*.idml');

for(var i=0; i<targetFileList.length; i++ ){
	var file = targetFileList[i];
	$.writeln( file );
}
