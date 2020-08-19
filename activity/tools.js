ctx.lineWidth=5;
ctx.lineCap="round";
ctx.lineJoin="round";
let pencil=document.querySelector("#pencil");
let eraser=document.querySelector("#eraser");
let pencilOptions=document.querySelector("#pencil-options");
let eraserOptions=document.querySelector("#eraser-options");
let activeTool="pencil";
function handleTool(tool){
    if(tool=='pencil'){
        if(activeTool=="pencil"){
            pencilOptions.classList.add("show");
        }
        else{
        ctx.strokeStyle="black";
        eraserOptions.classList.remove("show");
        activeTool="pencil";
        }


    }
    else if(tool=='eraser'){
        if(activeTool=="eraser"){
           eraserOptions.classList.add("show");
        }
        else{
        ctx.strokeStyle="white";
        pencilOptions.classList.remove("show");
        activeTool="eraser";
        }
    }
    else if(tool=="sticky"){
        createSticky();
    }
    else if(tool=="upload"){
        uploadFile();
    }
    else if(tool=="undo"){
        undoLast();
    }
    else if(tool=="redo"){
        redoLast();
    }
    else if(tool=="download"){
        downloadBoard();
    }
}
function onChangeColor(color){
    ctx.strokeStyle=color;
    socket.emit("colorChange",color);
}
let sliders=document.querySelectorAll("input[type='range']");
for(let i=0;i<sliders.length;i++){
    sliders[i].addEventListener("change",function(){
        let width=sliders[i].value;
        ctx.lineWidth=width;
    })
}
