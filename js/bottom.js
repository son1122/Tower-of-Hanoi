 let disk = 6
    function initial(){
    for(let i=0;i<disk;i++){
    let node = document.createElement("canvas")
        let text = document.createTextNode("Your browser does not support the HTML canvas tag.")
    node.setAttribute("id",i)
    node.setAttribute("style","border:1px solid #d3d3d3;")
    node.setAttribute("draggable","true")
    node.setAttribute("ondragstart","drag(event)")
    node.append(text)
    var ctx = node.getContext("2d");
    ctx.font = "50px Arial";
    ctx.strokeText(i, 10, 50);
    console.log(node)
    document.querySelector("#pollOne").append(node)
}
}
checkWin(){
    
 }
    initial()
document.querySelector("#clearBtn").addEventListener("click",clear)