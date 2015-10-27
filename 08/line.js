
var params = {};
params.documentPreferences = {
	pageWidth   : "100mm",
	pageHeight  : "100mm",
	facingPages : false};

// add document
var doc = app.documents.add(params);

// reset page margin
var page = doc.pages.item(0);
page.marginPreferences.properties = {
	top    : "0mm",
	left   : "0mm",
	bottom : "0mm",
	right  : "0mm"};

var lineParams = { geometricBounds : ["10mm","10mm","90mm","90mm"]}; // top,left,bottom,right
var graphicLine = page.graphicLines.add( lineParams );

