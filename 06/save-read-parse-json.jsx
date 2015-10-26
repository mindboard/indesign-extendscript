
var eachItem = function(myItemList,func){ for(var i=0; i<myItemList.length; i++){ func(myItemList[i]); } };

var save = function( file,text ){
	file.encoding = "UTF-8";
	var handle = file.open("w");
	if( handle ){
		file.write(json);
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

var toJsonObject = function( jsonString ){
	return eval('('+jsonString + ');' );
};

var currentDir = function(){
	return File($.fileName).parent;
};


// 0)
var json = '{"list":["a","b","c"]}';

// 1) save
var file = new File( currentDir().fullName+'/tmp.json' );
save( file,json );

// 2) read
var json2 = read( file );

// 3) parse
var jsonObject = toJsonObject( json2 );

eachItem( jsonObject.list, function(item){
	$.writeln( '- '+item );
} );

