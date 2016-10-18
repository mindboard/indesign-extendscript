while( true ){
    if( app.documents.length<1 ){ break; }

    var doc  = app.activeDocument;
    doc.close(SaveOptions.no);
}
