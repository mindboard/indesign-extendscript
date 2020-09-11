//@target InDesign

var currentDir = function(){
    return File($.fileName).parent;
};

$.writeln( currentDir().fullName );
