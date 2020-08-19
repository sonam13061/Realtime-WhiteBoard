let imgInput=document.querySelector("#acceptImg");
function uploadFile(){
    imgInput.click();
    imgInput.addEventListener("change",function(){
        let imgObj=imgInput.files[0];
        let imgLink=URL.createObjectURL(imgObj);
        let img=document.createElement("img");
        img.src=imgLink;
        img.classList.add("image");
        let imgbox=createBox();
        imgbox.appendChild(img)
    })
}
function downloadBoard(){
    let a=document.createElement("a");
    a.download="file.png";
    let url=board.toDataURL("image/png;base64");
    a.href=url;
    a.click();
    a.remove();

}