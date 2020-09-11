//@target InDesign

//
// textFrame style customization example.
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

var textFrame = createTextFrame(page, textFrameParams);

// contents
textFrame.contents = 'Hello!';

// vertical align center
textFrame.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;

// horizontal align center
var textStyleRanges = textFrame.textStyleRanges;
var pstyle = textStyleRanges[0].appliedParagraphStyle;
pstyle.justification = Justification.CENTER_ALIGN;

