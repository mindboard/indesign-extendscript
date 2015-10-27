
var selection = app.activeDocument.selection;

$.writeln( selection );

for( var v in selection ){
	$.writeln( v );
}

