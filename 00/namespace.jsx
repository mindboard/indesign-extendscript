//@target InDesign

var console = {};
console.log = function(message){
    $.writeln(message);
};

// create a _ namespace.
var _ = {};
_.eachItem = function(myItemList,func){
    for(var i=0; i<myItemList.length; i++){
        func(myItemList[i]);
    }
};

var list = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

var myFunc = function(it){ console.log( it ); };
_.eachItem( list, myFunc );
