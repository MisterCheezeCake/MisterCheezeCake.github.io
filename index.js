function uuid() {
    if (!localStorage.getItem('uuid')) {
        let u = window.location.href
        if (!u.includes("?u=")) return;
        u = u.split("?u=")[1]
        localStorage.setItem('uuid', u)
    }
}
uuid()

function submit() {
    if (!document.getElementById('bx').checked) {
        alert("You must agree to the Terms and Conditions")
        return;
    }
    const uuid = localStorage.getItem('uuid')
    let date = parseInt(localStorage.getItem('date'),10) || 1
    if (Date.now() - date < 600000) {
        alert("You can only submit once every 10 minutes. You can submit again in " + Math.floor((600000 - (Date.now() - date)) / 1000) + " seconds.")
        return;
    }
    const text = document.getElementById('text').value
    if (!text) {
        alert("You must provide a request")
        return;
    }
    fetch("https://ascendant-volt-322601.uc.r.appspot.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text,
            uuid: uuid || "Unspecified (Web Form)",
            module: "SkyBlockKeybinds (Web Form)"
        }),
    }).then(async data => {
        if (data.status == 200) {
            alert("Request Submitted")
        } else {
            alert("An error occured with status code " + data.status)
        }
        localStorage.setItem('date', Date.now())
        document.getElementById('text').value = ""
        document.getElementById('bx').checked = false
    }).catch(e => {
        alert("Request Failed")
    })
}
