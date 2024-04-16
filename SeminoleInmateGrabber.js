var arrayVar = []
var bookingArray = []
var inmateArray = []
var urlArray = []
var thisWindow

const searchURL = 'https://www.seminolesheriff.org/WebBond/Inmates.aspx'
const deepURL = 'https://www.seminolesheriff.org/WebBond/inmate.aspx?bookingnumber='
const bookingID = "lblBookingNumber"
const nameID = "lblName"
const dobID = "lblDOB"
const arrestedByID = "lblArrestedBy"
const arrestDateID = "lblArrestDate"
const debtBalanceID = "lblDebtBalance"
const trustBalanceID = "lblTrustBalance"
const balanceUpdatedID = "lblBalanceUpdated"
const tableHeadings = ["Charge", "Court Case #", "Bond", "Court Date", "Disposition"]

function getInmateInfo(inputList) {
    for (i in inputList) {
        let bookingNumber = inputList[i].slice(-17, -5)
        bookingArray.push(bookingNumber)
        urlArray.push(deepURL+bookingNumber)
    }
}

async function getCrimes(crimeObject){
    for (i in thisWindow.document.getElementsByTagName("TR")) {
        if (i != 0) {
            crimeObject.push(thisWindow.document.getElementsByTagName("TR")[i].innerText)
        }
    }
    return crimeObject
}

async function generateInmateObjects(bookingNumberList) {
    for (i in bookingNumberList) {
        let inmateObject = {name: '', bookingNumber: '', dob: '', arrestedBy: '', arrestDate: '', debt: '', money: ''}
        console.log(bookingNumberList[i])
        thisWindow = window.open(deepURL + bookingNumberList[i],this)
        await sleep(1)
        inmateObject.name = thisWindow.document.getElementById(nameID).innerText
        inmateObject.bookingNumber = thisWindow.document.getElementById(bookingID).innerText
        inmateObject.dob = thisWindow.document.getElementById(dobID).innerText
        inmateObject.arrestedBy = thisWindow.document.getElementById(arrestedByID).innerText
        inmateObject.arrestDate = thisWindow.document.getElementById(arrestDateID).innerText
        inmateObject.debt = thisWindow.document.getElementById(debtBalanceID).innerText
        inmateObject.money = thisWindow.document.getElementById(trustBalanceID).innerText
        let crimeObject = []
        for (j in thisWindow.document.getElementsByTagName("TR")) {
            if (j > 0) {
                let innerText = thisWindow.document.getElementsByTagName("TR")[j].innerText
                innerText = innerText.replaceAll("\t", " ")
                crimeObject.push(innerText)            
            }
        }
        inmateObject.crimes = crimeObject
        inmateArray.push(inmateObject)
        console.log(inmateArray[i])
        await sleep(1)
        thisWindow.document.click
    }
    return inmateArray
}

async function listInmates() {
    let charArray = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
    thisWindow = window.open(searchURL)
    for(i in charArray) {
        let textBox = document.getElementById("txtName");
        textBox.value = charArray[i];
        SubmitInmateSearchRequest();
        await sleep(2);
        console.log(charArray[i]);
        for (j = 1; j < document.getElementById("divResponse").getElementsByTagName("TR").length; j++) {

            arrayVar.push(document.getElementById("divResponse").getElementsByTagName("TR")[j].innerText)
            console.log(arrayVar.length)   
        }
    }
    getInmateInfo(arrayVar)
    let downDate = Date.now().toString()
    void downBlob(arrayVar, "inmateList" + downDate + ".sem")
    void downBlob(bookingArray, "bookingList" + downDate + ".sem")
}

async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function downBlob(data, fileName) {
    var blob = new Blob([data], {type: 'text/plain'}),
    a    = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/plain', a.download, a.href].join(':')
    a.click()
}