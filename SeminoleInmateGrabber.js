var arrayVar = []
var bookingArray = []

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
        bookingArray.push(inputList[i].slice(-17, -5))
    }
}

async function listInmates() {
    let charArray = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
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