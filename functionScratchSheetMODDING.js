const arrayVar = []
const inmateArray = []
const listInmateArray = []
const bookingArray = []
const deepCrimesArray = []
const urlArray = []
const winTarget = "_blank"

// const win = {}

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

function openWindow(url) {
    let win = window.open(url, winTarget)
    win.blur()
    window.focus()
    return win

}

function closeWindow(winIn) {
    winIn.close()
    return 0
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

function populateInmateArray(arrayIn, characterArray) {
    console.log(characterArray[i]);
    for (j = 1; j < document.getElementById("divResponse").getElementsByTagName("TR").length; j++) {
        arrayIn.push(document.getElementById("divResponse").getElementsByTagName("TR")[j].innerText)
        console.log(arrayIn.length)   
    }
    return arrayIn
}

/* 
listInmates is tested working properly. 
*/
async function listInmates(arrayIn, characterArray) {
    for(i in characterArray) {
        document.getElementById("txtName").value = charArray[i];
        SubmitInmateSearchRequest();
        await sleep(1)
        await populateInmateArray(arrayIn, characterArray)
    }
    getInmateInfo(arrayIn)
    // let downDate = Date.now().toString()
    // void downBlob(arrayIn, "inmateList" + downDate + ".sem")
    // void downBlob(bookingArray, "bookingList" + downDate + ".sem")
}

/* 
sleep function appears to be working as well within the context of listInmates
*/
async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
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

async function generateInmateObject(url, arrayIn) {
    const win = await openWindow(url)
    await sleep(1)
    let singleInmate = {name: `${win.document.getElementById(nameID).innerText}`, bookingNumber: `${win.document.getElementById(bookingID).innerText}`, dob: `${win.document.getElementById(dobID).innerText}`, arrestedBy: `${win.document.getElementById(arrestedByID).innerText}`, arrestDate: `${win.document.getElementById(arrestDateID).innerText}`, debt: `${win.document.getElementById(debtBalanceID).innerText}`, money: `${win.document.getElementById(trustBalanceID).innerText}`, crimes: `${getCrimes()}`}
    // singleInmate.crimes = await getCrimes()
    let crimeObject = []
        for (i in win.document.getElementsByTagName("TR")) {
            if (i > 0) {
                let innerText = win.document.getElementsByTagName("TR")[i].innerText
                innerText = innerText.replaceAll("\t", " ")
                crimeObject.push(innerText)            
            }            
        }
    singleInmate.crimes = crimeObject
    arrayIn.push(singleInmate)
    await closeWindow(win)
    return singleInmate
}

async function populateInmateObject(urlList, arrayIn) {
    for (i in urlList) {
        const passToGetCrimes = await generateInmateObject(urlList[i], arrayIn)
        console.log(passToGetCrimes)
        await sleep(1)
    }
}

function getCrimes() {
    let crimeObject = []
        for (j in this.document.getElementsByTagName("TR")) {
            if (j > 0) {
                let innerText = this.document.getElementsByTagName("TR")[j].innerText
                innerText = innerText.replaceAll("\t", " ")
                crimeObject.push(innerText)            
            }            
        }
    return crimeObject
}


/* This function is to grab more info than the initial listInmates() function does. It uses the booking
url to select the object and proceeds to create a new object for each person I'll look into changing this
later on. I'm sure it's not the best way to go about it*/

async function getMoreInfo(url) {
    // await openWindow(url, "_blank")
    let win = window.open(url)
    let singleInmate
    singleInmate =  await populateInmateObject() //.then(singleInmate.crimes = getCrimes()).then(inmateArray.push(singleInmate))
    singleInmate.crimes = await getCrimes()//.then(win.close())
    promiseArray.push(new Promise (function(resolve, reject) {
        console.log("New promise created....\n\n\n\n"), function(singleInmate) {resolve(singleInmate)}
    }))
    win.close()
}

async function main(urlArray) {
    for (i in urlArray) {
        // let myInterval = setTimeout(getMoreInfo(urlArray[i]), 1500);
        await getMoreInfo(urlArray[i])
        Promise.all(promiseArray)
    }
}

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
