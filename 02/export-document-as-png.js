
var createHelloWorldDocument = function(){
	var params = {};
	params.documentPreferences = { pageWidth:"210mm", pageHeight:"297mm", facingPages:false};

	var doc = app.documents.add(params);
	var page = doc.pages.item(0);
	var textFrame = page.textFrames.add({
		geometricBounds:["20mm","20mm","40mm","110mm"], // top,left,bottom,right
		contents:'Hello World!'});
	
	for( var i=0; i<textFrame.paragraphs.length; i++ ){
		var paragraph = textFrame.paragraphs[i];
		paragraph.pointSize = 36;
   		paragraph.appliedParagraphStyle.appliedFont = app.fonts.item('Myriad Hebrew');
	}

	return doc;
};

var currentDir = function(){
	return File($.fileName).parent;
};


var doc = createHelloWorldDocument();

app.pngExportPreferences.properties = {
	antiAlias : true,
	exportResolution : 72,
	pngColorSpace : PNGColorSpaceEnum.RGB,
	pngExportRange : PNGExportRangeEnum.EXPORT_ALL,
	simulateOverprint : true,
	pngQuality : PNGQualityEnum.MAXIMUM,
	transparentBackground : false };

var savePngFile = File( currentDir().fullName + '/result.png' );
doc.exportFile(ExportFormat.PNG_FORMAT, savePngFile);

doc.close(SaveOptions.no);
