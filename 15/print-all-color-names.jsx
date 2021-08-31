//@target InDesign

var console = {};
console.log = function(message){
    $.writeln(message);
};

// add document
var doc = app.documents.add();

for(var i=0;i<doc.colors.length; i++){
    var item = doc.colors.item(i);
    console.log(item.name);
}
