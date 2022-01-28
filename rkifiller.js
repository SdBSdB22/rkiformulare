function fillRKIFormular() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openPrintDialog') == "true") {
        const PrintTimer = setTimeout(window.print, 1000);
    }
    document.getElementById("anamnese-anschrift").innerHTML = window.sessionStorage.getItem('address');
    document.getElementById("anamnese-name-vorname").innerHTML = window.sessionStorage.getItem("secondName") + ", " + window.sessionStorage.getItem("firstName");
    document.getElementById("anamnese-geburtsdatum").innerHTML = window.sessionStorage.getItem("birthdate");
    document.getElementById("einwilligung-anschrift").innerHTML = window.sessionStorage.getItem('address');
    document.getElementById("einwilligung-name-vorname").innerHTML = window.sessionStorage.getItem("secondName") + ", " + window.sessionStorage.getItem("firstName");
    document.getElementById("einwilligung-geburtsdatum").innerHTML = window.sessionStorage.getItem("birthdate");
    document.getElementById("einwilligung-ort-datum").innerHTML = window.sessionStorage.getItem('date');
    window.sessionStorage.removeItem('firstName');
    window.sessionStorage.removeItem('secondName');
    window.sessionStorage.removeItem('birthdate');
    window.sessionStorage.removeItem('address');
    window.sessionStorage.removeItem('date');
}

export {fillRKIFormular};