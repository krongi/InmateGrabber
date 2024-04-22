const inmateArray = []
const listInmateArray = []
const bookingArray = []
const deepCrimesArray = []
const urlArray = []
const winTarget = "_blank"
const promiseArray = []
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
const charArray = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

/* 
listInmates is tested working properly. 
*/
async function listInmates(arrayIn, characterArray) {
    for(i in characterArray) {
        document.getElementById("txtName").value = charArray[i];
        SubmitInmateSearchRequest();
        await sleep(1)
        await populateInmateArray(arrayIn, characterArray)
        if (i+1 == characterArray.length) {
            document.getElementById("txtName").value = ""
        }
    }
    document.getElementById("txtName").value = ""
    getInmateInfo(arrayIn)
    const finalData = await detailedDataPull(urlArray, inmateArray)
    let downDate = Date.now().toString()
    void downBlob(arrayIn, "inmateList" + downDate + ".sem")
    void downBlob(bookingArray, "bookingList" + downDate + ".sem")
    void downBlob(JSON.stringify(inmateArray), "inmateCrimes" + downDate + ".json")
    return finalData
}

/* 
populateInmateArray seems to work fine as well. 
*/
function populateInmateArray(arrayIn, characterArray) {
    // console.log(characterArray[j]);
    for (j = 1; j < document.getElementById("divResponse").getElementsByTagName("TR").length; j++) {
        arrayIn.push(document.getElementById("divResponse").getElementsByTagName("TR")[j].innerText)
        console.log(arrayIn.length)   
    }
    return arrayIn
}

/* 
getInmateInfo is also tested working within the context of listInmates
*/
function getInmateInfo(inputList) {
    for (i in inputList) {
        let bookingNumber = inputList[i].slice(-17, -5)
        bookingArray.push(bookingNumber)
        urlArray.push(deepURL+bookingNumber)
    }
}


/* 
This function is just a wrapper that executes the generateInmateObject function which returns more detailed data after looping through each booking number
*/
async function detailedDataPull(urlList, arrayIn) {
    // const passToGetCrimes = {}
    for (i in urlList) {
        let passToGetCrimes = await generateInmateObject(urlList[i], arrayIn)
        console.log(passToGetCrimes)
        await sleep(1)
    }
    // return passToGetCrimes
}

/* 
This function is responsible for opening up the properurl and then generating an object with several keys with values pulled from the page, it then runs a for loop to populate the crimeObject which is hen fed into singleInmate.crimes before pushing singleInmate to the outbound array
*/
async function generateInmateObject(url, arrayIn) {
    const win = await openWindow(url)
    await sleep(1)
    let singleInmate = {name: `${win.document.getElementById(nameID).innerText}`, bookingNumber: `${win.document.getElementById(bookingID).innerText}`, dob: `${win.document.getElementById(dobID).innerText}`, arrestedBy: `${win.document.getElementById(arrestedByID).innerText}`, arrestDate: `${win.document.getElementById(arrestDateID).innerText}`, debt: `${win.document.getElementById(debtBalanceID).innerText}`, money: `${win.document.getElementById(trustBalanceID).innerText}`, crimes: {}}
    let crimeList = []
        for (i in win.document.getElementsByTagName("TR")) {
            if (i > 0) {   
                let crimeObject = {}
                const re = new RegExp("[0-9][0-9]?\\s?", "g")
                let innerText = win.document.getElementsByTagName("TR")[i].innerText
                let innerTextSplitTabs = innerText.split("\t")
                let innerTextRemoveDigits = innerTextSplitTabs[1].replaceAll(re, "")
                crimeObject.charge = innerTextRemoveDigits
                crimeObject.case = innerTextSplitTabs[2]
                crimeObject.bond = innerTextSplitTabs[3]
                crimeObject.courtDate = innerTextSplitTabs[4]
                crimeObject.disposition = innerTextSplitTabs[5]
                crimeList.push(crimeObject)                     
            }
        }
    singleInmate.crimes = crimeList
    arrayIn.push(singleInmate)
    await closeWindow(win)
    return singleInmate
}

/* 
downBlob tested working within the context of listInmates.
*/
function downBlob(dataIn, fileName) {
    var blob = new Blob([dataIn], {type: 'text/plain'}),
    a    = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/plain', a.download, a.href].join(':')
    a.click()
}

// Opens the browser url
function openWindow(url) {
    let win = window.open(url, winTarget)
    return win

}
// Closes the browser opened by the previous function
function closeWindow(winIn) {
    winIn.close()
    return 0
}

/* 
sleep function appears to be working as well within the context of listInmates
*/
async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/* This function is to grab more info than the initial listInmates() function does. It uses the booking
url to select the object and proceeds to create a new object for each person I'll look into changing this
later on. I'm sure it's not the best way to go about it*/

function generateRequest(urlList) {
    let xhttp = new XMLHttpRequest();
    xhttp.responseXML
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
    }
    };
    for(i in urlList) {
    xhttp.open("GET", urlList[i], true);
    xhttp.send();
    let inmateObject = {name: `${win.document.getElementById(nameID).innerText}`, bookingNumber: `${win.document.getElementById(bookingID).innerText}`, dob: `${win.document.getElementById(dobID).innerText}`, arrestedBy: `${win.document.getElementById(arrestedByID).innerText}`, arrestDate: `${win.document.getElementById(arrestDateID).innerText}`, debt: `${win.document.getElementById(debtBalanceID).innerText}`, money: `${win.document.getElementById(trustBalanceID).innerText}`, crimes: {}}
    }
}


