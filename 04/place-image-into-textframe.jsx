//@target InDesign

//
// place image into textframe.
//
var createDocument = function(params){
    params.documentPreferences = {
        pageWidth   : params.pageWidth+"mm",
        pageHeight  : params.pageHeight+"mm",
        facingPages : false};

    var doc = app.documents.add(params);

    var page = doc.pages[0];
    page.marginPreferences.properties = {
        top    : params.marginTop+"mm",
        left   : params.marginLeft+"mm",
        bottom : params.marginBottom+"mm",
        right  : params.marginRight+"mm"};

    return doc;
};

var createTextFrame = function(page,params){
    return page.textFrames.add({
        geometricBounds:[
            params.top+"mm",
            params.left+"mm",
            params.bottom+"mm",
            params.right+"mm"] });
};

var createGraphicFrame = function(page,params){
    var textFrame = createTextFrame(page, params);
    textFrame.contentType = ContentType.graphicType;
    return textFrame;
};


var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var pageParams = {
    pageWidth   : 100,
    pageHeight  : 100,
    marginTop   : 10,
    marginLeft  : 10,
    marginBottom: 10,
    marginRight : 10};

var doc = createDocument( pageParams );

var page = doc.pages[0];

var graphicFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var graphicFrame = createGraphicFrame(page, graphicFrameParams);
graphicFrame.contentType = ContentType.graphicType;
graphicFrame.place( File( currentDir().fullName + '/links/tiger.eps' ) );
graphicFrame.fit(FitOptions.CONTENT_TO_FRAME);
