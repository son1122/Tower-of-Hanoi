// rainbow color whell https://krazydad.com/tutorials/makecolors.php
// rgbToHex() function https://stackoverflow.com/a/19765382
let disk = 4
let arrayColor =[]
let colordisk = disk +1
let phase = 6
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
    console.log(arrayColor )
}
colorarr()
 function initial(){
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
        ctx.roundRect((screenwidth*0.4-(squarewidth*0.5)), 0, squarewidth, 300,[20,20,20,20])
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
     if(numb === disk){
         alert("You win")
     }
 }
function rgbToHex(red, green, blue) {
    const rgb = (red << 16) | (green << 8) | (blue << 0);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}
 initial()
document.querySelector("#clearBtn").addEventListener("click",clear)
document.querySelector("#diskNum").addEventListener("click",()=>{
    clear()
    disk = document.querySelector("#disk").value
    console.log(disk)
    colorarr()
    initial()
    clear()
})


