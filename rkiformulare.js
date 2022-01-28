import './html5-qrcode.js';

const changeCameraLabel = "----- Kamera Wechseln -----";
let html5QrCode;

// TODO: we should not use global variables here
let selectedCameraIndex;
let cameraId;
let cameras;
let cameralabels = [];

function scanFromFile(e) {
    if (e.target.files.length == 0) {
        return;
    }

    const imageFile = e.target.files[0];
    // Scan QR Code
    html5QrCode.scanFile(imageFile, true
    ).then(decodedText => {
        // success, use decodedText
        console.log(decodedText);
        document.getElementById("reader").hidden = true;
        extractUserData(decodedText);
        document.getElementById("buttons").appendChild(createRKILink());
    }).catch(err => {
        // failure, handle it.
        console.log(`Error scanning file. Reason: ${err}`)
    });
}

function createRKILink() {
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("introduction").remove();

    const container = document.createElement("div");
    container.classList.add("grid");

    const successMessage = document.createElement("p");

    const firstName = window.sessionStorage.getItem("firstName") || "";
    successMessage.innerHTML = `Hallo <strong>${firstName}</strong>: Das scannen des Testprofils war <strong>erfolgreich</strong>.`;
    container.appendChild(successMessage);

    const RKIlink = document.createElement("a");
    RKIlink.href = './rkiformulare.html?openPrintDialog=true';
    RKIlink.innerText = "Ausgefüllte RKI-Formulare jetzt drucken";
    RKIlink.setAttribute('role', 'button');
    container.appendChild(RKIlink);

    const restart = document.createElement("a");
    restart.href = './';
    restart.innerText = "Ein anderes Testprofil einlesen";
    restart.setAttribute('role', 'button');
    restart.setAttribute('class', 'secondary');
    container.appendChild(restart);


    return container;
}

function extractUserData(decodedText) {
    let user = parseVcard(decodedText);
    const d = new Date();
    window.sessionStorage.setItem('firstName', user.firstName);
    window.sessionStorage.setItem('secondName', user.secondName);
    window.sessionStorage.setItem('birthdate', user.birthDay);
    window.sessionStorage.setItem('address', user.street + ", " + user.city + ", " + user.zipCode);
    window.sessionStorage.setItem('date', d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear())
}

function scanWithCamera() {
    document.getElementById("reader").hidden = false;
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objekts of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            let l = 0;
            if(selectedCameraIndex !== undefined) {
                cameraId = devices[selectedCameraIndex];
            }
            cameras = devices;
            for (let i = 0; i < cameras.length; i++) {
                cameralabels[i] = cameras[i].label;
                l++;
            }
            cameralabels[l] = changeCameraLabel;
            console.debug(cameraId);
            console.debug(cameras);
            console.debug(cameralabels);
        }

        document.getElementById("cameraBox").hidden = false;
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            html5QrCode.stop();
            document.getElementById("cameraBox").hidden = true;

            extractUserData(decodedText);
            document.getElementById("buttons").appendChild(createRKILink());
        };
        const config = {fps: 10, qrbox: {width: 350, height: 350}, disableFlip: true};
        document.getElementById("cameraBox").innerHTML = "";
        fillSelectionBox("cameraBox", cameralabels, changeCameraLabel);
        if(selectedCameraIndex !== undefined) {
            html5QrCode.start({deviceId: {exact: cameraId.id}}, config, qrCodeSuccessCallback);
        } else {
            html5QrCode.start({facingMode: "environment"}, config, qrCodeSuccessCallback);
        }
    });
}

function fillSelectionBox(selectBoxId, values, selectedValue) {
    let error1 = new Error("Selected Value is not in values");
    let error2 = new Error("Id " + selectBoxId + " not found")
    let selectedIndex;
    if (!values.includes(selectedValue)) {
        throw error1;
    }
    if (document.getElementById(selectBoxId) == null) {
        throw error2;
    }
    for (let i = 0; i < values.length; i++) {
        //document.getElementById(selectBoxId).innerHTML = document.getElementById(selectBoxId).innerHTML +("<option " + "value='" +values[i] +"' >" + values[i] + "</option> ");
        let option = document.createElement("option");
        option.innerHTML = values[i];
        document.getElementById(selectBoxId).appendChild(option);
        document.getElementById(selectBoxId).selectedIndex = selectedIndex;
        if (values[i] == selectedValue) {
            selectedIndex = i;
            document.getElementById(selectBoxId).selectedIndex = selectedIndex;
        }
    }
}

function parseVcard(vCard) {
    if(!vCard.includes("BEGIN:VCARD")) {
        document.querySelector('#error').style.display = "inherit";
        throw "invalid qr code";
    }
    document.querySelector('#error').style.display = "none";

    let user = new Object();
    user = {
        secondName: vCard.slice(vCard.search("N:") + 22, vCard.search(";")),
        firstName: vCard.slice(vCard.search(";") + 1, vCard.search(";;;")),
        birthDay: vCard.slice(vCard.search("BDAY:") + 5, vCard.search("EMAIL") - 1).slice(6, 8) + "." + vCard.slice(vCard.search("BDAY:") + 5, vCard.search("EMAIL") - 1).slice(4, 6) + "." + vCard.slice(vCard.search("BDAY:") + 5, vCard.search("EMAIL") - 1).slice(0, 4),
        email: vCard.slice(vCard.search("EMAIL")).slice(vCard.slice(vCard.search("EMAIL")).search(":") + 1, vCard.slice(vCard.search("EMAIL")).search("TEL;") - 1),
        phone: vCard.slice(vCard.search("TEL;")).slice(vCard.slice(vCard.search("TEL;")).search(":") + 1, vCard.slice(vCard.search("TEL;")).search("ADR") - 1),
        street: vCard.slice(vCard.search(":;;") + 3).slice(0, vCard.slice(vCard.search(":;;") + 3).search(";")),
        city: vCard.slice(vCard.search(":;;") + 3).slice(vCard.slice(vCard.search(":;;") + 3).search(";") + 1, vCard.slice(vCard.search(":;;") + 3).search(";;")),
        zipCode: vCard.slice(vCard.search(":;;") + 3).slice(vCard.slice(vCard.search(":;;") + 3).search(";;") + 2, vCard.slice(vCard.search(":;;") + 3).search(";;") + 7)
    }
    return user;

}

function init() {
    console.debug("initializing site");

    html5QrCode = new Html5Qrcode("reader");
    document.querySelector('button').addEventListener('click', scanWithCamera);

    document.querySelector('select').addEventListener('change', function(){
        selectedCameraIndex = document.querySelector('select').selectedIndex
        html5QrCode.stop();
        scanWithCamera();
    });

    document.querySelector('input').addEventListener('change', scanFromFile);
}

export {init};
