//@target InDesign

var doc = app.activeDocument;
var path = doc.filePath;
var fullName = doc.fullName;
var fileName = (""+fullName).substr( (""+path).length+1);
$.writeln( fileName );
