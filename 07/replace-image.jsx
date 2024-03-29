//@target InDesign

//
// replace color tiger with grayscale tiger.
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

var currentDir = function(){ return File($.fileName).parent; };

var eachPage = function(doc,func){ for(var i=0; i<doc.pages.length; i++){ func(doc.pages.item(i)); } };
var eachPageItem = function(page,func){ for(var i=0; i<page.allPageItems.length; i++){ func(page.allPageItems[i]); } };



// ---------------------------------------------
// main
// ---------------------------------------------

// step1: prepare document and page
var pageParams = {
    pageWidth   : 100,
    pageHeight  : 100,
    marginTop   : 10,
    marginLeft  : 10,
    marginBottom: 10,
    marginRight : 10};

var doc = createDocument(pageParams);
var page = doc.pages.item(0);


// step2: add tiger-color.pdf
var textFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var textFrame = createTextFrame(page, textFrameParams);
textFrame.contentType = ContentType.graphicType;
textFrame.place( File( currentDir().fullName + '/links/tiger-color.pdf' ) );
textFrame.fit(FitOptions.CONTENT_TO_FRAME);


// step3: find tiger-color.pdf and replace it with tiger-grayscale.pdf
eachPage(doc, function(page){
    eachPageItem(page,function(pageItem){
        var className = pageItem.constructor.name;
        $.writeln( 'pageItem : ' + className );

        var regex = /PDF/;
        if( className.match(regex) ){
            var link = pageItem.itemLink;
            if( link.filePath.match(/tiger-color/) ){
                link.relink( File(currentDir().fullName + '/links/tiger-grayscale.pdf' ) );
                link.update();
            }
        }
    })});
