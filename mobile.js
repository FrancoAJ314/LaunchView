launch = null
net = new Date()
count = 0

function call() {
    if (document.getElementById("devMode").checked) {mode = "dev"}
    else {mode = ""}

    url = "https://ll"+mode+".thespacedevs.com/2.2.0/launch/upcoming/?limit=1&mode=detailed&pad__location=11"
    fetch(url)
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        launch = data
        console.log(data);
        getNet()
        getEvents()
      })
      .catch(error => {
        console.error('Error:', error);  // Handle any errors
      });

}

function getNet() {
    net = new Date(launch.results[0].net);
}


function updateCount() {
    now = new Date()
    count = (now-net)/1000

    if (count < 0) {
        document.getElementById("count").innerText = "T-";
        count = Math.abs(count)
    }
    else {
        document.getElementById("count").innerText = "T+";
    }

    document.getElementById("seconds").innerText = (count % 60).toFixed(3).toString().padStart(6,'0');
    document.getElementById("minutes").innerText = Math.floor((count / 60) % 60).toString().padStart(2,'0');
    document.getElementById("hours"  ).innerText = Math.floor((count / (60 * 60)) % 24).toString().padStart(2,'0');
    document.getElementById("days"   ).innerText = Math.floor(count / (60 * 60 * 24)).toString().padStart(2,'0');
}
setInterval(updateCount, 1)


function timestamp(btn) {
    btn.querySelector("h2").textContent = "T+"+count.toFixed(3).toString().padStart(7,'0')+"s"
}

function getEvents() {
    timeline = launch.results[0].timeline
    if (timeline.length == 0) {
        console.log("No events listed");
        return
        }
    timeline.forEach(function (item) {
        // console.log(item);
        const event = item.type.abbrev
        
        const regex = /-?P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
        const matches = item.relative_time.match(regex);
        
        days = matches[1] ? parseInt(matches[1], 10) : 0
        hours = matches[2] ? parseInt(matches[2], 10) : 0
        minutes = matches[3] ? parseInt(matches[3], 10) : 0
        seconds = matches[4] ? parseInt(matches[4], 10) : 0

        // console.log(item.type.abbrev, item.relative_time);
        // console.log(item.relative_time, days, hours, minutes, seconds);
        if (event == "MECO") {document.getElementById("mecoBtn").querySelector("p").textContent = "T+" + (seconds+(minutes*60)).toString() + "s"
        }
    }); 
}

function test() {
    // timeline = [
    //     {
    //         "type": {
    //             "id": 1,
    //             "abbrev": "GO for Prop Load",
    //             "description": "Launch director verifies go for propellant load"
    //         },
    //         "relative_time": "-PT38M"
    //     },
    //     {
    //         "type": {
    //             "id": 2,
    //             "abbrev": "Prop Load",
    //             "description": "Start of propelland loading"
    //         },
    //         "relative_time": "-PT35M"
    //     },
    //     {
    //         "type": {
    //             "id": 3,
    //             "abbrev": "Stage 1 LOX Load",
    //             "description": "Start of liquid oxygen loading in the first stage"
    //         },
    //         "relative_time": "-PT35M"
    //     },
    //     {
    //         "type": {
    //             "id": 4,
    //             "abbrev": "Stage 2 LOX Load",
    //             "description": "Start of liquid oxygen loading in the second stage"
    //         },
    //         "relative_time": "-PT16M"
    //     },
    //     {
    //         "type": {
    //             "id": 5,
    //             "abbrev": "Engine Chill",
    //             "description": "Start of engine chilling"
    //         },
    //         "relative_time": "-PT7M"
    //     },
    //     {
    //         "type": {
    //             "id": 6,
    //             "abbrev": "Startup",
    //             "description": "The onboard computer takes control over the countdown and runs last checks"
    //         },
    //         "relative_time": "-PT1M"
    //     },
    //     {
    //         "type": {
    //             "id": 7,
    //             "abbrev": "Tank Press",
    //             "description": "Fuel tanks are pressurized to flight levels"
    //         },
    //         "relative_time": "-PT1M"
    //     },
    //     {
    //         "type": {
    //             "id": 8,
    //             "abbrev": "GO for Launch",
    //             "description": "Launch director verifies go for launch"
    //         },
    //         "relative_time": "-PT45S"
    //     },
    //     {
    //         "type": {
    //             "id": 9,
    //             "abbrev": "Ignition",
    //             "description": "Start of the engine ignition sequence"
    //         },
    //         "relative_time": "-PT3S"
    //     },
    //     {
    //         "type": {
    //             "id": 10,
    //             "abbrev": "Liftoff",
    //             "description": "First upwards movement of the rocket"
    //         },
    //         "relative_time": "P0D"
    //     },
    //     {
    //         "type": {
    //             "id": 11,
    //             "abbrev": "Max-Q",
    //             "description": "Maximum dynamic pressure"
    //         },
    //         "relative_time": "PT1M7S"
    //     },
    //     {
    //         "type": {
    //             "id": 12,
    //             "abbrev": "MECO",
    //             "description": "Cut-off of the main engine"
    //         },
    //         "relative_time": "PT2M25S"
    //     },
    //     {
    //         "type": {
    //             "id": 13,
    //             "abbrev": "Stage 2 Separation",
    //             "description": "Separation of the second stage from the first"
    //         },
    //         "relative_time": "PT2M29S"
    //     },
    //     {
    //         "type": {
    //             "id": 14,
    //             "abbrev": "SES-1",
    //             "description": "First start of the second engine"
    //         },
    //         "relative_time": "PT2M36S"
    //     },
    //     {
    //         "type": {
    //             "id": 15,
    //             "abbrev": "Fairing Separation",
    //             "description": "Separation of the payload fairing"
    //         },
    //         "relative_time": "PT3M1S"
    //     },
    //     {
    //         "type": {
    //             "id": 16,
    //             "abbrev": "Entry Burn Startup",
    //             "description": "Start of the atmospheric entry burn"
    //         },
    //         "relative_time": "PT6M7S"
    //     },
    //     {
    //         "type": {
    //             "id": 17,
    //             "abbrev": "Entry Burn Shutdown",
    //             "description": "End of the atmospheric entry burn"
    //         },
    //         "relative_time": "PT6M27S"
    //     },
    //     {
    //         "type": {
    //             "id": 18,
    //             "abbrev": "Stage 1 Landing Burn",
    //             "description": "Start of the first stage landing burn"
    //         },
    //         "relative_time": "PT7M51S"
    //     },
    //     {
    //         "type": {
    //             "id": 19,
    //             "abbrev": "Stage 1 Landing",
    //             "description": "Landing of the first stage"
    //         },
    //         "relative_time": "PT8M13S"
    //     },
    //     {
    //         "type": {
    //             "id": 20,
    //             "abbrev": "SECO-1",
    //             "description": "First cut-off of the second engine"
    //         },
    //         "relative_time": "PT8M39S"
    //     },
    //     {
    //         "type": {
    //             "id": 21,
    //             "abbrev": "SES-2",
    //             "description": "Second start of the second engine"
    //         },
    //         "relative_time": "PT53M7S"
    //     },
    //     {
    //         "type": {
    //             "id": 22,
    //             "abbrev": "SECO-2",
    //             "description": "Second cut-off of the second engine"
    //         },
    //         "relative_time": "PT53M8S"
    //     },
    //     {
    //         "type": {
    //             "id": 23,
    //             "abbrev": "Starlink Deployment",
    //             "description": "Deployment of the Starlink stack from the rocket"
    //         },
    //         "relative_time": "PT1H"
    //     }
    // ]
    
}