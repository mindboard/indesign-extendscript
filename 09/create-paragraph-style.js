//
// 段落スタイルを作成して、段落に適用する
//

var createParagraphStyle = function( doc, params ){
	var paragraphStyle1 = doc.paragraphStyles.item( params.name );

	try {
		// 'my-paragraph-style1' の段落スタイルが既に存在しているか確認
		paragraphStyle1.name;
	}
	catch( error ){
		// まだ存在していない場合は追加する.
		paragraphStyle1 = doc.paragraphStyles.add(params);
	}

	return paragraphStyle1;
};

var createTextFrame = function(page){
	var textFrame = page.textFrames.add();
	textFrame.geometricBounds = ["20mm","20mm","40mm","110mm"];
	textFrame.contents = 'Hello World!';

	return textFrame;
};


// add document
var doc = app.documents.add();
var paragraphStyle1 = createParagraphStyle( doc, { name : 'paragraph-style1' });

// reset page margin
var page = doc.pages.item(0);

// add textFrame
var textFrame = createTextFrame( page );

// apply textFrame paragraphStyle1
textFrame.texts.item(0).applyParagraphStyle(paragraphStyle1, true);

