//@target InDesign

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

var createRectangle = function(page, params){
    return page.rectangles.add({
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

var doc = createDocument(pageParams);

var page = doc.pages[0];

var rectangleParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var rectangle = createRectangle(page, rectangleParams);
rectangle.place( File( currentDir().fullName + '/links/tiger.eps' ) );
rectangle.fit(FitOptions.CONTENT_TO_FRAME);
