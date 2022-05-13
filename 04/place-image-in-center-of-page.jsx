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

var rectangleWidth = pageParams.pageWidth * 0.5;
var rectangleHeight= rectangleWidth

var rectangle = page.rectangles.add({
        geometricBounds:[
            "0mm", // top
            "0mm", // left
            rectangleHeight+"mm", // bottom
            rectangleWidth+"mm" // right
        ] });

rectangle.place( File( currentDir().fullName + '/links/tiger.eps' ) );
rectangle.fit(FitOptions.CONTENT_TO_FRAME);

//
// finding a left-top point(x,y) for image to locate in center of page. 
//
var x = ( pageParams.pageWidth - rectangleWidth )   / 2.0;
var y = ( pageParams.pageHeight - rectangleHeight ) / 2.0;
rectangle.move( [x, y] );
