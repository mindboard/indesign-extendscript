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
// startPoint を頂点とした 底辺が lengthOfSize の長さの三角形を描きます.
//
var drawTriangle = function( page, counter, startPoint, lengthOfSide ){
    var bottomLeftPoint  = createPoint( startPoint.x - lengthOfSide/2, startPoint.y+lengthOfSide );
    var bottomRightPoint = createPoint( startPoint.x + lengthOfSide/2, startPoint.y+lengthOfSide );

    var pointList = [ startPoint, bottomLeftPoint, bottomRightPoint, startPoint ];
    drawLines( page, pointList );

    if( counter<0 ){
        return ;
    }

    //
    // recursion
    //
    drawTriangle( page, counter-1, startPoint,       lengthOfSide/2 );
    drawTriangle( page, counter-1, bottomLeftPoint,  lengthOfSide/2 );
    drawTriangle( page, counter-1, bottomRightPoint, lengthOfSide/2 );
};


// ---------------------------- 
// fractal triangle 
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
var startPoint = createPoint( pageParams.width/2, pageParams.marginTop );
var lengthOfSide = pageParams.width/3;
drawTriangle( page, 4, startPoint, lengthOfSide );
