//@target InDesign

var createFontSize = function(q){
    return String(q * 0.25) + 'mm';
};

var createParagraphStyle = function(doc, params){
    var paragraphStyle = doc.paragraphStyles.item( params.name );
    if( paragraphStyle!=null ){
        return paragraphStyle;
    }
    return doc.paragraphStyles.add(params);
};

var getEmptyCharacterStyle = function(doc){
    return doc.characterStyles.item(0);
};

var createCharacterStyle = function(doc, params){
    var characterStyle = doc.characterStyles.item( params.name );
    if( characterStyle!=null ){
        return characterStyle;
    }
    return doc.characterStyles.add(params);
};

var getFont = function(fontName){
    return app.fonts.item(fontName);
};


var insertTextWithParagraphStyle = function(textFrame, text, paragraphStyle){
    var insertionPoint = textFrame.insertionPoints[-1]; 
    insertionPoint.applyParagraphStyle(paragraphStyle);
    insertionPoint.contents = text; 
};

var insertTextWithCharacterStyle = function(textFrame, text, characterStyle){
    var insertionPoint = textFrame.insertionPoints[-1]; 
    insertionPoint.applyCharacterStyle(characterStyle);
    insertionPoint.contents = text; 
};



//
// -----------------------------------------------------------------
//

var params = {}; 

params.documentPreferences = {
    pageWidth   : '40mm',
    pageHeight  : '10mm',
    facingPages : false}; 

var doc = app.documents.add(params); 
doc.cjkGridPreferences.showAllLayoutGrids = false;

var defaultParagraphStyle = createParagraphStyle(doc, {
    name: 'para',
    appliedFont: getFont('Arial	Regular'),
    pointSize: createFontSize(16)
});

var emptyCharacterStyle = getEmptyCharacterStyle(doc);

var boldCharacterStyle = createCharacterStyle(doc, {
    name: 'bold',
    fontStyle: 'Bold',
    pointSize: createFontSize(24)
});

var page = doc.pages.item(0);
page.marginPreferences.properties = {
    top    : '0mm',
    left   : '0mm',
    bottom : '0mm',
    right  : '0mm'};

var textFrameParams = {}; 
textFrameParams.geometricBounds = ['2mm', '2mm', '8mm', '38mm']; 

var textFrame = page.textFrames.add(textFrameParams); 

insertTextWithParagraphStyle(textFrame, 'Hello, ', defaultParagraphStyle);
insertTextWithCharacterStyle(textFrame, 'World', boldCharacterStyle);
insertTextWithCharacterStyle(textFrame, '!', emptyCharacterStyle);

