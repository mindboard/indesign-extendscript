//@target InDesign

//
// #1. create textframe
// #2. create inline textframe and make it border rounded
//

var createDocument = function(params){
    params.documentPreferences = {
        pageWidth   : params.pageWidth+"mm",
        pageHeight  : params.pageHeight+"mm",
           facingPages : false};

    var doc = app.documents.add(params);

    var page = doc.pages.item(0);
    page.marginPreferences.properties = {
        top    : params.marginTop+"mm",
        left   : params.marginLeft+"mm",
        bottom : params.marginBottom+"mm",
        right  : params.marginRight+"mm"};

    return doc;
};

var createTextFrame = function(parent,params){
    return parent.textFrames.add({
        geometricBounds:[
            params.top+"mm",
            params.left+"mm",
            params.bottom+"mm",
            params.right+"mm"] });
};

var createTextFrameWithCornerRound = function(parent,params){
    var tf = createTextFrame(parent,params);

    with( tf ){
        topLeftCornerOption = CornerOptions.ROUNDED_CORNER;  
        topRightCornerOption = CornerOptions.ROUNDED_CORNER;  
        bottomLeftCornerOption = CornerOptions.ROUNDED_CORNER;  
        bottomRightCornerOption = CornerOptions.ROUNDED_CORNER;  

        topLeftCornerRadius = 3;
        topRightCornerRadius = 3;
        bottomLeftCornerRadius = 3;
        bottomRightCornerRadius = 3;
    }

    return tf;
};

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var pageParams = {
    pageWidth   : 297,
    pageHeight  : 210,
    marginTop   : 10,
    marginLeft  : 10,
    marginBottom: 10,
    marginRight : 10};

var doc = createDocument( pageParams );

var page = doc.pages.item(0);

var textFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var textFrame = createTextFrame(page, textFrameParams);
textFrame.contents = 'Hello, inline textframe.';
var insertionPoint = textFrame.insertionPoints[13];
var inlineTextFrame = createTextFrameWithCornerRound(insertionPoint,{top:0,left:0,bottom:48,right:48});
inlineTextFrame.strokeWeight = 0.25;
inlineTextFrame.contents = 'I am an inline textframe.';
