//@target InDesign

var params = {};
params.documentPreferences = {
    pageWidth   : 100,
    pageHeight  : 100,
    facingPages : false};

// add document
var doc = app.documents.add(params);

// reset page margin
var page = doc.pages.item(0);
page.marginPreferences.properties = {top:0, left:0, bottom:0, right:0};

//
// add polygon
//
var polygon = page.polygons.add({});
polygon.strokeWeight = '0.25mm';

var pointA = [20,100];
var pointB = [30,60];
var pointC = [40,20];

var pointD = [60,20];
var pointE = [70,60];
var pointF = [80,100];

var entirePath = [];
entirePath.push( [pointA, pointB, pointC] );
entirePath.push( [pointD, pointE, pointF] );

polygon.paths[0].properties = {
    entirePath: entirePath,
       pathType:    PathType.OPEN_PATH
};
