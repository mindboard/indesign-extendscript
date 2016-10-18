$.writeln('--- app.fonts ----------------------------------------');
for( var i=0; i<app.fonts.length; i++ ){
       $.writeln(app.fonts[i].name);
}

$.writeln('--- document.documentPreferences ----------------------------------------');
var doc = app.documents.add({});
for( var v in doc.documentPreferences ){
    $.writeln( v );
}

$.writeln('--- page ----------------------------------------');
var page = doc.pages.item(0);
for( var v in page ){
    $.writeln( v );
}

$.writeln('--- page.marginPreferences ----------------------------------------');
for( var v in page.marginPreferences ){
    $.writeln( v );
}
