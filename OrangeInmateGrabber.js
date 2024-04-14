var arrayVar = []

async function listInmates() {
    let charArray = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
    for(i in charArray) {
        await sleep(1);
        let textBox = document.getElementById("inmate");
        textBox.value = charArray[i];
        let searchBtn = document.getElementById("btnSearch")
        searchBtn.click()
        let list1 = document.getElementById("list1").getElementsByClassName("inmateLink")
        let list2 =document.getElementById("list2").getElementsByClassName("inmateLink")
        console.log(charArray[i]);
        for (j = 0; j < document.getElementById("divResponse").getElementsByTagName("TR").length; j++) {
            if (j != 0) {
                arrayVar.push(document.getElementById("divResponse").getElementsByTagName("TR")[j].innerText)
            }
            console.log(arrayVar.length)
        }

    }
    void downBlob(arrayVar, Date.now().toString()+".sem")
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