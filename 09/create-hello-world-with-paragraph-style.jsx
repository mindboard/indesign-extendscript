//@target InDesign

//
// add new paragraph style and apply it to paragraph.
//

var createParagraphStyle = function( doc, params ){
    var paragraphStyle = doc.paragraphStyles.item( params.name );
    if( paragraphStyle!=null ){
        return paragraphStyle;
    }
    return doc.paragraphStyles.add(params);
};

var createTextFrame = function(page){
    var textFrame = page.textFrames.add();
    textFrame.geometricBounds = ["0mm","0mm","10mm","40mm"];
    textFrame.contents = 'Hello, World!';

    return textFrame;
};


// add document
var doc = app.documents.add({
    documentPreferences: {
        pageWidth   : '40mm',
        pageHeight  : '10mm',
        facingPages : false
    }
});
doc.cjkGridPreferences.showAllLayoutGrids = false;

var myParagraphStyle = createParagraphStyle( doc, { name : 'my-paragraph-style' });

// reset page margin
var page = doc.pages.item(0);

// add textFrame
var textFrame = createTextFrame( page );

// apply textFrame myParagraphStyle
textFrame.texts.item(0).applyParagraphStyle(myParagraphStyle, true);
