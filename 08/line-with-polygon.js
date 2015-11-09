var params = {};
params.documentPreferences = {
	pageWidth   : '100mm',
	pageHeight  : '100mm',
	facingPages : false};

// add document
var doc = app.documents.add(params);

// reset page margin
var page = doc.pages.item(0);
page.marginPreferences.properties = {
	top    : '0mm',
	left   : '0mm',
	bottom : '0mm',
	right  : '0mm'};

//
// add polygon and change it to line
//
var polygon = page.polygons.add({});
polygon.strokeWeight = '0.25mm';

polygon.paths[0].properties = {
	entirePath: [['90mm','10mm'],['10mm','90mm']],
   	pathType:	PathType.OPEN_PATH
};
