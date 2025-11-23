//@target InDesign

// add document
var doc = app.documents.add();

// reset page margin
var page = doc.pages.item(0);

// add textFrame
var textFrame = page.textFrames.add();
textFrame.geometricBounds = ["20mm","20mm","40mm","110mm"];
textFrame.contents = 'Hello, World!';
