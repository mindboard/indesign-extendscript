//
// Exporting conditional text name in ActiveDocument
//
var doc = app.activeDocument;
if( doc!=null ){
    var conditions = doc.conditions;
    for(var i=0; i<conditions.length; i++){
        $.writeln(conditions[i].name);
    }
}
