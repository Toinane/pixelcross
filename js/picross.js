

function Picross(){


   /*
      CREATELEVEL
    */
   /*this.createLevel = function(levelpack, number){
      let level = levelpack.levels[number],
            content_tab = '<tr><td id="0-0" class="blank"></td>',
            x = 1, y = 1, tempY = {};

      for(let i = 0, len = level.level; i < len; i++){
         let char = level.level.charAt(i);
         if(char === "#"){
            content_tab += '<td id="'+x+'-'+y+'"></td>';
            tempY[y] =
            x++;
         }
         if(char === "-"){
            content_tab += '<td id="'+x+'-'+y+'"></td>';
            x++;
         }
         if(char === ":"){
            content_tab += '</tr><tr><td id="0-'+y+'" class="blank"></td>';
            y++;
            x = 1;
         }
      }
      content_tab += '</tr>';
      document.querySelector('.picross tbody').innerHTML = content_tab;
   }*/

   this.createLevel = function(levelpack, number){
      let level = levelpack.levels[number], size = {x: 0, y: 0}, numY = {}, numX = {};
      console.log(level.level);
      for(el in level.level){
         console.log(el);
      }
   }


   /*
      STARTEVENTS
    */
   this.startEvents = function(){
      let isFirstDown = false, isSecondDown = false, isHighlighted,
      remote = require('electron').remote;

      let els = document.querySelectorAll('.picross p');
      for(el of els){
         el.onmousedown = function(e){
            if(e.button == 0){
               this.classList.toggle('green');
            }
            return false;
         }
      }

      els = document.querySelectorAll('.picross tbody td:not(.blank)');
      for(el of els){
         el.onmousedown = function(e){
            if(e.button == 0){
               isFirstDown = true;
               this.classList.toggle('black');
               if(this.classList.contains('check')){this.classList.toggle('check');}
               isHighlighted = this.classList.contains("black");
               return false;
            }
            else if(e.button == 2){
               isSecondDown = true;
               this.classList.toggle('check');
               if(this.classList.contains('black')){this.classList.toggle('black');}
               isHighlighted = this.classList.contains("check");
               return false;
            }
         }
         el.onmouseover = function(){
            if(isFirstDown){
               if(this.classList.contains('check')){this.classList.toggle('check');}
               this.classList.toggle("black", isHighlighted);
            }
            else if(isSecondDown){
               if(this.classList.contains('black')){this.classList.toggle('black');}
               this.classList.toggle("check", isHighlighted);
            }
         }
         el.onselect = function(){
           return false;
         }
      }

      document.onmouseup = function(){
         isFirstDown = false;
         isSecondDown = false;
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
   }


   /*
      STARTGAME
    */
   this.startGame = function(){
      let = levelpack = require(__dirname+'/js/levels/levelpack.json');
      this.createLevel(levelpack, 1);
      this.startEvents();
   }
   this.startGame();
}

var Picross = new Picross();
