
var eachPage = function(doc,func){ for(var i=0; i<doc.pages.length; i++){ func(doc.pages.item(i)); } };
var eachPageItem = function(page,func){ for(var i=0; i<page.allPageItems.length; i++){ func(page.allPageItems[i]); } };

var createDocument = function(){
    var doc = app.documents.add();
    var page = doc.pages.item(0);
    var textFrame = page.textFrames.add();
    textFrame.geometricBounds = ["20mm","20mm","40mm","110mm"];
    textFrame.contents = 'Hello World!';
    return doc;
}    

var findLayer = function(doc,layerName){
    for(var i=0; i<doc.layers.length; i++){
        var l = doc.layers[i];
        if( l.name===layerName ){
            return l;
        }
    }
    return null;
};


var doc = createDocument();

// 1) create 'myLayer' layer
var myLayer = findLayer(doc,'myLayer')
if( myLayer==null ){
    myLayer = doc.layers.add( {name:'myLayer'} );
}

// 2) find textFrame and apply 'myLayer' to it
eachPage( doc, function(page){
    $.writeln( 'page : '+page );

    eachPageItem(page,function(pageItem){
        $.writeln( 'pageItem : ' + pageItem );
        pageItem.itemLayer = myLayer;
    });
} );

//doc.close(SaveOptions.no);
