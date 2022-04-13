//@target InDesign

var createDocument = function(params){
    params.documentPreferences = {
        pageWidth   : params.pageWidth+"mm",
        pageHeight  : params.pageHeight+"mm",
        facingPages : false};

    var doc = app.documents.add(params);
    //with(doc.gridPreferences){ documentGridShown=true; }

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

        topLeftCornerRadius = 5;
        topRightCornerRadius = 5;
        bottomLeftCornerRadius = 5;
        bottomRightCornerRadius = 5;
    }

    return tf;
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
    bottom : (pageParams.marginTop+40),
    right  : (pageParams.marginLeft+40) };

var textFrame = createTextFrameWithCornerRound(page, textFrameParams);
textFrame.contents = 'Hello, Textframe.';
