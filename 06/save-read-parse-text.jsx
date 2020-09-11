//@target InDesign

var save = function( file, text ){
    file.encoding = "UTF-8";
    var handle = file.open("w");
    if( handle ){
        file.write(text);
        file.close();
    }
};

var read = function( file ){
    file.encoding = "UTF-8";
    var handle = file.open("r");
    if( handle ){
        var text = file.read();
        file.close();
        return text;
    }
    return '';
};

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

// 0)
var tsvText1 = 'iPad	400' + '\n' + 'iPad Pro	700';

// 1) save
var file = new File( currentDir().fullName+'/tmp.csv' );
save( file, tsvText1 );

// 2) read
var tsvText2 = read( file );

// 3) parse
var lines = tsvText2.split(/\n/);

for(var i=0; i<lines.length; i++){
    var line = lines[i];
    var productName = line.split(/\t/)[0];
    var productPrice = line.split(/\t/)[1];
    
    $.writeln('- name: '+ productName + ', price: $'+productPrice);
}
