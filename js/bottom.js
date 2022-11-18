// initial number of disk and array of coloy
colorarr()
if (typeof(Storage) !== "undefined") {

    if(localStorage.getItem("hasData")){
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
document.querySelector("#solve").addEventListener("click",()=>{
    clear()
    let N = disk
    towerOfHanoi(N, 'pollOne', 'pollThree', 'pollTwo');
    // towerOfHanoiNonRecursive(N)
})

document.querySelector("#clearBtn").addEventListener("click",clear)
document.querySelector("#diskNum").addEventListener("click",(e)=>{
    e.preventDefault()
    clear()
    disk = document.querySelector("#disk").value
    if(disk<1){
        disk =1
    }
    colorarr()
    initial()
    clear()
})
// transform(1,1)
