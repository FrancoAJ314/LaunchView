launch = null
net = new Date()
count = 0

function call() {
    if (document.getElementById("devMode").checked) {mode = "dev"}
    else {mode = ""}

    url = "https://ll"+mode+".thespacedevs.com/2.2.0/launch/upcoming/?mode=detailed&pad__location=11"
    fetch(url)
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        console.log("Data:", data);
        
        launch = data.results.find(element => {
            return ![3, 4, 7].includes(element.status.id);
        });

        console.log("Launch:", launch);
        getNet()
        getEvents()
      })
      .catch(error => {
        console.error('Error:', error);  // Handle any errors
      });

}

function getNet() {
    net = new Date(launch.net);
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
    timeline = launch.timeline
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
