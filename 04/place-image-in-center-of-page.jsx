//@target InDesign

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

var rectangleWidth = pageParams.pageWidth * 0.5;
var rectangleHeight= rectangleWidth

var rectangle = page.rectangles.add({
        geometricBounds:[
            "0mm",
            "0mm",
            rectangleWidth+"mm",
            rectangleHeight+"mm"] });

rectangle.place( File( currentDir().fullName + '/links/tiger.eps' ) );
rectangle.fit(FitOptions.CONTENT_TO_FRAME);

//
// finding a left-top point(x,y) for image to locate in center of page. 
//
var x = ( pageParams.pageWidth - rectangleWidth )   / 2.0;
var y = ( pageParams.pageHeight - rectangleHeight ) / 2.0;
rectangle.move( [x, y] );
