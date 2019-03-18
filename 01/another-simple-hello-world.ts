declare class IndTextFrame {
    geometricBounds
    contents: String
}

declare class IndTextFrames {
    add(): IndTextFrame
}
declare class IndPage {
    textFrames: IndTextFrames
}
declare class IndPages {
    item(index: Number): IndPage
}
declare class IndDocument {
    pages: IndPages
}
declare class IndDocuments {
    add(): IndDocument
}
declare class Application {
    documents: IndDocuments;
}
declare var app: Application;

// add document
const doc = app.documents.add();

// reset page margin
const page = doc.pages.item(0);

// add textFrame
const textFrame = page.textFrames.add();
textFrame.geometricBounds = ["20mm","20mm","40mm","110mm"];
textFrame.contents = 'Hello World!';

