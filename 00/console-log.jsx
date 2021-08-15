//@target InDesign

var console = {};
console.log = function(message){
    $.writeln(message);
};

var eachItem = function(myItemList,func){
    for(var i=0; i<myItemList.length; i++){
        func(myItemList[i]);
    }
};

var list = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

console.log('--- test1 ---');
for( var i=0; i<list.length; i++ ){
    console.log( list[i] );
}

console.log('--- test2 ---');
var myFunc = function(it){ console.log( it ); };
eachItem( list, myFunc );
