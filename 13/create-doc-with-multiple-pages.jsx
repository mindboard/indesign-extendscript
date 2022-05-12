//@target InDesign

//
// create a multiple pages document and place pdf on each page.
//

var createDocument = function(pageParams){
    var docParams = {
        documentPreferences : {
            pageWidth   : pageParams.pageWidth+"mm",
            pageHeight  : pageParams.pageHeight+"mm",
            facingPages : false
        },
        cjkGridPreferences : {
            showAllLayoutGrids : false
        }
    };

    var doc = app.documents.add(docParams);

    var page = doc.pages[0];
    page.marginPreferences.properties = {
        top    : pageParams.marginTop+"mm",
        left   : pageParams.marginLeft+"mm",
        bottom : pageParams.marginBottom+"mm",
        right  : pageParams.marginRight+"mm"};

    return doc;
};

var createTextFrame = function(page, params){
    return page.textFrames.add({
        geometricBounds:[
            params.top+"mm",
            params.left+"mm",
            params.bottom+"mm",
            params.right+"mm"] });
};

var createGraphicFrame = function(page, params){
    var textFrame = createTextFrame(page, params);
    textFrame.contentType = ContentType.graphicType;
    return textFrame;
};

var currentDir = function(){
    return File($.fileName).parent;
};

var buildPage = function(page, pdfFile, graphicFrameParams){
    var graphicFrame = createGraphicFrame(page, graphicFrameParams);
    graphicFrame.place( pdfFile );
    graphicFrame.fit(FitOptions.CONTENT_TO_FRAME);
};


// ----
// main
// ----

var pageParams = {
    pageWidth   : 100,
    pageHeight  : 100,
    marginTop   : 0,
    marginLeft  : 0,
    marginBottom: 0,
    marginRight : 0};

var doc = createDocument(pageParams);

var graphicFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var list = 'tiger-green.pdf tiger-red.pdf tiger-blue.pdf'.split(/ /);

for(var i=0; i<list.length; i++){
    var page = null;
    if(i==0){
        page = doc.pages.item(0);
    } else {
        page = doc.pages.add();
    }

    if(page){
        var pdfFilename = list[i];
        var pdfFile = File( currentDir().fullName + '/links/'+pdfFilename );
        buildPage(page, pdfFile, graphicFrameParams);
    }
}
