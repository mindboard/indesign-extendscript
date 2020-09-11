//@target InDesign

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

var openDocument = function( idmlFile ){ return app.open( idmlFile ); };
var closeDocument = function( document ){ document.close(SaveOptions.no); }

var saveDocumentAsIndd = function( inddFile, document ){ document.save( inddFile ); }
var saveDocumentAsIdml = function( idmlFile, document ){ doc.exportFile(ExportFormat.INDESIGN_MARKUP, idmlFile, false); };

var toInddFile = function( idmlFile ){
    var len = idmlFile.name.length;
    var suffixLen = ".idml".length;
    return File(idmlFile.path+"/"+idmlFile.name.substr( 0,len-suffixLen )+".indd");
}

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var dir = Folder( currentDir().fullName + "/res/" );
var files = dir.getFiles('*.idml');
for(var i=0; i<files.length; i++){
    var idmlFile = files[i];
    var doc = openDocument( idmlFile );
    saveDocumentAsIndd( toInddFile(idmlFile), doc ); 
    closeDocument( doc );
}
