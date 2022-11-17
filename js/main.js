let changeTime
let move = 0
let disk = 4
let arrayColor = []
let colorDisk = disk + 1 //color disk need to be plus 1 because last color array gonna be black
let phase = 6 // change start of color base on phase
let timeScoreFactor = 50 //
let time = disk * timeScoreFactor// initial time
let solveDeley = 2000
let solveN = 1
allPlayers = {}; // initial object for store and retrieve data from local storage
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    if (ev.target.id === "pollOne" || ev.target.id === "pollTwo" || ev.target.id === "pollThree") {
        if (ev.target.firstChild.id < ev.dataTransfer.getData("text")) {
            document.querySelector("#response").innerHTML = "Cannot Place Here"
        } else {
            var data = ev.dataTransfer.getData("text");
            ev.target.prepend(document.getElementById(data));
            setDragAllPole()
            move += 1
            document.querySelector("#Count").innerHTML = "Count Move : " + move
            checkWin()
        }
    }

}

function setDragAllPole(ev) {
    document.querySelectorAll("canvas").forEach(loop => {
        loop.setAttribute("draggable", "false")
    })
    if (document.querySelector("#pollOne").children[0]) {
        document.querySelector("#pollOne").children[0].setAttribute("draggable", "true")
    }
    if (document.querySelector("#pollTwo").children[0]) {
        document.querySelector("#pollTwo").children[0].setAttribute("draggable", "true")
    }
    if (document.querySelector("#pollThree").children[0]) {
        document.querySelector("#pollThree").children[0].setAttribute("draggable", "true")
    }
}

function clear() {
    move = 0

    clearInterval(changeTime)
    document.querySelector("#main").innerHTML = ""
    document.querySelector("#main").innerHTML = '<div id="pollOne" ondrop="drop(event)" ondragover="allowDrop(event)">\n' +
        '  </div>\n' +
        '  <div id="pollTwo" ondrop="drop(event)" ondragover="allowDrop(event)">\n' +
        '  </div>\n' +
        '  <div id="pollThree" ondrop="drop(event)" ondragover="allowDrop(event)">\n' +
        '  </div>'
    clearInterval(changeTime)
    initial()
}

function showScore() {
    getStoragePlayer();
    addPlayer();
    setStoragePlayer();
}

function addPlayer(score, maxscore) { //Adds a player to the array with score and name
    let name = prompt("What's your name")
    allPlayers[name] = score + "/" + maxscore;
    // addPlayer[name] = maxscore
}

function setStoragePlayer() { // Sends the array to the cloud for saving
    var sortedPlayers = allPlayers//.sort(function(a, b){
    //     return b.score - a.score
    // });
    localStorage.setItem("PlayerArray", JSON.stringify(sortedPlayers));
}

function getStoragePlayer() { // Downloads the array from the cloud
    if (localStorage.PlayerArray != null) {
        allPlayers = JSON.parse(localStorage.getItem("PlayerArray"))
        return allPlayers
    }
}

// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function towerOfHanoiNonRecursive(n) {
    let i = 0, j = 0, k = 0
    let temp1 = 0, diskloop = 0
    n = parseInt(n)
    for (i = 1; i < 2 ** n; i++) {
        j = 1;
        k = i;
        while (k % 2 == 0) {
            j++;
            k = k / 2;
        }
        if ((k + 1) / 2 % 3 == 0) {
            // sleep(500).then(() => {
            // setTimeout(function (){
                temp1 = n + 1 - j
                diskloop = disk - temp1 + 1
                console.log("%d->A\n", diskloop);
                document.getElementById("pollOne").prepend(document.getElementById(diskloop))
            // },3000)
            // });
            // setTimeout(3000)
        } else if ((n + 1 - j) % 2 == 1 && (k + 1) / 2 % 3 == 1 || (n + 1 - j) % 2 == 0 && (k + 1) / 2 % 3 == 2) {
            // sleep(500).then(() => {
            // setTimeout(function (){
                temp1 = n + 1 - j
                diskloop = disk - temp1 + 1
                console.log("%d->B\n", diskloop);
                document.getElementById("pollThree").prepend(document.getElementById(diskloop))
            // });
            // },3000)
            // setTimeout(3000)
        } else {
            // sleep(500).then(() => {
                // });
                // setTimeout(function (){
                temp1 = n + 1 - j
                diskloop = disk - temp1 + 1
                console.log("%d->C\n", diskloop);
                document.getElementById("pollTwo").prepend(document.getElementById(diskloop))
            // },3000)
            // },3000)
        }
    }
}

function towerOfHanoi(n, from_rod, to_rod, aux_rod) {
    if (n == 0) {
        return;
    }
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    setTimeout(() => {
        // console.log(document.getElementById(from_rod).children[0])
        document.getElementById(to_rod).prepend(document.getElementById(from_rod).children[0])
        console.log(solveDeley * solveN)
    }, solveDeley * solveN)
    solveN++
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

function newgame() {
    // new game function is function for stop time counter and start new game
    clearInterval(changeTime)
    setTimeout(() => {
        document.querySelector("#diskNum").click()
    }, 1)
}

function colorarr() {
    // this function is color generator base on rainbow color and phase of color wheel
    if (phase == undefined) phase = 0;
    colorDisk = parseInt(disk) + 1
    arrayColor = []
    center = 128;
    width = 127;
    frequency = Math.PI * 2 / colorDisk;
    for (var i = 0; i < colorDisk; ++i) {
        red = Math.sin(frequency * i + 2 + phase) * width + center;
        green = Math.sin(frequency * i + 0 + phase) * width + center;
        blue = Math.sin(frequency * i + 4 + phase) * width + center;
        arrayColor.push(rgbToHex(red, green, blue))
    }
}

function initial() {
    // initial function is for generate html tag and prepend it to html
    document.querySelector("#Count").innerHTML = "Count Move : 0"
    document.querySelector("#response").innerHTML = "Start"
    time = disk * timeScoreFactor
    clearInterval(changeTime)
    changeTime = setInterval(() => {
        document.querySelector("#time").innerHTML = "Time = " + time
        time -= 1
        if (time <= 0) {
            clearInterval(changeTime)
            document.querySelector("#response").innerHTML = "Time Out"
        }
    }, 1000)
    let screenwidth = document.querySelector("#pollOne").clientWidth
    let screenheight = document.querySelector("#pollOne").clientHeight
    for (let i = 1; i <= disk; i++) {
        let squarewidth = (screenwidth / (1.3 * disk)) * i
        let node = document.createElement("canvas")
        let text = document.createTextNode("Your browser does not support the HTML canvas tag.")
        node.setAttribute("id", i)
        // node.setAttribute("style","border:1px solid #d3d3d3;")
        node.append(text)
        node.setAttribute("draggable", "false")
        node.setAttribute("ondragstart", "drag(event)")
        var ctx = node.getContext("2d");
        ctx.font = "50px Arial";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.strokeStyle = arrayColor[i]
        ctx.fillStyle = arrayColor[i]
        ctx.beginPath();
        ctx.roundRect((screenwidth * 0.4 - (squarewidth * 0.5)), 0, squarewidth, 150, [20, 20, 20, 20])
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = "white"
        ctx.fillText(i, 150, 80);
        document.querySelector("#pollOne").append(node)
    }
    document.querySelector("#pollOne").children[0].setAttribute("draggable", "true")
    document.querySelector("#pollOne").children[0].setAttribute("ondragstart", "drag(event)")
}

function checkWin() {
    // check is user win by using is child of poll three is equal to disk
    let numb = document.querySelector("#pollThree").children.length;
    if (numb == disk) {
        let score = time
        let maxscore = disk * timeScoreFactor
        document.querySelector("#response").innerHTML = "We are The Champion"
        alert("You win your score is " + score + " Out of " + maxscore);
        addPlayer(score, maxscore)
        setStoragePlayer()
        getStoragePlayer()
        newgame()
    }
}

function rgbToHex(red, green, blue) {
    // function to convert rgb to hex format using binary shift >> method
    const rgb = (red << 16) | (green << 8) | (blue << 0);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}