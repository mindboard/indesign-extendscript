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

var createTextFrame = function(page,params){
    return page.textFrames.add({
        geometricBounds:[
            params.top+"mm",
            params.left+"mm",
            params.bottom+"mm",
            params.right+"mm"] });
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

var page = doc.pages.item(0);

var textFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var textFrame = createTextFrame(page, textFrameParams);
textFrame.contentType = ContentType.graphicType;
textFrame.place( File( currentDir().fullName + '/links/tiger.eps' ) );
textFrame.fit(FitOptions.CONTENT_TO_FRAME);
