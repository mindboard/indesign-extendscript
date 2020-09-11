//@target InDesign

//
// add new paragraph style and apply it to paragraph.
//

var createParagraphStyle = function( doc, params ){
    var paragraphStyle1 = doc.paragraphStyles.item( params.name );

    try {
        // check 'my-paragraph-style1' already exists or not.
        paragraphStyle1.name;
    }
    catch( error ){
        // when error , it does not exist yet. add it.
        paragraphStyle1 = doc.paragraphStyles.add(params);
    }

    return paragraphStyle1;
};

var createTextFrame = function(page){
    var textFrame = page.textFrames.add();
    textFrame.geometricBounds = ["20mm","20mm","40mm","110mm"];
    textFrame.contents = 'Hello World!';

    return textFrame;
};


// add document
var doc = app.documents.add();
var paragraphStyle1 = createParagraphStyle( doc, { name : 'paragraph-style1' });

// reset page margin
var page = doc.pages.item(0);

// add textFrame
var textFrame = createTextFrame( page );

// apply textFrame paragraphStyle1
textFrame.texts.item(0).applyParagraphStyle(paragraphStyle1, true);
