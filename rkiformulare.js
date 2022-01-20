
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
function ParameterToUser(){
  let url = window.location.href;
  let user = new Object();
  user = {
    firstName: url.slice(url.search("firstName=") + 10,url.search(",secondName")),
    secondName: url.slice(url.search("secondName=") + 11,url.search(",birthdate")),
    birthdate: url.slice(url.search("birthdate=") + 11,url.search(",address")),
    address: url.slice(url.search("address=")+8, url.search(",date")),
    date: url.slice(url.search(",date=")+6)
  }
  return user;
}
function fillRKIFormular(user){
  document.getElementById("anamnese-anschrift").innerHTML = user.address;
  document.getElementById("anamnese-name-vorname").innerHTML = user.secondName +", "+user.firstName;
  document.getElementById("anamnese-geburtsdatum").innerHTML = user.birthdate;
  document.getElementById("einwilligung-anschrift").innerHTML = user.address;
  document.getElementById("einwilligung-name-vorname").innerHTML = user.secondName +", "+user.firstName;
  document.getElementById("einwilligung-geburtsdatum").innerHTML = user.birthdate;
  document.getElementById("einwilligung-ort-datum").innerHTML = user.date;


}