 let disk = 3

 function initial(){
    for(let i=1;i<=disk;i++){
    let node = document.createElement("canvas")
        let text = document.createTextNode("Your browser does not support the HTML canvas tag.")
    node.setAttribute("id",i)
    node.setAttribute("style","border:1px solid #d3d3d3;")
    node.append(text)
    node.setAttribute("draggable","false")
    node.setAttribute("ondragstart","drag(event)")

        var ctx = node.getContext("2d");
    ctx.font = "50px Arial";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
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
 initial()
document.querySelector("#clearBtn").addEventListener("click",clear)