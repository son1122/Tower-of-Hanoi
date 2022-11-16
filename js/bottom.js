// rainbow color whell https://krazydad.com/tutorials/makecolors.php
// rgbToHex() function https://stackoverflow.com/a/19765382
// how to make modal https://www.w3schools.com/howto/howto_css_modals.asp
// json storage https://stackoverflow.com/questions/50041326/localstorage-array-sorting
let disk = 4
let arrayColor =[]
let colordisk = disk +1
let phase = 6
let time = 200
allPlayers = {};
function newgame(){
    console.log("We are the Champion")
    clearInterval(changetime)
    setTimeout(()=>{
        document.querySelector("#diskNum").click()
    },1)
}
function colorarr () {
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
colorarr()
 function initial(){
     time = disk*50
     clearInterval(changetime)
     changetime = setInterval(()=>{
         document.querySelector("#time").innerHTML = "Time = "+time
         time -=1
         if(time <=0 ){
             clearInterval(changetime)
             alert("You Loose")
         }
     },1000)
     let screenwidth = document.querySelector("#pollOne").clientWidth
     let screenheight = document.querySelector("#pollOne").clientHeight
    for(let i=1;i<=disk;i++){
        let squarewidth = (screenwidth/(1.3*disk)) * i
    let node = document.createElement("canvas")
        let text = document.createTextNode("Your browser does not support the HTML canvas tag.")
    node.setAttribute("id",i)
    // node.setAttribute("style","border:1px solid #d3d3d3;")
    node.append(text)
    node.setAttribute("draggable","false")
    node.setAttribute("ondragstart","drag(event)")
        var ctx = node.getContext("2d");
    ctx.font = "50px Arial";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.strokeStyle = arrayColor[i]
        ctx.fillStyle = arrayColor[i]
        ctx.beginPath();
        ctx.roundRect((screenwidth*0.4-(squarewidth*0.5)), 0, squarewidth, 150,[20,20,20,20])
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = "white"
        ctx.fillText(i, 150, 80);
    document.querySelector("#pollOne").append(node)
}
    document.querySelector("#pollOne").children[0].setAttribute("draggable","true")
     document.querySelector("#pollOne").children[0].setAttribute("ondragstart","drag(event)")
}
 function checkWin() {
     let numb = document.querySelector("#pollThree").children.length;
         if(numb == disk){
             let score = time
             let maxscore = disk*50
             alert("You win your score is "+score+" Out of "+maxscore);
             addPlayer(score,maxscore)
             setStoragePlayer()
             getStoragePlayer()
             newgame()
         }
 }
function rgbToHex(red, green, blue) {
    const rgb = (red << 16) | (green << 8) | (blue << 0);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("hasData")){
        // disk = localStorage.getItem("disk")
        // time = localStorage.getItem("time")
        initial()
    }else{
        localStorage.setItem("hasData", true);
        initial()
    }
} else {
    initial()
}
var modal = document.getElementById("myModal");
var btn = document.getElementById("score");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    document.querySelector("#scoreList").innerHTML=""
    modal.style.display = "block";
    let player = getStoragePlayer()
    let i =1
    for (var key in player) {
        console.log(key +"and"+ player[key])
        let node = document.createElement("li")
        let text = document.createTextNode(i+". Name : "+key+" Score : "+player[key])
        node.append(text)
        document.querySelector("#scoreList").append(node)
        i++
    }

}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.querySelector("#clearBtn").addEventListener("click",clear)
document.querySelector("#diskNum").addEventListener("click",(e)=>{
    e.preventDefault()
    clear()
    disk = document.querySelector("#disk").value
    colorarr()
    initial()
    clear()
})

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
        allPlayers = JSON.parse(localStorage.getItem("PlayerArray"));
        console.log(allPlayers)
        return allPlayers
    }
}





