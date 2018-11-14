//
// Deleting all conditional texts in ActiveDocument.
//
var doc = app.activeDocument;
if( doc!=null ){
    doc.conditions.everyItem().remove();
}
