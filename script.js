var dataStage1 = [];
var dataStage2 = [];

var stageNumber = [[],[]];
var stageName = [[],[]];
var time = [[],[]];
var latitudeDegs = [[],[]];
var longitudeDegs = [[],[]];
var altitudeKm = [[],[]];
var azimuthDegs = [[],[]];
var elevationDegs = [[],[]];
var rangeKm = [[],[]];
str="";

var ignitionTime          = 0;
var mecoTime              = 0;
var stage2IgnitionTime    = 0;
var centerIgnitionTime   = 0;
var sideIgnitionTime     = 0;
var sideShutdownTime      = 0;
var centerShutdownTime     = 0;
var entryIgnition1Time    = 0;
var entryIgnition2Time    = 0;
var entryShutdown1Time    = 0;
var entryShutdown2Time    = 0;
var landingIgnitionTime   = 0;
var seco1Time             = 0;
var payloadSeparationTime = 0;

var dataUploaded1 = false;
var dataUploaded2 = false;

var base03CSS = ["#002b36", "#fdf6e3"];
var base02CSS = ["#073642", "#eee8d5"];
var base01CSS = ["#586e75", "#93a1a1"];
var base00CSS = ["#657b83", "#839496"];
var base0CSS =  ["#839496", "#657b83"];
var base1CSS =  ["#93a1a1", "#586e75"];
var base2CSS =  ["#eee8d5", "#073642"];
var base3CSS =  ["#fdf6e3", "#002b36"];
var yellowCSS = "#b58900";
var orangeCSS = "#cb4b16";
var redCSS =    "#dc322f";
var magentaCSS= "#d33682";
var violetCSS = "#6c71c4";
var blueCSS =   "#268bd2";
var cyanCSS =   "#2aa198";
var greenCSS =  "#859900";
var lightTheme = 0;

var launchTime = Date.now()/1000;
var viewAngle = 0;
var duration;

const mainEngines  = document.querySelectorAll('.mainEngines');
const centerEngine = document.querySelectorAll('.centerEngine');
const sideEngines  = document.querySelectorAll('.sideEngines');
const vacEngine    = document.querySelectorAll('.vacEngine');
var enginesActive = {mainEngines: false, centerEngine: false, sideEngines: false, vacEngine: false};

// read CSV
document.getElementById('input').addEventListener('change', function(e) {
    let file = document.getElementById('input').files[0];

    (async () => {
        const fileContent = await file.text();
        
        // catch wrong file upload
        if( !file.name.endsWith('.csv') || !file.name.includes('_Stage-')) {
            alert("Upload a _Stage-X.csv")
        }
        
        // console.log('.text()', fileContent);

        csv = fileContent.split('\n');

        // save spreadsheet to global list
        if( file.name.includes('Stage-1') || file.name.includes('_S1') || file.name.includes('Stage 1') ) {
            dataStage1 = fileContent.split('\n');
            dataStage1.shift();

            for (let i = 0; i < csv.length-1; i++ ) {
                row = csv[i+1].split(',');

                if(i==0) {row[2] = "0";}
                if(Number(row[2]) % 1 == 0){
                    stageNumber[0][Number(row[2])] = Number(row[0]);
                    stageName[0][Number(row[2])] = row[1];
                    time[0][Number(row[2])] = Number(row[2]);
                    latitudeDegs[0][Number(row[2])] = Number(row[3]);
                    longitudeDegs[0][Number(row[2])] = Number(row[4]);
                    altitudeKm[0][Number(row[2])] = Number(row[5]);
                    azimuthDegs[0][Number(row[2])] = Number(row[6]);
                    elevationDegs[0][Number(row[2])] = Number(row[7]);
                    rangeKm[0][Number(row[2])] = Number(row[8]);
                    str = str + Number(row[2]) + "," + Number(row[8]) + "\n"
                }
            }
            alert("Stage 1 Data Saved");  
            dataUploaded1 = true;
            updateTable();
        }
        else if( file.name.includes('Stage-2') || file.name.includes('_S2') || file.name.includes('Stage 2') ) {
            dataStage2 = fileContent.split('\n');
            dataStage2.shift();
            
            for (let i = 0; i < csv.length-1; i++ ) {
                row = csv[i+1].split(',');
                
                if(i==0) {row[2] = "0";}
                if(Number(row[2]) % 1 == 0){
                    stageNumber[1][Number(row[2])] = Number(row[0]);
                    stageName[1][Number(row[2])] = row[1];
                    time[1][Number(row[2])] = Number(row[2]);
                    latitudeDegs[1][Number(row[2])] = Number(row[3]);
                    longitudeDegs[1][Number(row[2])] = Number(row[4]);
                    altitudeKm[1][Number(row[2])] = Number(row[5]);
                    azimuthDegs[1][Number(row[2])] = Number(row[6]);
                    elevationDegs[1][Number(row[2])] = Number(row[7]);
                    rangeKm[1][Number(row[2])] = Number(row[8]);
                    // str = str + Number(row[2]) + "," + Number(row[8]) + "\n"
                }
            }
            alert("Stage 2 Data Saved");
            dataUploaded2 = true;
            updateTable();
        }
        // console.log(str);
    })();
});


// Function to update table from the slider //////////////////////////////////////////////////////////
function updateTable() {
    var value = document.getElementById("launchTime").value;
    document.getElementById("sliderTime").innerText = "T+" + value.toString().padStart(4, '0') + 's';
    a1=0;
    a2=0;
    r1=0;
    r2=0;
    e1=0;
    e2=0;
    
    // Stage 1
    var value1 = value;
    if(time[0].length > 0) {
        if( value >= time[0].length ) { value1 = time[0].length-1; }

      var items1 = [
        stageNumber[0][value1], 
        latitudeDegs[0][value1].toFixed(2), 
        longitudeDegs[0][value1].toFixed(2), 
        altitudeKm[0][value1].toFixed(2), 
        azimuthDegs[0][value1].toFixed(2), 
        elevationDegs[0][value1].toFixed(2), 
        rangeKm[0][value1].toFixed(2)
        ]
      
      for (var i = 0; i < items1.length; i++) {
          stage1.cells[i].textContent = items1[i];
      }

      a1 = azimuthDegs[0][value1];
      r1 = rangeKm[0][value1];
      e1 = elevationDegs[0][value1];
    }
  
    // Stage 2
    var value2 = value;
    if(time[1].length > 0) {
        if( value >= time[1].length ) { value2 = time[1].length-1; }
        // console.log("t:" + value + ", " + value2)
          
      var items2 = [
        stageNumber[1][value2], 
        latitudeDegs[1][value2].toFixed(2), 
        longitudeDegs[1][value1].toFixed(2), 
        altitudeKm[1][value2].toFixed(2), 
        azimuthDegs[1][value2].toFixed(2), 
        elevationDegs[1][value2].toFixed(2), 
        rangeKm[1][value2].toFixed(2)
        ]

      for (var i = 0; i < items2.length; i++) {
          stage2.cells[i].textContent = items2[i];
      }
      
      a2 = azimuthDegs[1][value2];
      r2 = rangeKm[1][value2];
      e2 = elevationDegs[1][value2]
    }

    graph(viewAngle, a1, r1, a2, r2);
    graph2(viewAngle, e1, r1, e2, r2);
}

function graph(a0, a1, r1, a2, r2) {
    // canvas
    c = document.getElementById("azCanvas");
    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    s = c.width/2;
    a1 = -a1+90 + a0
    a2 = -a2+90 + a0
    // r = r/600 * s
    r1 = Math.log(r1)/Math.log(5000) * s
    r2 = Math.log(r2)/Math.log(5000) * s

    // 5000 km circle
    ctx.beginPath();
    ctx.arc(s, s, s, 0, 2*Math.PI);
    ctx.strokeStyle=base3CSS[lightTheme];
    ctx.stroke();

    // 100 km circle
    ctx.beginPath();
    ctx.arc(s, s, Math.log(100)/Math.log(5000) * s, 0, 2*Math.PI);
    ctx.strokeStyle=base2CSS[lightTheme];
    ctx.stroke();

    // 1000 km circle
    ctx.beginPath();
    ctx.arc(s, s, Math.log(1000)/Math.log(5000) * s, 0, 2*Math.PI);
    ctx.strokeStyle=base2CSS[lightTheme];
    ctx.stroke();

    // azimuth 1
    ctx.beginPath();
    ctx.moveTo(s, s);
    a1=((a1)*Math.PI)/180
    x1=s + r1*Math.cos(a1)
    y1=s - r1*Math.sin(a1)
    ctx.lineTo(x1, y1);
    ctx.strokeStyle=base3CSS[lightTheme];
    ctx.stroke();

    // azimuth 2
    ctx.beginPath();
    ctx.moveTo(s, s);
    a2=((a2)*Math.PI)/180
    x2=s + r2*Math.cos(a2)
    y2=s - r2*Math.sin(a2)
    ctx.lineTo(x2, y2);
    ctx.strokeStyle=blueCSS;
    ctx.stroke();

    // x-axis
    ctx.beginPath();
    A1=((a0)*Math.PI)/180
    X1=Math.cos(A1)
    Y1=Math.sin(A1)
    ctx.moveTo(s+(s*X1), s-(s*Y1));
    ctx.lineTo(s-(s*X1), s+(s*Y1));
    ctx.strokeStyle=redCSS;
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    A2=((a0+90)*Math.PI)/180
    X2=Math.cos(A2)
    Y2=Math.sin(A2)
    ctx.moveTo(s+(s*X2), s-(s*Y2));
    ctx.lineTo(s-(s*X2), s+(s*Y2));
    ctx.strokeStyle=greenCSS;
    ctx.stroke();

    // NSEW Labels
    ctx.font = "32px Roboto Mono";
    ctx.textAlign="center";
    ctx.fillStyle=base3CSS[lightTheme];
    ctx.fillText("N", s+((s-32)*X2), s-((s-32)*Y2));
    ctx.fillText("E", s+((s-32)*X1), s-((s-32)*Y1));
    ctx.fillText("S", s-((s-32)*X2), s+((s-32)*Y2));
    ctx.fillText("W", s-((s-32)*X1), s+((s-32)*Y1));
    ctx.fillText("🛰️", x2, y2);
    ctx.fillText("🚀", x1, y1);
}

function graph2(a0, a1, r1, a2, r2) {
    // canvas
    c = document.getElementById("eleCanvas");
    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    
    a0 = 0

    s = c.width;
    a1 = a1
    a2 = a2
    // r = r/600 * s
    r1 = Math.log(r1)/Math.log(5000) * s
    r2 = Math.log(r2)/Math.log(5000) * s
    
    // 5000 km circle
    ctx.beginPath();
    ctx.arc(0, s, s, 1.5*Math.PI, 0.5*Math.PI);
    ctx.strokeStyle=base3CSS[lightTheme];
    ctx.stroke();

    // 100 km circle
    ctx.beginPath();
    ctx.arc(0, s, Math.log(100)/Math.log(5000) * s, 1.5*Math.PI, 0.5*Math.PI);
    ctx.strokeStyle=base2CSS[lightTheme];
    ctx.stroke();
    
    // 1000 km circle
    ctx.beginPath();
    ctx.arc(0, s, Math.log(1000)/Math.log(5000) * s, 1.5*Math.PI, 0.5*Math.PI);
    ctx.strokeStyle=base2CSS[lightTheme];
    ctx.stroke();
    
    // azimuth 1
    ctx.beginPath();
    ctx.moveTo(0, s);
    a1=((a1)*Math.PI)/180
    x1=0 + r1*Math.cos(a1)
    y1=s - r1*Math.sin(a1)
    ctx.lineTo(x1, y1);
    ctx.strokeStyle=base3CSS[lightTheme];
    ctx.stroke();

    // azimuth 2
    ctx.beginPath();
    ctx.moveTo(0, s);
    a2=((a2)*Math.PI)/180
    x2=0 + r2*Math.cos(a2)
    y2=s - r2*Math.sin(a2)
    ctx.lineTo(x2, y2);
    ctx.strokeStyle=blueCSS;
    ctx.stroke();
    
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, s);
    ctx.lineTo(s, s);
    ctx.strokeStyle=redCSS;
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 2*s);
    ctx.strokeStyle=greenCSS;
    ctx.stroke();

    // labels
    ctx.font = "32px Roboto Mono";
    ctx.textAlign="center";
    ctx.fillStyle=base3CSS[lightTheme];
    ctx.fillText("0°", s-16, s);
    ctx.fillText("90°", 32, 32);
    ctx.fillText("-90°", 32, 2*s-10);
    ctx.fillText("🛰️", x2, y2);
    ctx.fillText("🚀", x1, y1);
}

function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    lightTheme = Math.abs(lightTheme-1);
    updateTable();
}

function setLaunchTime() {
    launchTime = new Date(document.getElementById("launchTimeInput").value).getTime() / 1000;
}

function setViewAngle() {
    viewAngle = parseFloat(document.getElementById("viewAngle").value);
    if( viewAngle >= 360 || viewAngle<0) {
        viewAngle = (viewAngle%360+360)%360;
        document.getElementById("viewAngle").value = viewAngle;
    }
    updateTable()
}

function setClocks() {
    ignitionTime          = document.getElementById("ignitionTime").value;
    mecoTime              = document.getElementById("mecoTime").value;
    stage2IgnitionTime    = document.getElementById("stage2IgnitionTime").value;
    centerIgnitionTime   = document.getElementById("centerIgnitionTime").value;
    sideIgnitionTime     = document.getElementById("sideIgnitionTime").value;
    sideShutdownTime      = document.getElementById("sideShutdownTime").value;
    centerShutdownTime     = document.getElementById("centerShutdownTime").value;
    entryIgnition1Time    = document.getElementById("entryIgnition1Time").value;
    entryIgnition2Time    = document.getElementById("entryIgnition2Time").value;
    entryShutdown1Time    = document.getElementById("entryShutdown1Time").value;
    entryShutdown2Time    = document.getElementById("entryShutdown2Time").value;
    landingIgnitionTime   = document.getElementById("landingIgnitionTime").value;
    seco1Time             = document.getElementById("seco1Time").value;
    payloadSeparationTime = document.getElementById("payloadSeparationTime").value;
    
    updateTable()

    // alert(ignitionTime+ "\n" +
    //     mecoTime+ "\n" +
    //     stage2IgnitionTime+ "\n" +
    //     centerIgnitionTime + "\n" +
    //     sideIgnitionTime + "\n" +
    //     sideShutdownTime + "\n" +
    //     centerShutdownTime + "\n" +
    //     entryIgnition1Time+ "\n" +
    //     entryIgnition2Time+ "\n" +
    //     entryShutdown1Time+ "\n" +
    //     entryShutdown2Time+ "\n" +
    //     landingIgnitionTime+ "\n" +
    //     seco1Time+ "\n" +
    //     payloadSeparationTime)
}

function sliders() {
    document.getElementById("ignitionTimeClock").style.backgroundImage          = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/ignitionTime*100-2}%,          ${base03CSS[lightTheme]} ${duration/ignitionTime*100+2}%,          ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("mecoTimeClock").style.backgroundImage              = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/mecoTime*100-2}%,              ${base03CSS[lightTheme]} ${duration/mecoTime*100+2}%,              ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("stage2IgnitionTimeClock").style.backgroundImage    = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/stage2IgnitionTime*100-2}%,    ${base03CSS[lightTheme]} ${duration/stage2IgnitionTime*100+2}%,    ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("centerIgnitionTimeClock").style.backgroundImage   = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/centerIgnitionTime*100-2}%,   ${base03CSS[lightTheme]} ${duration/centerIgnitionTime*100+2}%,   ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("sideIgnitionTimeClock").style.backgroundImage     = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/sideIgnitionTime*100-2}%,     ${base03CSS[lightTheme]} ${duration/sideIgnitionTime*100+2}%,     ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("sideShutdownTimeClock").style.backgroundImage      = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/sideShutdownTime*100-2}%,      ${base03CSS[lightTheme]} ${duration/sideShutdownTime*100+2}%,      ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("centerShutdownTimeClock").style.backgroundImage     = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/centerShutdownTime*100-2}%,     ${base03CSS[lightTheme]} ${duration/centerShutdownTime*100+2}%,     ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("entryIgnition1TimeClock").style.backgroundImage    = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/entryIgnition1Time*100-2}%,    ${base03CSS[lightTheme]} ${duration/entryIgnition1Time*100+2}%,    ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("entryIgnition2TimeClock").style.backgroundImage    = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/entryIgnition2Time*100-2}%,    ${base03CSS[lightTheme]} ${duration/entryIgnition2Time*100+2}%,    ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("entryShutdown1TimeClock").style.backgroundImage    = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/entryShutdown1Time*100-2}%,    ${base03CSS[lightTheme]} ${duration/entryShutdown1Time*100+2}%,    ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("entryShutdown2TimeClock").style.backgroundImage    = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/entryShutdown2Time*100-2}%,    ${base03CSS[lightTheme]} ${duration/entryShutdown2Time*100+2}%,    ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("landingIgnitionTimeClock").style.backgroundImage   = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/landingIgnitionTime*100-2}%,   ${base03CSS[lightTheme]} ${duration/landingIgnitionTime*100+2}%,   ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("seco1TimeClock").style.backgroundImage             = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/seco1Time*100-2}%,             ${base03CSS[lightTheme]} ${duration/seco1Time*100+2}%,             ${base03CSS[lightTheme]} 100%)`;
    document.getElementById("payloadSeparationTimeClock").style.backgroundImage = `linear-gradient(to right, ${blueCSS} 0%, ${blueCSS} ${duration/payloadSeparationTime*100-2}%, ${base03CSS[lightTheme]} ${duration/payloadSeparationTime*100+2}%, ${base03CSS[lightTheme]} 100%)`;

    if(duration >= ignitionTime)          { document.getElementById("ignitionTimeClock"         ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= mecoTime)              { document.getElementById("mecoTimeClock"             ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= stage2IgnitionTime)    { document.getElementById("stage2IgnitionTimeClock"   ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= centerIgnitionTime)    { document.getElementById("centerIgnitionTimeClock"  ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= sideIgnitionTime)      { document.getElementById("sideIgnitionTimeClock"    ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= sideShutdownTime)      { document.getElementById("sideShutdownTimeClock"     ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= centerShutdownTime)    { document.getElementById("centerShutdownTimeClock"    ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= entryIgnition1Time)    { document.getElementById("entryIgnition1TimeClock"   ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= entryIgnition2Time)    { document.getElementById("entryIgnition2TimeClock"   ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= entryShutdown1Time)    { document.getElementById("entryShutdown1TimeClock"   ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= entryShutdown2Time)    { document.getElementById("entryShutdown2TimeClock"   ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= landingIgnitionTime)   { document.getElementById("landingIgnitionTimeClock"  ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= seco1Time)             { document.getElementById("seco1TimeClock"            ).style.border = `2px solid ${greenCSS}`; }
    if(duration >= payloadSeparationTime) { document.getElementById("payloadSeparationTimeClock").style.border = `2px solid ${greenCSS}`; }

}

function countdownClock() {
    var dateObj = new Date(Math.abs(duration)*1000);
    hours        = dateObj.getUTCHours();
    minutes      = dateObj.getUTCMinutes();
    seconds      = dateObj.getSeconds();
    milliseconds = dateObj.getMilliseconds();

    timeString = hours.toString().padStart(2, '0') + ':' + 
                 minutes.toString().padStart(2, '0') + ':' + 
                 seconds.toString().padStart(2, '0') + ':' + 
                 milliseconds.toString().padStart(3, '0');
    
    if(duration < 0) { timeString = 'T-' + timeString; }
    else { timeString = 'T+' + timeString; }
    document.getElementById("launchCount").innerText = timeString;
}


function engineControl() {
    if(Math.trunc(duration*10) == Math.trunc(parseFloat(ignitionTime)*10))     { toggleEngines("mainEngines",  mainEngines, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(mecoTime)))               { toggleEngines("mainEngines",  mainEngines, false); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(stage2IgnitionTime)))     { toggleEngines("vacEngine",    vacEngine, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(centerIgnitionTime)))     { toggleEngines("centerEngine", centerEngine, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(sideIgnitionTime)))       { toggleEngines("sideEngines",  sideEngines, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(sideShutdownTime)))       { toggleEngines("sideEngines",  sideEngines, false); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(centerShutdownTime)))     { toggleEngines("centerEngine", centerEngine, false); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(entryIgnition1Time)))     { toggleEngines("centerEngine", centerEngine, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(entryIgnition2Time)))     { toggleEngines("sideEngines",  sideEngines, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(entryShutdown1Time)))     { toggleEngines("sideEngines", sideEngines, false); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(entryShutdown2Time)))     { toggleEngines("centerEngine",  centerEngine, false); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(landingIgnitionTime)))    { toggleEngines("centerEngine", centerEngine, true); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(landingIgnitionTime)+30)) { toggleEngines("centerEngine", centerEngine, false); }
    if(Math.trunc(duration) == Math.trunc(parseFloat(seco1Time)))              { toggleEngines("vacEngine",    vacEngine, false); }
}

function toggleEngines(engineType, engines, on) {
    // alert(engineType)
    if(on==true) { engineColor = redCSS; }
    else { engineColor = base3CSS[lightTheme];}
    engines.forEach(engine => {
        engine.setAttribute('fill', engineColor);
    });
    enginesActive[engineType] = on;
    // console.log(enginesActive);
}

function updateDuration() {
    timeCurrent = Date.now()/1000
    duration = timeCurrent - launchTime;
    // console.log(Math.trunc(duration*10))

    if(duration >=0 && duration < 1000) {
        document.getElementById("launchTime").value = duration;
        updateTable();
    }
    sliders();
    countdownClock();
    engineControl();
}
setInterval(updateDuration, 1)


document.getElementById("launchTime").addEventListener("input",  updateTable);

document.getElementById("ignitionTime").addEventListener("change", setClocks);
document.getElementById("mecoTime").addEventListener("change", setClocks);
document.getElementById("stage2IgnitionTime").addEventListener("change", setClocks);

document.getElementById("centerIgnitionTime").addEventListener("change", setClocks);
document.getElementById("sideIgnitionTime").addEventListener("change", setClocks);
document.getElementById("sideShutdownTime").addEventListener("change", setClocks);
document.getElementById("centerShutdownTime").addEventListener("change", setClocks);

document.getElementById("entryIgnition1Time").addEventListener("change", setClocks);
document.getElementById("entryIgnition2Time").addEventListener("change", setClocks);
document.getElementById("entryShutdown1Time").addEventListener("change", setClocks);
document.getElementById("entryShutdown2Time").addEventListener("change", setClocks);
document.getElementById("landingIgnitionTime").addEventListener("change", setClocks);
document.getElementById("seco1Time").addEventListener("change", setClocks);
document.getElementById("payloadSeparationTime").addEventListener("change", setClocks);

setClocks()
setViewAngle()
updateTable()

toggleEngines("mainEngines", mainEngines, false)
toggleEngines("centerEngine", centerEngine, false)
toggleEngines("sideEngines", sideEngines, false)
toggleEngines("vacEngine", vacEngine, false)
