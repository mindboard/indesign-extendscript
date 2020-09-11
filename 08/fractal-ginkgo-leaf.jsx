//@target InDesign

var createDocument = function(params){
    params.documentPreferences = {
        pageWidth : params.width+"mm",
        pageHeight: params.height+"mm",
           facingPages:false};

    var doc = app.documents.add(params);

    var page = doc.pages.item(0);
    page.marginPreferences.properties = {
        top    : params.marginTop+"mm",
        left   : params.marginLeft+"mm",
        bottom : params.marginBottom+"mm",
        right  : params.marginRight+"mm"};

    return doc;
};

var createPoint = function( pointX,pointY ){
    return {x:pointX, y:pointY};
};

var drawLines = function( page, pointList ){
    if( pointList.length<2 ){
           return ;
       }

    for( var i=0; i<pointList.length; i++ ){
        if( (i+1)<pointList.length ){
            var startPoint = pointList[i];
            var endPoint   = pointList[i+1];

            var top    = startPoint.y + 'mm';
            var left   = startPoint.x + 'mm';
            var bottom = endPoint.y   + 'mm';
            var right  = endPoint.x   + 'mm';

            var lineParams = { geometricBounds : [top,left,bottom,right] };
            var graphicLine = page.graphicLines.add( lineParams );
            graphicLine.strokeWeight = '0.1mm';

            var path = graphicLine.paths[0];
            path.pathPoints[0].anchor = [left,top];
            path.pathPoints[1].anchor = [right,bottom];
        }
    };
};

//
// startPoint を起点として 40度開いた二つの直線を引く.
// r ... 直線の長さ
// degree0 ... 2本引く線のうちの左側の線の角度
//
var drawTwoLines = function( page, counter, r, startPoint, degree0 ){

    var radian1 = degree0*Math.PI/180;
    var point1 = createPoint( startPoint.x+r*Math.cos(radian1), startPoint.y+r*Math.sin(radian1) );

    var degree1 = degree0+40;
    var radian2 = degree1*Math.PI/180;
    var point2 = createPoint( startPoint.x+r*Math.cos(radian2), startPoint.y+r*Math.sin(radian2) );

    drawLines( page, [startPoint,point1] );
    drawLines( page, [startPoint,point2] );

    if( counter<0 ){
        return ;
    }

    //
    // recursion
    //
    drawTwoLines( page, counter-1, r*0.9, point1, degree0 -20);
    drawTwoLines( page, counter-1, r*0.9, point2, degree0 +20);
};


// ---------------------------- 
// fractal ginkgo leaf 
// ---------------------------- 

var pageParams = {
    width   : 100,
    height  : 100,
    marginTop   : 10,
    marginLeft  : 10,
    marginBottom: 10,
    marginRight : 10};

var doc = createDocument( pageParams );
var page = doc.pages.item(0);
var startPoint = createPoint( pageParams.width/2, pageParams.height/2 );
var r = pageParams.width/20;
drawTwoLines( page, 6, r, startPoint, 250 );
