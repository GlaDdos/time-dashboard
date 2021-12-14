const buttons = document.querySelectorAll(".dashboard-nav button");

buttons.forEach(button => {
    button.addEventListener('click', buttonClick, false);
});

function resetActive(buttons) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });
}

function timeframes(str) {
    let frame = str.toLowerCase();

    switch(frame) {
        case 'daily':
            return 'Day';

        case 'weekly':
            return 'Week';

        case 'monthly':
            return 'Month';

        default:
            return 'Error';
    }
}

function getJson(callback) {
    let xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open("GET", 'data.json', true);
    xobj.onreadystatechange = function () {
        if(xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function buttonClick() {
    const timeframe = this.innerHTML.toLowerCase();

    getJson(function(response){
        const json = JSON.parse(response);
        json.forEach(element => {
            let item = document.getElementById(element["title"])
        
            item.querySelector(".hours").innerHTML = element["timeframes"][timeframe].current 
            + `${element["timeframes"][timeframe].current == 1 ? "hr" : "hrs"}`;
            
            item.querySelector(".last-week").innerHTML = "Last " + timeframes(timeframe) + " - " + element["timeframes"][timeframe].previous 
            + `${element["timeframes"][timeframe].previous == 1 ? "hr" : "hrs"}`;
        });
    });

    //global variable, not good
    resetActive(buttons);

    this.classList.add('active');
}

