function allowDrop(ev) {
    ev.preventDefault();
}

    function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

    function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function clear(){
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