
var params = {};
params.documentPreferences = {
	pageWidth   : "210mm",
	pageHeight  : "297mm",
	facingPages : false};

// add document
var doc = app.documents.add(params);

// reset page margin
var page = doc.pages.item(0);
page.marginPreferences.properties = {
	top    : "10mm",
	left   : "10mm",
	bottom : "10mm",
	right  : "10mm"};

// add textFrame
var textFrame = page.textFrames.add({
	geometricBounds : ["20mm","20mm","40mm","110mm"], // top,left,bottom,right
	contents        : 'Hello World!'});

// change paragraph style
for( var i=0; i<textFrame.paragraphs.length; i++ ){
	var paragraph = textFrame.paragraphs[i];
	paragraph.pointSize = 36;
   	paragraph.appliedParagraphStyle.appliedFont = app.fonts.item('Myriad Hebrew');
}
