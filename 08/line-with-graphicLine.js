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
// add default graphicLine and change it to line.
//
var graphicLine = page.graphicLines.add( {} );
graphicLine.strokeWeight = '0.25mm';

var path = graphicLine.paths[0];
path.pathPoints[0].anchor = ['90mm','10mm']; // x,y
path.pathPoints[1].anchor = ['10mm','90mm']; // x,y
