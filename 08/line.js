
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

//
// draw line
//

var lineParams = { geometricBounds : ["10mm","10mm","90mm","90mm"]}; // top,left,bottom,right
var graphicLine = page.graphicLines.add( lineParams );
graphicLine.strokeWeight = '0.25mm';

//
// この段階で geometricBounds で指定した範囲に左上から右下へデフォルトの path が生成される.
// もし 右上から左下への line を描写したい場合はパスのアンカーを指定し直す必要がある.
//

var path = graphicLine.paths[0];
path.pathPoints[0].anchor = ['90mm','10mm']; // x,y
path.pathPoints[1].anchor = ['10mm','90mm']; // x,y

