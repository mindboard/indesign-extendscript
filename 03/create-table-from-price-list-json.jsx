//@target InDesign

var createDocument = function(params){
    params.documentPreferences = {
        pageWidth : params.width+"mm",
        pageHeight: params.height+"mm",
        facingPages:false};

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

var read = function( file ){
    file.encoding = "UTF-8";
    var handle = file.open("r");
    if( handle ){
        var text = file.read();
        file.close();
        return text;
    }
    return '';
};

var toJsonObject = function( jsonString ){
    return eval('('+jsonString + ');' );
};

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var pageParams = {
    width   : 297,
    height  : 210,
    marginTop   : 10,
    marginLeft  : 10,
    marginBottom: 10,
    marginRight : 10};

var doc = createDocument( pageParams );

var page = doc.pages.item(0);

var textFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.height - pageParams.marginBottom),
    right  : (pageParams.width  - pageParams.marginRight) };

var textFrame = createTextFrame(page, textFrameParams);

//
// read json data
//

var jsonString = read(File( currentDir().fullName + '/res/price-list.json' ));
var jsonObject = toJsonObject( jsonString );
$.writeln( jsonObject );

var myHeaderRowCount = 1;
var myBodyRowCount = jsonObject.priceList.length;

//
// create table 
//
var tableWidth  = (textFrameParams.right - textFrameParams.left) *0.4;
var tableHeight = (textFrameParams.bottom - textFrameParams.top) *0.5;

var table = textFrame.tables.add({
    headerRowCount : myHeaderRowCount,
    bodyRowCount   : myBodyRowCount,
    columnCount    : 2,
       width          : tableWidth+"mm",
       height         : tableHeight+"mm" });


//
// build header row
//
var headerRow = table.rows.item(0);
headerRow.fillColor = doc.colors.item("Black");
headerRow.fillTint = 30;

var headerRowContentsArray = ['Name','Price'];

for(var i=0; i<table.columnCount; i++){
    headerRow.cells.item(i).contents = headerRowContentsArray[i];
}

//
// build body rows
//
for( var i=0; i<myBodyRowCount; i++ ){
    var rowIndex = i +1;

    var cell0 = table.rows.item(rowIndex).cells.item(0);
    cell0.contents = jsonObject.priceList[i].name;

    var cell1 = table.rows.item(rowIndex).cells.item(1);
    cell1.contents = jsonObject.priceList[i].price;
}
