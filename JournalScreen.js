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
            textarea.value(journalData.val()[journalKeys[i]].text);
            return true;
        }
    }
    return false;
}
function saveEntry(){
    let textarea = elements[4];
    let nameInput = elements[2];
    if(textarea.value()){
        database.ref(`Entries/${nameInput.value()}`).set({
            name: nameInput.value(),
            text: textarea.value()
        });
    }
}