
let isPenDown = false;
let undoarr=[];
let redoarr=[];
board.addEventListener("mousedown", function (e) {
    // begin path
    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top;
    ctx.moveTo(x, y);
    let mdp={
        x,
        y,
        id:"md",
        color:ctx.strokeStyle,
        width:ctx.lineWidth,
    };
    undoarr.push(mdp);
    socket.emit("md",mdp);
    console.log("Mouse down")
    isPenDown = true;
})
// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("Mouse move")
        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top;
        let mmo={
            x,
            y,
            id:"mmo",
            color:ctx.strokeStyle,
            width:ctx.lineWidth,
        };
        undoarr.push(mmo);
        ctx.lineTo(x, y);
        // stroke
        socket.emit("mmo",mmo);
        ctx.stroke();
    }
})
window.addEventListener("mouseup", function () {
    // close Path
    console.log("Mouse up");
    // ctx.closePath();
    isPenDown = false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
function undoLast(){
    if(undoarr.length>=2){
        let tempArr=[];
        for(let i=undoarr.length-1;i>=0;i--){
            let id=undoarr[i].id;
            if(id=='md'){
             tempArr.unshift(undoarr.pop());
                break;
            }
            else{
                tempArr.unshift(undoarr.pop());
            }
        }
        redoarr.push(tempArr);
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }
   
}
    function redraw(){
        for(let i=0;i<undoarr.length;i++){
            let point=undoarr[i];
            ctx.strokeStyle=point.color;
            ctx.lineWidth=point.width;
            if(point.id=="md"){
               ctx.beginPath();
               ctx.moveTo(point.x,point.y);
            }
            else{
                ctx.lineTo(point.x,point.y);
                ctx.stroke();
            }
          }
    }
    function redoLast(){
        if(redoarr.length>0){
            let undoPath=redoarr.pop();
            for(let i=0;i<undoPath.length;i++){
                undoarr.push(undoPath[i]);
            }
        }
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }
    
