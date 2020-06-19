function getJournalData(data){
    journalData = data;
    if(data.val())
        journalKeys = Object.keys(data.val());
}
function searchKeysForEntry(){
    let nameInput = elements[2];
    let textarea = elements[4];
    for(i = 0; i < journalKeys.length; i++){
        if(nameInput.value() == journalKeys[i]){
            textarea.contentDocument.body.innerHTML = journalData.val()[journalKeys[i]].text;
            return true;
        }
    }
    return false;
}
function saveEntry(){
    let textarea = elements[4];
    let nameInput = elements[2];
    if(textarea.contentDocument.body.innerHTML){
        database.ref(`Entries/${nameInput.value()}`).set({
            name: nameInput.value(),
            text: textarea.contentDocument.body.innerHTML
        });
    }
}
function execCmdBold(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('bold',false,null);
}
function execCmdItalics(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('italic',false,null);
}
function execCmdAlignCenter(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('justifyCenter',false,null);
}
function execCmdAlignJustify(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('justifyFull',false,null);
}
function execCmdAlignLeft(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('justifyLeft',false,null);
}
function execCmdAlignRight(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('justifyRight',false,null);
}
function execCmdUndo(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('undo',false,null);
}
function execCmdRedo(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('redo',false,null);
}
function execCmdUnderline(){
    let rtfld = elements[4].contentDocument;
    rtfld.execCommand('underline',false,null);
}