function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    if (ev.target.id === "pollOne" || ev.target.id === "pollTwo" || ev.target.id === "pollThree") {
        console.log(ev.target.firstChild.id)
        console.log()
        if (ev.target.firstChild.id < ev.dataTransfer.getData("text")) {
            console.log("I cannot")
        } else {
            console.log(ev.target.firstChild.id)
            console.log(ev.target.id)
            var data = ev.dataTransfer.getData("text");
            ev.target.prepend(document.getElementById(data));
            setDragAllPole()
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
    while (document.querySelector("#pollOne").firstChild) {
        document.querySelector("#pollOne").removeChild(document.querySelector("#pollOne").lastChild);
    }
    while (document.querySelector("#pollTwo").firstChild) {
        document.querySelector("#pollTwo").removeChild(document.querySelector("#pollTwo").lastChild);
    }
    while (document.querySelector("#pollThree").firstChild) {
        document.querySelector("#pollThree").removeChild(document.querySelector("#pollThree").lastChild);
    }
    initial()
}