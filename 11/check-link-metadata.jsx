//@target InDesign

var eachPage = function(doc,func){ for(var i=0; i<doc.pages.length; i++){ func(doc.pages.item(i)); } };
var eachPageItem = function(page,func){ for(var i=0; i<page.allPageItems.length; i++){ func(page.allPageItems[i]); } };

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

var createNewDocument = function(){

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

    // specify place pdf page number
    app.pdfPlacePreferences.pageNumber = 2;

    textFrame.place( File( currentDir().fullName + '/../04/links/tigers.pdf' ) );
    textFrame.fit(FitOptions.CONTENT_TO_FRAME);

    return doc;
};


// ----
// main
// ----

var doc = createNewDocument();

eachPage( doc, function(page){
    eachPageItem(page,function(pageItem){
        var className = pageItem.constructor.name;
        $.writeln( 'pageItem : ' + className );

        var regex = /PDF/;
        if( className.match(regex) ){
            var link = pageItem.itemLink;
            for( var v in link.linkXmp ){
                $.writeln(''+v+':'+link.linkXmp[v]);
            }
        }
    })});
