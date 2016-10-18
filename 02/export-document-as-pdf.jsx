var createHelloWorldDocument = function(){
    var params = {};
    params.documentPreferences = { pageWidth:"210mm", pageHeight:"297mm", facingPages:false};

    var doc = app.documents.add(params);
    var page = doc.pages.item(0);
    var textFrame = page.textFrames.add({
        geometricBounds : ["20mm","20mm","40mm","110mm"], // top,left,bottom,right
        contents        : 'Hello World!'});
    
    for( var i=0; i<textFrame.paragraphs.length; i++ ){
        var paragraph = textFrame.paragraphs[i];
        paragraph.pointSize = 36;
           paragraph.appliedParagraphStyle.appliedFont = app.fonts.item('Myriad Hebrew');
    }

    return doc;
};

var findPdfPreset = function(aPartOfPresetName){
    var regex = new RegExp(aPartOfPresetName);

       var myPresets = app.pdfExportPresets.everyItem().name;
       for(var i=0; i<myPresets.length; i++){
        if( myPresets[i].match(regex) ){
            return myPresets[i];
        }
    }
    return null;
}

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var doc = createHelloWorldDocument();

var savePdfFile = File( currentDir().fullName + '/result.pdf' );
var pdfPreset = findPdfPreset('X-1a');
if( pdfPreset!=null ){
    doc.exportFile(ExportFormat.pdfType, savePdfFile, false, pdfPreset );
}

doc.close(SaveOptions.no);
