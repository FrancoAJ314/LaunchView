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

document.getElementById("launchTime").addEventListener("input",  updateTable);

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
        if( file.name.includes('Stage-1') || file.name.includes('_S1') ) {
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
        }
        else if( file.name.includes('Stage-2') || file.name.includes('_S2') ) {
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
        }
        // console.log(str);
    })();
});


// Function to update table //////////////////////////////////////////////////////////////////////////
function updateTable() {
    var value = document.getElementById("launchTime").value;
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
    graph(221, a1, r1, a2, r2);
    graph2(221, e1, r1, e2, r2);
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
    ctx.strokeStyle="white";
    ctx.stroke();

    // 100 km circle
    ctx.beginPath();
    ctx.arc(s, s, Math.log(100)/Math.log(5000) * s, 0, 2*Math.PI);
    ctx.strokeStyle="gray";
    ctx.stroke();
    
    // 1000 km circle
    ctx.beginPath();
    ctx.arc(s, s, Math.log(1000)/Math.log(5000) * s, 0, 2*Math.PI);
    ctx.strokeStyle="gray";
    ctx.stroke();
    
    // azimuth 1
    ctx.beginPath();
    ctx.moveTo(s, s);
    a1=((a1)*Math.PI)/180
    x1=s + r1*Math.cos(a1)
    y1=s - r1*Math.sin(a1)
    ctx.lineTo(x1, y1);
    ctx.strokeStyle="white";
    ctx.stroke();

    // azimuth 2
    ctx.beginPath();
    ctx.moveTo(s, s);
    a2=((a2)*Math.PI)/180
    x2=s + r2*Math.cos(a2)
    y2=s - r2*Math.sin(a2)
    ctx.lineTo(x2, y2);
    ctx.strokeStyle="blue";
    ctx.stroke();
    
    // x-axis
    ctx.beginPath();
    A1=((a0)*Math.PI)/180
    X1=Math.cos(A1)
    Y1=Math.sin(A1)
    ctx.moveTo(s+(s*X1), s-(s*Y1));
    ctx.lineTo(s-(s*X1), s+(s*Y1));
    ctx.strokeStyle="red";
    ctx.stroke();
    
    // y-axis
    ctx.beginPath();
    A2=((a0+90)*Math.PI)/180
    X2=Math.cos(A2)
    Y2=Math.sin(A2)
    ctx.moveTo(s+(s*X2), s-(s*Y2));
    ctx.lineTo(s-(s*X2), s+(s*Y2));
    ctx.strokeStyle="green";
    ctx.stroke();
    
    // NSEW Labels
    ctx.font = "32px Roboto Mono";
    ctx.textAlign="center";
    ctx.fillStyle="white";
    ctx.fillText("N", s+((s-32)*X2), s-((s-32)*Y2));
    ctx.fillText("E", s+((s-32)*X1), s-((s-32)*Y1));
    ctx.fillText("S", s-((s-32)*X2), s+((s-32)*Y2));
    ctx.fillText("W", s-((s-32)*X1), s+((s-32)*Y1));
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
    ctx.strokeStyle="white";
    ctx.stroke();

    // 100 km circle
    ctx.beginPath();
    ctx.arc(0, s, Math.log(100)/Math.log(5000) * s, 1.5*Math.PI, 0.5*Math.PI);
    ctx.strokeStyle="gray";
    ctx.stroke();
    
    // 1000 km circle
    ctx.beginPath();
    ctx.arc(0, s, Math.log(1000)/Math.log(5000) * s, 1.5*Math.PI, 0.5*Math.PI);
    ctx.strokeStyle="gray";
    ctx.stroke();
    
    // azimuth 1
    ctx.beginPath();
    ctx.moveTo(0, s);
    a1=((a1)*Math.PI)/180
    x1=0 + r1*Math.cos(a1)
    y1=s - r1*Math.sin(a1)
    ctx.lineTo(x1, y1);
    ctx.strokeStyle="white";
    ctx.stroke();

    // azimuth 2
    ctx.beginPath();
    ctx.moveTo(0, s);
    a2=((a2)*Math.PI)/180
    x2=0 + r2*Math.cos(a2)
    y2=s - r2*Math.sin(a2)
    ctx.lineTo(x2, y2);
    ctx.strokeStyle="blue";
    ctx.stroke();
    
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, s);
    ctx.lineTo(s, s);
    ctx.strokeStyle="red";
    ctx.stroke();

    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 2*s);
    ctx.strokeStyle="green";
    ctx.stroke();
}