
let els = document.querySelectorAll('.picross p');
for(el of els){
   el.onclick = function(){
      this.classList.toggle('green');
   }
}


let isMouseDown = false, isHighlighted;

els = document.querySelectorAll('.picross tbody td:not(.blank)');
for(el of els){
   el.onmousedown = function(){
      isMouseDown = true;
      this.classList.toggle('black');
      isHighlighted = this.classList.contains("black");
      return false;
   }
   el.onmouseover = function(){
      if(isMouseDown){
         console.log('ok');
         this.classList.toggle("black", isHighlighted);
      }
   }
   el.onselect = function(){
     return false;
   }
}

document.onmouseup = function(){
   isMouseDown = false;
}





document.querySelector('#minimize').onclick = function(){
   remote.getCurrentWindow().minimize();
}
document.querySelector('#square').onclick = function(){
   var window = remote.getCurrentWindow();
   if(this.maximize){
      window.unmaximize();
      this.maximize = false;
   }
   else{
      window.maximize();
      this.maximize = true;
   }
}
document.querySelector('#close').onclick = function(){
   remote.getCurrentWindow().close();
}
