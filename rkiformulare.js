
function fillSelectionBox(selectBoxId, values, selectedValue){
    let error1 = new Error("Selected Value is not in values");
    let error2 = new Error("Id " +  selectBoxId + " not found")
    let selectedIndex;
    if (!values.includes(selectedValue)){
      throw error1;
    }
    if (document.getElementById(selectBoxId) == null){
      throw error2;
    }
      for(let i = 0; i < values.length; i++){
        //document.getElementById(selectBoxId).innerHTML = document.getElementById(selectBoxId).innerHTML +("<option " + "value='" +values[i] +"' >" + values[i] + "</option> ");
        let option = document.createElement("option");
        option.innerHTML = values[i];
        document.getElementById(selectBoxId).appendChild(option);
        document.getElementById(selectBoxId).selectedIndex = selectedIndex;
        if (values[i] == selectedValue){
          selectedIndex = i;
          document.getElementById(selectBoxId).selectedIndex = selectedIndex;
        } 
    }   
}

function parseVcard(vCard) {
    let user = new Object();
    user = {
      secondName: vCard.slice(vCard.search(" N:")+3, vCard.search(";")),
      firstName: vCard.slice(vCard.search(";")+1, vCard.search(";;;")),
      birthDay: vCard.slice(vCard.search("BDAY:")+5,vCard.search("EMAIL")-1).slice(6,8) + "." +vCard.slice(vCard.search("BDAY:")+5,vCard.search("EMAIL")-1).slice(4,6) +"."+ vCard.slice(vCard.search("BDAY:")+5,vCard.search("EMAIL")-1).slice(0,4),
      email: vCard.slice(vCard.search("EMAIL")).slice(vCard.slice(vCard.search("EMAIL")).search(":") +1, vCard.slice(vCard.search("EMAIL")).search("TEL;") -1),
      phone: vCard.slice(vCard.search("TEL;")).slice(vCard.slice(vCard.search("TEL;")).search(":")+1,vCard.slice(vCard.search("TEL;")).search("ADR")-1),
      street: vCard.slice(vCard.search(":;;")+3).slice(0,vCard.slice(vCard.search(":;;")+3).search(";")),
      city: vCard.slice(vCard.search(":;;")+3).slice(vCard.slice(vCard.search(":;;")+3).search(";")+1,vCard.slice(vCard.search(":;;")+3).search(";;")),
      zipCode: vCard.slice(vCard.search(":;;")+3).slice(vCard.slice(vCard.search(":;;")+3).search(";;")+2,vCard.slice(vCard.search(":;;")+3).search("; REV"))
    }
    return user;
}