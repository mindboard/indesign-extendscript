//@target InDesign

var createHelloWorldDocument = function(){
    var params = {};
    params.documentPreferences = { pageWidth:"210mm", pageHeight:"297mm", facingPages:false};

    var doc = app.documents.add(params);
    var page = doc.pages.item(0);
    var textFrame = page.textFrames.add({
        geometricBounds : ["20mm","20mm","40mm","110mm"], // top,left,bottom,right
        contents        : 'Hello, World!'});
    
    for( var i=0; i<textFrame.paragraphs.length; i++ ){
        var paragraph = textFrame.paragraphs[i];
        paragraph.pointSize = 36;
        paragraph.appliedParagraphStyle.appliedFont = app.fonts.item('Arial');
    }

    return doc;
};

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var doc = createHelloWorldDocument();

app.epsExportPreferences.properties = {
    epsColor              : EPSColorSpace.CMYK,
    //epsColor              : EPSColorSpace.GRAY,
    epsSpreads            : false,
    fontEmbedding         : FontEmbedding.COMPLETE,
    //fontEmbedding         : FontEmbedding.NONE,
    pageRange             : '1',
    postscriptLevel       : PostScriptLevels.LEVEL_3,
    preview               : PreviewTypes.TIFF_PREVIEW};

var saveEpsFile = File( currentDir().fullName + '/result.eps' );
doc.exportFile('eps', saveEpsFile, false);

doc.close(SaveOptions.no);
