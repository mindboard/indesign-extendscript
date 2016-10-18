
var eachItem = function(myItemList,func){
	for(var i=0; i<myItemList.length; i++){
		func(myItemList[i]);
	}
};


var list = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

$.writeln('--- test1 ---');
for( var i=0; i<list.length; i++ ){
	$.writeln( list[i] );
}

$.writeln('--- test2 ---');
var myFunc = function(it){ $.writeln( it ); };
eachItem( list, myFunc );

