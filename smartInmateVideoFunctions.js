const CHANGE_FROM = "NATASHA NATAL"
const CHANGE_TO = "JEFFREY EPSTEIN"
const MESSAGE_SUB = "Didn't Kill Himself"
const MESSAGE_BODY = "P Diddy is next..."

function anonymizeInmateMessages() {
    for (i in document.getElementsByClassName("span8")) {document.getElementsByClassName("span8")[i].innerText=CHANGE_TO; document.getElementsByClassName("span8")[i].style="font-size:24px; color:white"}
    for (j in document.getElementsByClassName("span11")) {if (j%2 == 0) {document.getElementsByClassName("span11")[j].innerText=MESSAGE_SUB; document.getElementsByClassName("span11")[j].style="font-size:18px; background-color:black; color:white"} else {document.getElementsByClassName("span11")[j].innerText=MESSAGE_BODY; document.getElementsByClassName("span11")[j].style="color:white; font-size:16px"}}
    for (k in document.getElementsByClassName("row-fluid")) {document.getElementsByClassName("row-fluid")[k].style="background-color:black"}
}

function initialVisitScreen() {
    window.stop()
    let tags = [];
    for (i in document.getElementsByTagName("td")) {tags.push(document.getElementsByTagName("td")[i])}; 
    // for (i in tags) { console.log(tags[i].innerText) }
    for (i in tags) {if (tags[i].innerText == CHANGE_FROM) {tags[i].innerText = CHANGE_TO}}
    // return tags
}

function stepOneInmateSelection() {
    for (i in document.getElementsByClassName("list-group-item")) {document.getElementsByClassName("list-group-item")[i].innerText=CHANGE_TO}
}

function stepTwoSelectVisitType() {
    for (i = 0; i < document.getElementsByTagName("p").length; i++) {
        let text = document.getElementsByTagName("p")[i].innerText
        if (text.includes(CHANGE_FROM) == true) {
            // text = text.replace(CHANGE_FROM, CHANGE_TO)
            console.log(i)
            document.getElementsByTagName("p")[i].innerText = text.replace(CHANGE_FROM, CHANGE_TO)
        }
        else {
            console.log(i)
            console.log("\nSkipped\n")
        }
    }
}

function stepTwoVisitDuration() {
    for (i = 0; i < document.getElementsByTagName("p").length; i++) {
        let html = document.getElementsByTagName("p")[i].innerHTML
        if (html.includes(CHANGE_FROM) == true) {
            // text = text.replace(CHANGE_FROM, CHANGE_TO)
            console.log(i)
            document.getElementsByTagName("p")[i].innerHTML = html.replace(CHANGE_FROM, CHANGE_TO)
        }
        else {
            console.log(i)
            console.log("\nSkipped\n")
        }
    }
}

function stepFourSelectVisitTime() {
    for (i=0; i<document.getElementsByClassName("alert alert-info").length; i++) {
    let html = document.getElementsByClassName("alert alert-info")[i].innerHTML
    html = html.replace("Seminole County Jail", "Dildo Fortress")
    html = html.replace("US/Eastern", "Timezone of Sorrow")
    document.getElementsByClassName("alert alert-info")[i].innerHTML = html
    }
}

function stepFiveConfirmVisitDetails() {
    for (i=0; i<document.getElementsByTagName("td").length; i++) {
    let html = document.getElementsByTagName("td")[i].innerHTML
    html = html.replace(CHANGE_FROM, CHANGE_TO)
    html = html.replace(/([0-9][0-9][0-9])\S\d+/i, "420-420")
    document.getElementsByTagName("td")[i].innerHTML = html
    }
}