//@target InDesign

var eachPageItem = function(page,func){ for(var i=0; i<page.allPageItems.length; i++){ func(page.allPageItems[i]); } };

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

var createTableInPage = function(page){
    var textFrameParams = {
        top    : pageParams.marginTop,
        left   : pageParams.marginLeft,
        bottom : (pageParams.height - pageParams.marginBottom),
        right  : (pageParams.width  - pageParams.marginRight) };
    
    var textFrame = createTextFrame(page, textFrameParams);
    
    
    //
    // create table 
    //
    var tableWidth  = (textFrameParams.right - textFrameParams.left) *0.9;
    var tableHeight = (textFrameParams.bottom - textFrameParams.top) *0.9;
    
    var table = textFrame.tables.add({
        headerRowCount : 1,
        bodyRowCount   : 5,
        columnCount    : 7,
           width          : tableWidth+"mm",
           height         : tableHeight+"mm" });
    
    
    //
    // build header row
    //
    var headerRow = table.rows.item(0);
    headerRow.fillColor = doc.colors.item("Black");
    headerRow.fillTint = 30;
    
    var headerRowContentsArray = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    
    for(var i=0; i<table.columnCount; i++){
        headerRow.cells.item(i).contents = headerRowContentsArray[i];
    }
    
    //
    // build body rows
    // -> October, 2015
    //
    var cellContentsList = [];
    var date20151001 = new Date(2015,10-1,1,0,0,0,0);
    for( var i=0; i<date20151001.getDay(); i++ ){
        cellContentsList.push('');
    }
    for( var date=1; date<32; date++ ){
        cellContentsList.push(''+date);
    }
    
    var cellContentsCount = 0;
    for( var rowIndex=1; rowIndex<6; rowIndex++ ){
        for( var columnIndex=0; columnIndex<7; columnIndex++ ){
            var cell = table.rows.item(rowIndex).cells.item(columnIndex);
    
            if( cellContentsCount<cellContentsList.length ){
                cell.contents = cellContentsList[ cellContentsCount ];
            }
            cellContentsCount++;
        }
    }
};


var getTextFrames = function(page){
    var retVal = [];
    eachPageItem(page,function(pageItem){
        var className = pageItem.constructor.name;
        if( className.match(/TextFrame/) ) {
            retVal.push(pageItem);
        }
    } );
    return retVal;
};

var getTablesInTextFrame = function( textFrame ){
    var tableList = [];
    var story = textFrame.parentStory;
    for(var i=0; i<story.characters.length; i++){
        var character = story.characters[i];
        if(character.tables.length>0){
            tableList.push( character.tables[0] );
        }
    }
    return tableList;
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

// 1)
// create table
createTableInPage(page);

// 2)
// find it
var textFrames = getTextFrames(page);
for(var i=0; i<textFrames.length; i++){
    $.writeln( '- textFrame : ' + textFrames[i] );
    var tables = getTablesInTextFrame( textFrames[i] );
    for(var j=0; j<tables.length; j++){
        $.writeln( '-- table : ' + tables[i] );
    }
}

