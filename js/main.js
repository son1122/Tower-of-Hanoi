function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let parent = null
    try{
        parent = document.getElementById(ev.dataTransfer.getData("text")).parentNode
    }catch (ev){

    }
    // if(document.getElementById(ev.dataTransfer.getData("text")).parentNode!=null){
    //     parent = document.getElementById(ev.dataTransfer.getData("text")).parentNode
    // }
    if (ev.target.id === "pollOne" || ev.target.id === "pollTwo" || ev.target.id === "pollThree") {
        console.log(ev.target.firstChild.id)
        console.log()
        if (ev.target.firstChild.id < ev.dataTransfer.getData("text")) {
            console.log("I cannot")
        } else {
            if (document.querySelector("#" + ev.target.id).hasChildNodes()) {
                console.log(document.querySelector("#" + ev.target.id).hasChildNodes())
                console.log(document.querySelector("#" + ev.target.id).children)
            }
            console.log(ev.target.firstChild.id)
            console.log(ev.target.id)
            var data = ev.dataTransfer.getData("text");
            ev.target.prepend(document.getElementById(data));

            checkWin()
        }
    } else if (ev.target.tagName === "canvas") {
        // var data = ev.dataTransfer.getData("text");
        // console.log("test")
        // console.log(document.getElementById(data).parentNode)
        // ev.target.appendChild(document.getElementById(data).parentNode);
        // checkWin()
    }
    // let parent = document.getElementById(ev.dataTransfer.getData("text")).parentNode.children[0]
    // console.log(parent.getAttribute("id"))
    // console.log(ev.dataTransfer.getData("text"))

    if(ev.target.children[1]!=null){
        console.log("test1")
        ev.target.children[1].setAttribute("draggable","false")
    }
    if(parent!=null){
        console.log("test2")
        parent.children[0].setAttribute("draggable","true")
    }
    // try {
    //     ev.target.children[1].setAttribute("draggable","false")
    //     parent.children[0].setAttribute("draggable","true")
    // }catch (e){
    //
    // }
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