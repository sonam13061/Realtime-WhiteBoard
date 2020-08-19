function  createBox(){
    let stickyPad=document.createElement("div");
    let navBar=document.createElement("div");
    let close=document.createElement("div");
    let minimize=document.createElement("div");
    let textbox=document.createElement("div");

    stickyPad.setAttribute("class","stickyPad");
    navBar.setAttribute("class","nav-bar");
    close.setAttribute("class","close");
    minimize.setAttribute("class","minimize");
    textbox.setAttribute("class","textbox");

    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(close);
    navBar.appendChild(minimize);
    document.body.appendChild(stickyPad);
  
    close.addEventListener("click",function(){
        stickyPad.remove();
    })
    let isOpen=true;
    minimize.addEventListener("click",function(){
       if(isOpen){
           textbox.style.display="none";
       }
       else{
           textbox.style.display="block";
       }
       isOpen=!isOpen;
    })
    let initialX=null;
    let initialY=null;
    let isStickyDown=false;
    navBar.addEventListener("mousedown",function(e){
        initialX=e.clientX;
        initialY=e.clientY;
        isStickyDown=true;
    })
    navBar.addEventListener("mousemove",function(e){
         if(isStickyDown==true){
            let finalX=e.clientX;
            let finalY=e.clientY;
            let dx=finalX-initialX;
            let dy=finalY-initialY;
            let {top,left}=stickyPad.getBoundingClientRect();
            stickyPad.style.top=top+dy+"px";
            stickyPad.style.left=left+dx+"px";
            initialX=finalX;
            initialY=finalY;
         }
    })
    navBar.addEventListener("mouseup",function(e){
        isStickyDown=false;
    })
    navBar.addEventListener("mouseleave",function(e){
        isStickyDown=false;
    })
   return textbox;

}