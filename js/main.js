let changetime
let move = 0
let disk = 4
let arrayColor =[]
let colordisk = disk +1 //color disk need to be plus 1 because last color array gonna be black
let phase = 6 // change start of color base on phase
let timeScoreFactor = 50 //
let time = disk*timeScoreFactor// initial time
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
            document.querySelector("#Count").innerHTML = "Count Move : "+move
            checkWin()
        }
    }

}
function setDragAllPole(ev){
    document.querySelectorAll("canvas").forEach(loop=>{
        loop.setAttribute("draggable","false")
    })
    if(document.querySelector("#pollOne").children[0]){
        document.querySelector("#pollOne").children[0].setAttribute("draggable","true")
    }
    if(document.querySelector("#pollTwo").children[0]){
        document.querySelector("#pollTwo").children[0].setAttribute("draggable","true")
    }
    if(document.querySelector("#pollThree").children[0]){
        document.querySelector("#pollThree").children[0].setAttribute("draggable","true")
    }
}
function clear() {
    move =0

    clearInterval(changetime)
    document.querySelector("#main").innerHTML =""
    document.querySelector("#main").innerHTML = '<div id="pollOne" ondrop="drop(event)" ondragover="allowDrop(event)">\n' +
        '  </div>\n' +
        '  <div id="pollTwo" ondrop="drop(event)" ondragover="allowDrop(event)">\n' +
        '  </div>\n' +
        '  <div id="pollThree" ondrop="drop(event)" ondragover="allowDrop(event)">\n' +
        '  </div>'
        clearInterval(changetime)
        initial()
}

function showScore(){
    getStoragePlayer();
    addPlayer();
    setStoragePlayer();
}

function addPlayer(score,maxscore){ //Adds a player to the array with score and name
    let name = prompt("What's your name")
    allPlayers[name] = score+"/"+maxscore;
    // addPlayer[name] = maxscore
}

function setStoragePlayer(){ // Sends the array to the cloud for saving
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
function towerOfHanoi(n, from_rod,  to_rod,  aux_rod)
{
    if (n == 0)
    {
        return;
    }
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    // console.log("Move disk " + n + " from rod " + from_rod +
    // " to rod " + to_rod);
    // setTimeout(()=>{
    // sleep(1000)
    setTimeout(1000)
    document.getElementById(to_rod).prepend(document.getElementById(from_rod).children[0])
    setTimeout(1000)
    // sleep(2000).then(() => { document.getElementById(to_rod).prepend(document.getElementById(from_rod).children[0])});
    //     sleep(1000);
    // },1000)
    // sleep(1000)
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}
function newgame(){
    // new game function is function for stop time counter and start new game
    clearInterval(changetime)
    setTimeout(()=>{
        document.querySelector("#diskNum").click()
    },1)
}
function colorarr () {
    // this function is color generator base on rainbow color and phase of color wheel
    if (phase == undefined) phase = 0;
    colordisk = parseInt(disk) +1
    arrayColor =[]
    center = 128;
    width = 127;
    frequency = Math.PI * 2 / colordisk;
    for (var i = 0; i < colordisk; ++i) {
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
    clearInterval(changetime)
    changetime = setInterval(() => {
        document.querySelector("#time").innerHTML = "Time = " + time
        time -= 1
        if (time <= 0) {
            clearInterval(changetime)
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
    if(numb == disk){
        let score = time
        let maxscore = disk*timeScoreFactor
        document.querySelector("#response").innerHTML = "We are The Champion"
        alert("You win your score is "+score+" Out of "+maxscore);
        addPlayer(score,maxscore)
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