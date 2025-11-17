//@target InDesign

var createMyColor = function(doc, colorName, cmyk){
    var color = null;
    if( doc.colors.item(colorName)==null ){
        color = doc.colors.add({name: colorName});
        color.model = ColorModel.process;
        color.colorValue = cmyk;
    } else{
        color = doc.colors.item(colorName)
    }

    return color;
};

var doc = app.documents.add();
doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

var redColor   = createMyColor(doc, "my-red-colord",  [0, 100, 100, 0]);
var blackColor = createMyColor(doc, "my-black-color", [0, 0, 0, 100]);

var page = doc.pages.item(0);
var rect = page.rectangles.add();
rect.strokeWeight = 0.25;
rect.geometricBounds = ['20mm', '20mm', '40mm', '40mm'];
rect.strokeColor = blackColor;
rect.fillColor = redColor;
